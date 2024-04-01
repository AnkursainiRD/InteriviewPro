import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full h-[10vh] bg-green-300 flex justify-between text-1xl text-white font-bold items-center '>
        <div className='ml-10'>
            Name
        </div>
        <div className='mr-10 flex gap-4 cursor-pointer'>
             <Link to={"/"}>Home</Link>
            <Link to={"/task"}>Task</Link>
            <Link to={'/empLogin'}>Login</Link>
            <Link>Manager Login</Link>
        </div>
    </div>
  )
}

export default Navbar