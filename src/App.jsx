import './App.css'
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import Homepage from './pages/Homepage'
import Navbar from './components/Navbar';
import Error from './components/Error'

function App() {
  
  const [error, setError] = useState(null)

  return (
    <div className="App">
    
      <Navbar />

      <Routes>
          <Route path={`/`} element={<Homepage />} />
      </Routes>

      {
        error && <Error error={error} />
      }

    </div>
  )
}

export default App
