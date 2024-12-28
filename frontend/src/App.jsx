import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
      <h1 className='text-5xl text-red-600 font-serif'>Hello, developers</h1>
      <Outlet/>
      </>
  )
}

export default App;
