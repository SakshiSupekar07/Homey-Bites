import React from 'react'
import { useState, useEffect } from 'react'
import './LoginSignup.css'
import user_icon from '/person.png'
import email_icon from '/email.png'
import password_icon from '/password.png'
import phone_icon from '/phone.svg'
import gender_icon from '/gender.svg'
import date_icon from '/dob.svg'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../Services/UserService'
import { toast } from 'react-toastify'
import Base from '../../components/Base/Base'

const Signup = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        emailId: '',
        phoneNo: '',
        dob: '',
        password: '',
        cpassword: '',
        gender: ''
    })

    useEffect(() => {
        localStorage.setItem("username", data.emailId);
    }, [data])

    // change handler
    const changeHandler = (event, property) => {
        setData({ ...data, [property]: event.target.value })
    }

    //login handler
    const signinHandler = (event) => {
        event.preventDefault()

        if (!data.firstName && !data.lastName && !data.emailId && !data.phoneNo && !data.dob && !data.gender && !data.password && !data.cpassword) {
            toast.error("Please fill all the details..!")
            return;
        }

        //sending data to backend
        signIn(data).then((response) => {
            console.log("SUccess log")
            toast.success("Email registeration OTP has sent to your email id..!")
            navigate('/verify-otp', { state: { from: "SignUp" } });

        }).catch((error) => {
            console.log(error)

            // first name
            if (error.response?.data?.firstName) {
                toast.error(error.response?.data?.firstName)
                return;
            }

            // last name
            if (error.response?.data?.lastName) {
                toast.error(error.response?.data?.lastName)
                return;
            }

            // emai id
            if (error.response?.data?.emailId) {
                toast.error(error.response?.data?.emailId)
                return;
            }
            // phone number
            if (error.response?.data?.phoneNo) {
                toast.error(error.response?.data?.phoneNo)
                return;
            }

            // date of birth
            if (error.response?.data?.dob) {
                toast.error(error.response?.data?.dob)
                return;
            }

            // gender
            if (error.response?.data?.gender) {
                toast.error(error.response?.data?.gender)
                return;
            }

            // password
            if (error.response?.data?.password) {
                toast.error(error.response?.data?.password)
                return;
            }

            // first name
            if (error.response?.data?.cPassword) {
                toast.error(error.response?.data?.cpassword)
                return;
            }

            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message)
                return;
            }
        })
    }

    return (
        <Base>
            <div className="login-page">
                <div className='container-signup'>
                    <div className="header1">
                        <div className="text">Register</div>
                        <div className="underline"></div>
                    </div>
                    <form onSubmit={signinHandler}>
                        <div className="inputs">
                            <div className="input">
                                <img src={user_icon} alt="" />
                                <input type="text" placeholder='enter first name' onChange={(e) => changeHandler(e, 'firstName')} value={data.firstName} />
                            </div>

                            <div className="input">
                                <img src={user_icon} alt="" />
                                <input type="text" placeholder='enter middle name' onChange={(e) => changeHandler(e, 'middleName')} value={data.middleName} />
                            </div>

                            <div className="input">
                                <img src={user_icon} alt="" />
                                <input type="text" placeholder='enter last name' onChange={(e) => changeHandler(e, 'lastName')} value={data.lastName} />
                            </div>

                            <div className="input">
                                <img src={email_icon} alt="" />
                                <input type="email" placeholder='enter email id' onChange={(e) => changeHandler(e, 'emailId')} value={data.emailId} />
                            </div>
                            <div className="input">
                                <img src={phone_icon} alt="" />
                                <input type="text" placeholder='Phone number' onChange={(e) => changeHandler(e, 'phoneNo')} value={data.phoneNo} />
                            </div>

                            <div className="input">
                                <img src={date_icon} alt="" />
                                <input type="date" onChange={(e) => changeHandler(e, 'dob')} value={data.dob} />
                            </div>

                            <div className="input">
                                <img src={password_icon} alt="" />

                                <input type="radio" name="gender" value="Male" onChange={(e) => changeHandler(e, 'gender')} checked={data.gender === "Male"} /> Male



                                <input type="radio" name="gender" value="Female" onChange={(e) => changeHandler(e, 'gender')} checked={data.gender === "Female"} />
                                Female

                                <input type="radio" name="gender" value="Other" onChange={(e) => changeHandler(e, 'gender')} checked={data.gender === "Other"} />
                                Other

                            </div>


                            <div className="input">
                                <img src={password_icon} alt="" />
                                <input type="password" placeholder='enter password' onChange={(e) => changeHandler(e, 'password')} value={data.password} />
                            </div>

                            <div className="input">
                                <img src={password_icon} alt="" />
                                <input type="password" placeholder='Confirm password' onChange={(e) => changeHandler(e, 'cpassword')} value={data.cpassword} />
                            </div>

                            <div className="submit-container">
                                <button className="submit" type='submit'>Register</button>
                                <div className="submit" onClick={() => navigate('/login')}>Login</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Base>
    );
}

export default Signup;