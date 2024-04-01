import toast from "react-hot-toast";
import {apiConnnector} from "../apiConnector"
import { userEndpoints } from "../Apis";
import { setToken, setUser } from "../../slice/userSlice";



async function login(data,navigate,dispatch){
    const toastId=toast.loading("Loading...")
    console.log(data);
    try {
        const response=await apiConnnector("POST",userEndpoints.LOGING_API,data)
        if(!response.data.success){
            throw new Error("Login Error")
        }
        console.log(response);

        dispatch(setUser(response.data.user))
        dispatch(setToken(response.data.token))
        localStorage.setItem("token",JSON.stringify(response.data.token))
        localStorage.setItem("user",JSON.stringify(response.data.user))
        toast.success("Login Successfull")
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    navigate("/")
}

export {login}