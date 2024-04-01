import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem("user")?(JSON.parse(localStorage.getItem("user"))):null,
    token:localStorage.getItem("token")?(JSON.parse(localStorage.getItem("token"))):null,
    task:null
}

const userSlice=createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setLogout:(state,action)=>{
            state.user=null,
            state.token=null
        }

    }
})

export const {setUser,setToken,setLogout}=userSlice.actions
export default userSlice.reducer