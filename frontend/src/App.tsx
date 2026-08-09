import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Map from './pages/Map'
import Leaderboard from './pages/Leaderboard'
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
          <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}
