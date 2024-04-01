import React from 'react'
import { useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../service/operation/userApi'

function EmpLogin() {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    function getData(data){
        // data.role="employee"
        console.log(data);
        login(data,navigate,dispatch)
    }
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className=''>
            <form onSubmit={handleSubmit(getData)} className='flex flex-col text-left'>
                {/* <label htmlFor="fullName">Employe Name</label>
                <input type="text" id='fullName' placeholder='xyz' {...register("fullName",{required:true})} className='bg-gray-300'/>
                {errors.fullName && <p>Name is requierd</p>} */}

                <label htmlFor="email">Email</label>
                <input type="email" id='email' placeholder='abc@gmail.com' {...register("email",{required:true})} className='bg-gray-300'/>
                {errors.email && <p>Email is requierd</p>}


                <label htmlFor="password">Password</label>
                <input type="password" id='password' placeholder='password' {...register("password",{required:true})} className='bg-gray-300'/>
                {errors.password && <p>Password is requierd</p>}

                <button type='submit' className='py-1 px-3 bg-green-500 mt-5'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default EmpLogin