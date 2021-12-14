import { Navigate } from "react-router";


export function Authentication({children}) {
    if(!localStorage.access_token){
        return <Navigate to="/login"/>
    }
    return children
}