import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Dashboard from './components/Dashboard'
import Checkout from './components/Checkout';
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/signup" element={<Signup/>}></Route>
        <Route path = "/login" element={<Login/> }></Route>
        <Route path = "/" element={<Home/>}></Route>
        <Route path = "/forgotPassword" element={<ForgotPassword/>}></Route>
        <Route path = "/resetPassword/:token" element={<ResetPassword/>}></Route>
        <Route path = "/dashboard" element={<Dashboard/>}></Route>
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App