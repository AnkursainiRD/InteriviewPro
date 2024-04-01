import toast from "react-hot-toast";
import {apiConnnector} from "../apiConnector"
import { taskEndpoints, userEndpoints } from "../Apis";
import { setLogout, setToken, setUser } from "../../slice/userSlice";



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

async function logout(dispatch,navigate){
    try {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch(setLogout())
    } catch (error) {
        console.log(error);
    }
    navigate("/")
}

async function managerLogin(data,navigate,dispatch){
    const toastId=toast.loading("Loading...")
    console.log(data);
    try {
        const response=await apiConnnector("POST",userEndpoints.MANAGER_LOGIN_API,data)
        if(!response.data.success){
            throw new Error("Login Error")
        }
        console.log(response);

        dispatch(setUser(response.data.manager))
        dispatch(setToken(response.data.token))
        localStorage.setItem("token",JSON.stringify(response.data.token))
        localStorage.setItem("user",JSON.stringify(response.data.manager))
        toast.success("Login Successfull")
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    navigate("/")
}


async function setTask(data,token){
    const toastId=toast.loading("Loading....")
    try {
        const response=await apiConnnector("POST",taskEndpoints.ADD_TASK_API,data,{'Authorization': `Bearer ${token}`})
        if(!response.data.success){
            throw new Error("Task Error")
        }
        console.log(response);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export {login,managerLogin,logout,setTask}