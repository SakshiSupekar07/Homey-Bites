import { useState, useEffect, useRef } from 'react'
import './LoginSignup.css'
import password_icon from '/password.png'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { VerifyEmail } from '../../Services/UserService'
import Base from '../../components/Base/Base'

const VerifyOtp = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const prevLocation = useRef(location.pathname)

  const [data, setData] = useState({
    otp: '',
    username: '',
  })

  const [error, setError] = useState({
    errors: {},
    isError: false
  })

  useEffect(() => {
    //console.log(data.otp);
    console.log(location.state?.from)
  })

  // change handler
  const changeHandler = (event, property) => {
    setData({ ...data, [property]: event.target.value })
  }

  //login handler
  const VerifyOtpHandler = (event) => {
    event.preventDefault()

    //console.log(data.otp)

    if (!data.otp) {
      toast.error("please enter the OTP")
      return;
    }

    if (location.state?.from === "ForgetPassword") {

      VerifyEmail(data.otp, localStorage.getItem("username")).then((response) => {
        console.log(response)
        console.log("SUccess log")
        toast.success("Email verified successfully..! Please reset your password")
        navigate('/resetpassword')

      }).catch((error) => {
        console.log(error)
        toast.error(error.response?.data?.message)
      })
    }
    else if (location.state?.from === "SignUp") {
      //sending data to backend
      VerifyEmail(data.otp, localStorage.getItem("username")).then((response) => {
        localStorage.removeItem("username")
        console.log("SUccess log")
        toast.success("Registeration successfully..! Please Login")
        navigate('/login')

      }).catch((error) => {
        console.log(error)
        toast.error(error.response?.data?.message)
      })
    }
    else if(location.state?.from === "Login"){
      VerifyEmail(data.otp, localStorage.getItem("username")).then((response) => {
        localStorage.removeItem("username")
        console.log("SUccess log")
        toast.success("Email verified successfully..! Please Login")
        navigate('/login')

      }).catch((error) => {
        console.log(error)
        toast.error(error.response?.data?.message)
      })
    }
  }

  return (
    <Base>
    <div className="login-page">
      <div className='container'>
        <div className="header1">
          <div className="text">Verify Email </div>
          <div className="underline"></div>
        </div>
        <form onSubmit={VerifyOtpHandler}>
          <div className="inputs">
            <div className="input">
              <img src={password_icon} alt="" />
              <input type="text" id="otp" placeholder='enter OTP' onChange={(e) => changeHandler(e, 'otp')} value={data.otp} />
            </div>

            <div className="submit-container">
              <button className="submit" type='submit'>Verify OTP</button>
            </div>
          </div>
        </form>

      </div>
    </div>
    </Base>
  );
};
export default VerifyOtp;