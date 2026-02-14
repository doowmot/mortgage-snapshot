// @ts-nocheck
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';

function App() {
  return (
    <BrowserRouter>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mortgage Snapshot</h1>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/tools" className="hover:underline">Tools</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<CalculatorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
