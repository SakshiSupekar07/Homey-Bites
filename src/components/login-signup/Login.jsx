import React from 'react'
import { useState, useEffect } from 'react'
import './LoginSignup.css'
import email_icon from '/email.png'
import password_icon from '/password.png'
import { logIn, sendOtp,forgetpassword } from '../../Services/UserService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { doLogin } from '../Auth'

const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState({
    errors: {},
    isError: false
  })

  useEffect(() => {
    //console.log(data);
  }, [data])

  // change handler
  const changeHandler = (event, property) => {
    setData({ ...data, [property]: event.target.value })
  }
 //Email Handler
  const verifyEmailHandler = () => {
    if(!data.username){
      toast.error("Please enter email id to send OTP")
    }
    sendOtp(data.username).then((response) => {
      console.log(response)
      console.log("success")
      toast.success("Email verification OTP sent successfully..!")
      navigate('/verify-otp')

    }).catch((error)=>{
      console.log(error)
      console.log("error log")
    })
  }
  //forget  password handler
  const forgetpasswordHandler = () => {
    navigate('/forget-password');  // Navigate to the Forget Password Page
  };
  


  //login handler
  const loginHandler = (event) => {
    event.preventDefault()

    //console.log(data)
    // validation
    if (!data.username && !data.password) {
      toast.error("please enter email id and password..!")
      return;
    }

    // if (!data.username) {
    //   toast.error("please enter the email id..!")
    //   return;
    // }

    // if (!data.password) {
    //   toast.error("please enter the password..!")
    //   return;
    // }
    // if(localStorage.getItem("isVerified")){
    //   toast.error("Unable to login. Email not verified..!")
    //   return;
    // }

    //sending data to backend
    logIn(data).then((response) => {
      console.log(response)
      console.log("SUccess log")

      // save data to local storage
      doLogin(response, () => {
        console.log("data stored in local storage")

        //redirect
        navigate('/')
      })

      toast.success("User logged in successfully..!")
    
    }).catch((error) => {

      // email related errors
      if (error.response?.data?.username)
        toast.error(error.response?.data?.username)

      // password length related errors
      if (error.response?.data?.password)
        toast.error(error.response?.data?.password)

      console.log(error)
      // console.log(error.response?.data?.message)

      // invalid username and password
      toast.error(error.response?.data?.message)
    })
  }

  return (
    <body className="login-page">
      <div className='container'>
        <div className="header1">
          <div className="text">Sign-Up</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={loginHandler}>
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input type="email" id="emaiid" placeholder='Email Id' onChange={(e) => changeHandler(e, 'username')} value={data.username} />
            </div>

            <div className="input">
              <img src={password_icon} alt="" />
              <input type="password" id="password" placeholder='Password' onChange={(e) => changeHandler(e, 'password')} value={data.password} />
            </div>
            <div className="forget-password"  onClick={() => navigate('/forgetpassword')} > Forget Password?</div>

            <div className="submit-container">
              {/* <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>SignUp</div> */}

              <button className="submit" type='submit'>SignUp</button>
              <div className="submit" onClick={() => navigate('/signup')}>Sign In</div>
            </div>
            <div className="verify-email" onClick={verifyEmailHandler}> Verify Email</div>
          </div>
        </form>

      </div>
    </body>

  );
};
export default Login; 