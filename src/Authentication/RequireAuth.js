import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";


export function RequiresAuth({ children }) {
  
  const { user } = useContext(AuthContext);

  const {encodedToken} = user

  
  let location = useLocation();
 
  return encodedToken ? children : <Navigate to="/login" state={{ from: location }} />;
}