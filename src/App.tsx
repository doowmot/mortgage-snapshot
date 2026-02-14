// @ts-nocheck
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1 className="text-2xl font-bold">Mortgage Snapshot</h1>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
