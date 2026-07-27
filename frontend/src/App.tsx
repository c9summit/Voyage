import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Map from './pages/Map'


import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Voyage</h1>
        <nav>
          <NavLink to="/Login">Login</NavLink>
          <NavLink to="/Signup">Signup</NavLink>
          <NavLink to="/Map">Map</NavLink>
          <NavLink to="/Landing">Landing</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/about" element={<Login/>} />
          <Route path="/about" element={<Signup/>} />
          <Route path="/about" element={<Map/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
