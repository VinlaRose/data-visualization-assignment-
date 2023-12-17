import { createContext,  useEffect, useReducer } from "react";
import {reducer, initialState} from "../Reducer";





export const PostDataContext = createContext();


export const PostDataProvider = ({children}) => {
const [state, dispatch] = useReducer(reducer, initialState);



const getData = async () => {
    try {

        //getting all posts
      const response = await fetch("api/posts");

      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: {posts: data.posts} });
      
    


    
      }

     
    catch(e){
     console.log(e)
     }
    };

    const getUsersData = async () => {
        try{
              //getting all users
          const response2 = await fetch("api/users");
    
          const response2Data = await response2.json();
          dispatch({ type: 'FETCH_USERS', payload: {users: response2Data.users} });
    
        }catch(e){
            console.log(e)
            }
    };


    
    useEffect(() => {
        //POSTS

        getData();


        //USERS

        
        getUsersData();

        },[]);
    

    return (
        <PostDataContext.Provider value={{state, dispatch, getData, getUsersData}}>
            {children}
        </PostDataContext.Provider>
    )
}