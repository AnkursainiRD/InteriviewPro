import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import EmpLogin from './pages/EmpLogin'
import HomePage from './pages/HomePage'
import Navbar from './common/Navbar'
import TaskPage from './pages/TaskPage'
import ManagerLogin from "./pages/ManagerLogin"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-[100vh]'>
      <Navbar/>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/empLogin' element={<EmpLogin/>}/>
          <Route path='/task' element={<TaskPage/>}/>
          <Route path='/managerLogin' element={<ManagerLogin/>}/>
      </Routes>

    </div>
  )
}

export default App
