import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { setTask } from '../service/operation/userApi'

function TaskPage() {
    const {register,handleSubmit,formState:{errors}}=useForm()
    function sendTask(){
        setTask()
    }
  return (
    <div className='w-full h-full  flex items-center justify-center'>
        
         <form onSubmit={handleSubmit(sendTask)} className='flex flex-col text-left'>
                <label htmlFor="description">Task Name</label>
                <input type="text" id='description' placeholder='description' {...register("description",{required:true})} className='bg-gray-300'/>
                {errors.description && <p>Name is requierd</p>}

                <label htmlFor="startTime">Start Time</label>
                <input type="datetime-local" id='startTime'  {...register("startTime")} className='bg-gray-300'/>
                {errors.email && <p>Email is requierd</p>}


                <label htmlFor="endTime">End Time</label>
                <input type="datetime-local" id='endTime' {...register("endTime")} className='bg-gray-300'/>
                {errors.password && <p>Password is requierd</p>}

                <button type='submit' className='py-1 px-3 bg-green-500 mt-5'>Add</button>
            </form>
    </div>
  )
}

export default TaskPage