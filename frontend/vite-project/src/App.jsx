import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Round1 from './pages/Round1'
import Round2 from './pages/Round2'
import TeamRegistration from './pages/TeamRegistration'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<TeamRegistration />} />
          <Route path="/round1" element={<Round1 />} />
          <Route path="/round2" element={<Round2 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
