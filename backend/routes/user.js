// import express from 'express';
// import bcrypt from 'bcrypt';

// const router = express.Router();
// import { User } from '../models/User.js';
// import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';



// router.post('/signup', async (req, res) => {
//     try {
//         // Destructure all necessary fields from the request body
//         const { username, email, password } = req.body;

//         // Check if a user with the provided email already exists
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(409).json({ message: "User already exists" });
//         }

//         // Hash the password before saving
//         const hashPassword = await bcrypt.hash(password, 10);

//         // Create a new user instance
//         const newUser = new User({
//             username,
//             email,
//             password: hashPassword, // Save the hashed password
//         });

//         // Save the new user to the database
//         await newUser.save();
//         return res.status(201).json({ status: true, message: "New user registered" });
//     } catch (err) {
//         console.error('Error in signup route:', err);
//         return res.status(500).json({ message: "Server error" });
//     }
// });


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email })
//     if (!user) {
//         return res.json({ message: "user not found" })
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//         return res.json({ message: "invalid password" })
//     }

//     const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' })
//     res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
//     return res.json({ status: true, message: "user logged in" })
// })

// router.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.json({ messsage: "user not found" })
//         }
//         // const token = jwt.sign({ email }, process.env.KEY, { expiresIn: '10m' })
//         const token = jwt.sign({ id: user._id }, process.env.KEY, {
//             expiresIn: "5m",
//           });

//         // var nodemailer = require('nodemailer');

//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'shashikant.mane801@gmail.com',
//                 pass: 'ahrp eung bhgw huhk'
//             }
//         });

//         var mailOptions = {
//             from: 'shashikant.mane801@gmail.com',
//             to: email,
//             subject: 'Reset Password',
//             text: `http//localhost:5173/resetPassword/${token}`
//         };

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 return res.json({ status: true, message: "error sending email" })
//             } else {
//                 return res.json({ status: true, message: "email sent" })
//             }
//         });

//     } catch (err) {
//         console.error(err)
//     }

// })

// router.post('/reset-password/:token', async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body

//     try {
//         const decoded = await jwt.verify(token, process.env.KEY);
//         const id = decoded.id;
//         const hashPassword =await bcrypt.hash(password, 10)
//         await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
//         return res.json({ status: true, message: "updated password" })
//     } catch (err) {
//         return res.json("invalid token");
//     }
// })

// const verifyUser = async (req, res, next) => {
//     try {


//         const token = req.cookies.token;
//         if (!token) {
//             return res.json({status: false ,message: "Unauthorized" });
//         }
//         const decoded = await jwt.verify(token, process.env.KEY);
//         next()
//     } catch (err) {
//         return res.json(err);
//     }
// }

// router.get('/verify',verifyUser, (req, res) => {
//     return res.json({ status: true, message: "authorized" })
// });

// router.get('/logout',(req,res)=>{
//     res.clearCookie('token')
//     return res.json({status:true})
// })

// export { router as UserRouter };

import express from "express";
import bcryt from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already existed" });
  }

  const hashpassword = await bcryt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "record registed" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "user is not registered" });
  }

  const validPassword = await bcryt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "login successfully" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shashikant.mane801@gmail.com",
        pass: "ahrp eung bhgw huhk",
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    var mailOptions = {
      from: "shashikant.mane801@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcryt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    return res.json("invalid token");
  }
});

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ status: false, message: "No token provided" });
        }

        const decoded = await jwt.verify(token, process.env.KEY);
        req.user = decoded; // Store user data for use in the route
        next();
    } catch (err) {
        return res.status(403).json({ status: false, message: "Unauthorized access" });
    }
};

router.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, message: "Authorized" });
});


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
})


export { router as UserRouter };

