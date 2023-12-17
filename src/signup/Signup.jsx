import React, { useContext } from 'react';
import '../login/login.css';
import { AuthContext } from '../Authentication/AuthContext';



export default function Signin(){
    const {handleSignUp, handleSignUpSubmit, handleSinUpInputChange, signUpcreds}  = useContext(AuthContext);
    
    return(
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="loginLogo">Data Visualizer</div>
                    <div className="logoDesc"></div>

                </div>
                <div className="loginRight">
                
                <div className="login-form">
                <form  onSubmit={handleSignUpSubmit}>
                <div className="signinBox">
                
                <input 
                placeholder="email" 
                className="loginaddress" 
                type="email"
                name="email"
                value={signUpcreds.email}
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

                </div>


               
                

                </div>
            </div>
        </div>
    )
}