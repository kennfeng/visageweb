import './App.css';
import LandingPage from './pages/LandingPage';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen gradient-background">
      <Header />
      <LandingPage />
    </div>
  );
}

export default App;
