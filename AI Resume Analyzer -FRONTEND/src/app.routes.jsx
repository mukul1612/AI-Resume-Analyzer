import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected"


export const appRoutes = createBrowserRouter([
    {
        path:"/",
        element:<Protected><div><h1>Home </h1></div></Protected>
        
        
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])