// @ts-nocheck
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <header className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-2xl font-bold">Mortgage Snapshot</h1>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <footer className="mt-16 text-center text-sm text-gray-400">
        <hr className="border-gray-200 mb-4" />
        <p>Mortgage Snapshot © 2026 · Built for first-time buyers</p>
        <p className="mt-1">
          Built by Tom |{' '}
          <a href="https://doowmot.com" className="underline hover:text-gray-600">doowmot.com</a>
        </p>
        <p className="mt-1">
          Feature request or bug? Email{' '}
          <a href="mailto:tom@doowmot.com" className="underline hover:text-gray-600">
            tom@doowmot.com
          </a>
        </p>
      </footer>
    </BrowserRouter>
  )
}

export default App;

