import express from 'express';
import bcryt from "bcrypt";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';
dotenv.config()
import { UserRouter } from './routes/user.js'

const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5174"],
    credentials:true,
}));
app.use('/auth',UserRouter)

mongoose.connect('mongodb://127.0.0.1:27017/auth')

// app.listen(process.env.PORT,() =>{
//     console.log(`Server is running on port ${process.env.PORT}`);
// });

// mongoose.connect('mongodb://localhost:27017/paymentDB', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log('Error connecting to MongoDB:', err));

// MongoDB Schema
const OrderSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNumber: String,
    amount: Number,
    orderId: String,
    status: { type: String, default: "PENDING" },
});

const Order = mongoose.model('Order', OrderSchema);

// Constants
const MERCHANT_KEY = process.env.MERCHANT_KEY;
const MERCHANT_ID = process.env.MERCHANT_ID;
const MERCHANT_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const MERCHANT_STATUS_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status";
const redirectUrl = "http://localhost:8000/status";
const successUrl = "http://localhost:5174/payment-success";
const failureUrl = "http://localhost:5174/payment-failure";

// Route to create an order
app.post('/create-order', async (req, res) => {
    const { name, email, mobileNumber, amount } = req.body;
    const orderId = uuidv4();

    // Save order to MongoDB
    const order = new Order({ name, email, mobileNumber, amount, orderId });
    await order.save();

    // Payment payload
    const paymentPayload = {
        merchantId: MERCHANT_ID,
        merchantUserId: name,
        mobileNumber,
        amount: amount * 100,
        merchantTransactionId: orderId,
        redirectUrl: `${redirectUrl}/?id=${orderId}`,
        redirectMode: 'POST',
        paymentInstrument: {
            type: 'PAY_PAGE',
        },
    };

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
    const keyIndex = 1;
    const string = payload + '/pg/v1/pay' + MERCHANT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    try {
        const response = await axios.post(MERCHANT_BASE_URL, {
            request: payload,
        }, {
            headers: {
                'X-VERIFY': checksum,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
        
        res.status(200).json({ url: response.data.data.instrumentResponse.redirectInfo.url });
    } catch (error) {
        console.error("Error in payment:", error);
        res.status(500).json({ error: 'Failed to initiate payment' });
    }
});

// Route to check payment status
app.post('/status', async (req, res) => {
    const merchantTransactionId = req.query.id;
    const keyIndex = 1;
    const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    try {
        const response = await axios.get(`${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`, {
            headers: {
                'X-VERIFY': checksum,
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        });

        const status = response.data.success ? "SUCCESS" : "FAILURE";
        await Order.findOneAndUpdate({ orderId: merchantTransactionId }, { status });

        if (response.data.success) {
            return res.redirect(successUrl);
        } else {
            return res.redirect(failureUrl);
        }
    } catch (error) {
        console.error("Error checking status:", error);
        res.status(500).json({ error: 'Failed to check payment status' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});