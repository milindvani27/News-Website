import { redirect } from "react-router-dom";
import Login from "./Login";
export function CheckAuth() {
    const authtoken = localStorage.getItem('token');

    if(!authtoken){
        console.log('token in not generatede')
        return redirect('/login')
    }
    return null;
}