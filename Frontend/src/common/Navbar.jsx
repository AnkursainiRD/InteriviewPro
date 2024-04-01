import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../service/operation/userApi';

function Navbar() {
    const {token,user}=useSelector(state=>state.user)
    console.log(user);
    const dispatch=useDispatch()
    const navigate=useNavigate()

    function handleClick(){
        logout(dispatch,navigate)
    }
  return (
    <div className='w-full h-[10vh] bg-green-300 flex justify-between text-1xl text-white font-bold items-center '>
        <div className='ml-10'>
            {user?.fullName}
        </div>
        <div className='mr-10 flex gap-4 cursor-pointer'>
             <Link to={"/"}>Home</Link>
           {user?.role=="manager"?(<Link>Time Sheet</Link>):( <Link to={"/task"}>Task</Link>)}
            {token?(<button onClick={handleClick} className='text-red-500'>Logout</button>):(<Link to={'/empLogin'}>Login</Link>)}
            {token?(<button onClick={handleClick} lassName='text-red-500'>Logout</button>):(<Link to={'/managerLogin'}>Manager Login</Link>)}
        </div>
    </div>
  )
}

export default Navbar