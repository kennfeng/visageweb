import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// we'll import the pages here!
import Home from './pages/Home'
import Header from './components/header'
import Login from './pages/Login'
import Register from './pages/Register'
import AnalysisPage from './pages/AnalysisPage'
import Account from './pages/Account'

function App() {

  return (
    <div className="min-h-screen bg-slate-200">
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/account" element={<Account />} /> 
        
      </Routes>
    </Router>
    </div>
  )
}

export default App
