import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Fragments from './components/pages/Fragments';
import Tags from './components/pages/Tags';
import Info from './components/pages/Info';
import FragmentForm from './components/pages/FragmentsForm';

function App() {
  const navigate = useNavigate();  // Crée la fonction de navigation

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div>
      <Header onNavigate={handleNavigation} /> {/* Passe la fonction de navigation */}
      
      <Routes>
        <Route path="/" element={<Fragments />} />
        <Route path="/fragments" element={<Fragments />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/new" element={<FragmentForm />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
