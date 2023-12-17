import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";




export const AuthContext = createContext();

export function AuthProvider({ children }) {

   
    const navigate = useNavigate();
    const location = useLocation();

    const [creds, setCreds] = useState({
        username: '',
        email: '',
        password: ''
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreds(prevCreds => ({
          ...prevCreds,
          [name]: value
        }));
  
      };
      
  
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(creds); 
      };

    const key  = "newUser"
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(key)) || {})
  



  const handleLogin = async () => {
    handleSubmit(new Event('submit'));
    console.log(JSON.stringify(creds))
    try {

      console.log(creds)
   
      const response = await fetch("https://data-visualization.vinlarose.repl.co/login" , {
      method: 'POST',
      body: JSON.stringify(creds)});

      const userData = await response.json();
      console.log(userData)

      const {token} = userData
      // if(token){
      //   localStorage.setItem(
      //     key,
      //     JSON.stringify({ token: token})
      //   );
      //   setUser(JSON.parse(localStorage.getItem(key)));
      //   navigate(location?.state?.from?.pathname);
      //   // dispatch({ type: 'CURRENT_USER', payload: foundUser });
        
      // };

     
   

    }catch(e){
      console.error(e)
      
      
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem(key);
    setUser({});
    
  }


  const [signUpcreds, setSignUpCreds] = useState({
    email: "",
    username: '',
    password: ''
  });
  const handleGuestLogin = () => {
    const guestCreds = {
  username: "vinlarose",
  password: "vinlarose",
    };
    setCreds(guestCreds);
    handleLogin();
  };

  const handleSinUpInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpCreds(prevCreds => ({
      ...prevCreds,
      [name]: value
    }));

  };


  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log(signUpcreds); 
  };

  const handleSignUp = () => {
    handleSignUpSubmit(new Event('submit'));

    const signUp = async () => {
      handleSignUpSubmit(new Event('submit'));
      try {
     
        const response = await fetch("https://data-visualization.vinlarose.repl.co/signup" , {
        method: 'POST',
        body: JSON.stringify(signUpcreds)});
  
        const userData = await response.json();
        console.log(userData)
        console.log(userData.user)
  
        const {token} = userData
        if(token){
          localStorage.setItem(
            key,
            JSON.stringify({token: token})
          );
          setUser(JSON.parse(localStorage.getItem(key)));
         
          navigate("/");
          // dispatch({ type: 'CURRENT_USER', payload: createdUser });
        };
  
       
     
  
      }catch(e){
        console.error(e);
        const errormsg = e.errors;
        console.log(errormsg)
      }
    }

    signUp();
   

  }


  

const {token} = user
  

  

  

  return (
    <AuthContext.Provider  value={{user, token,handleLogin ,logoutHandler, handleInputChange, handleSubmit, creds,handleGuestLogin,
    handleSignUp, handleSignUpSubmit, handleSinUpInputChange, signUpcreds}}>
      {children}
    </AuthContext.Provider>
  );
}
