import React, { useContext } from 'react';
import '../login/login.css';
import { AuthContext } from '../../Authentication/AuthContext';


export default function Signin(){
    const {handleSignUp, handleSignUpSubmit, handleSinUpInputChange, signUpcreds}  = useContext(AuthContext);
    
    return(
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="loginLogo">Slaybook</div>
                    <div className="logoDesc">Connect with friends and world around you on slaybook.</div>

                </div>
                <div className="loginRight">
                
                <div className="login-form">
                <form  onSubmit={handleSignUpSubmit}>
                <div className="signinBox">
                
                <input 
                placeholder="First Name" 
                className="loginaddress" 
                type="firstName"
                name="firstName"
                value={signUpcreds.firstName}
                onChange={handleSinUpInputChange}/>
                <input 
                placeholder="Last Name" 
                className="loginaddress" 
                type="lastName"
                name="lastName"
                value={signUpcreds.lastName}
                onChange={handleSinUpInputChange}/>
                <input 
                placeholder="username" 
                className="loginaddress" 
                type="username"
                name="username"
                value={signUpcreds.username}
                onChange={handleSinUpInputChange}/>
                <input 
                placeholder="Password" 
                className="loginaddress"
                type="password"
                name="password"
                value={signUpcreds.password}
                onChange={handleSinUpInputChange}
                 />
                <button onClick={handleSignUp} className="loginButton">Sign in</button>
                
                <button  type="submit" style={{display
                : "none"}} >submit</button>
                
                </div>
                </form>
                {/* <span className="forgotPswrd">Already registered?</span>
                <button className="loginRegister" onClick={() => navigate("/login")}>Login</button> */}

                </div>


               
                

                </div>
            </div>
        </div>
    )
}