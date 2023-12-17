import React, { useContext } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthContext';

export default function Login(){
    const {handleLogin, creds, handleInputChange, handleSubmit, handleGuestLogin}  = useContext(AuthContext);
    
    const navigate = useNavigate();
    return(
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="loginLogo">Data Visualizer</div>
                    <div className="logoDesc"></div>

                </div>
                <div className="loginRight">
                <form className="login-form" onSubmit={handleSubmit}>
                <div className="loginBox">
                
                <input 
                placeholder="username" 
                className="loginaddress" 
                type="username"
                name="username"
                value={creds.username}
                onChange={handleInputChange}/>
                <input 
                placeholder="email" 
                className="loginaddress" 
                type="email"
                name="email"
                value={creds.email}
                onChange={handleInputChange}/>
                <input 
                placeholder="Password" 
                className="loginaddress"
                type="password"
                name="password"
                value={creds.password}
                onChange={handleInputChange}
                 />
                <button onClick={handleLogin} className="loginButton">Login</button>
                <span className="forgotPswrd">Forgot Password?</span>
                <span className="guestLogin" onClick={handleGuestLogin}>Login with guest credentials</span>
                <button className="loginRegister" onClick={() => navigate("/signup")}>Create a new account</button>
                <button  type="submit" style={{ display: 'none' }}></button>
                
                </div>
                </form>
                

                </div>
            </div>
        </div>
    )
}