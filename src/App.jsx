import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// we'll import the pages here!
import Home from './pages/Home'
import Header from './components/header'
import Login from './pages/Login'
import Register from './pages/Register'
import AnalysisPage from './pages/AnalysisPage'

function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
