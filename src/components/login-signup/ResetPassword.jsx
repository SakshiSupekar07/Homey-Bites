import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Base from '../../components/Base/Base'
import password_icon from '/password.png'
import { resetPass } from '../../Services/UserService';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        newPassword: '',
        cPassword: ''
    })

    // change handler
    const changeHandler = (event, property) => {
        setData({ ...data, [property]: event.target.value })
    }

    const ResetPasswordHandler = (event) => {
        event.preventDefault()

        if (!data.cPassword && !data.newPassword) {
            toast.error("please enter password..!")
            return;
        }

        resetPass(data, localStorage.getItem("username")).then((response) => {
            localStorage.removeItem("username")
            console.log("success",response)
            toast.success(response.message+" please login..")
            navigate('/login')
        }).catch((error)=>{
            console.log("error",error)
        })
    }

    return (
        <Base>
            <div className="login-page">
                <div className='container'>
                    <div className="header1">
                        <div className="text">Reset Password</div>
                        <div className="underline"></div>
                    </div>
                    <form onSubmit={ResetPasswordHandler}>
                        <div className="inputs">
                            <div className="input">
                                <img src={password_icon} alt="" />
                                <input type="password" id="password" placeholder='Enter new Password' onChange={(e) => changeHandler(e, 'newPassword')} value={data.newPassword} />
                            </div>

                            <div className="input">
                                <img src={password_icon} alt="" />
                                <input type="password" id="cpassword" placeholder='Re-enter password' onChange={(e) => changeHandler(e, 'cPassword')} value={data.cPassword} />
                            </div>

                            <div className="submit-container">
                                <button className="submit" type='submit'>Reset password</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </Base>
    )
};

export default ResetPassword;