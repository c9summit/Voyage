import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Map from './pages/Map'
import RequireAuth from './components/RequireAuth'

import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/map" element={ <RequireAuth> <Map /> </RequireAuth>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}
