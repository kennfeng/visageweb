import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// we'll import the pages here!
import Home from './pages/Home'
import Header from './components/header'
import Login from './pages/Login'

function App() {

  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
