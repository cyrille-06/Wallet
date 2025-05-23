import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Fragments from './components/pages/Fragments';
import Tags from './components/pages/Tags';
import Info from './components/pages/Info';
import FragmentForm from './components/pages/FragmentsForm';

// Composant principal qui gère l'état global (fragments, dark mode)
function App() {
  // Liste des fragments stockée dans le state
  const [fragments, setFragments] = useState([]);
  // Etat du mode sombre activé ou non
  const [darkMode, setDarkMode] = useState(false);

  // Effet qui applique ou enlève la classe 'dark' sur le body en fonction de darkMode
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Fonction pour basculer entre mode clair / sombre
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div>
      {/* On délègue la logique nécessitant useNavigate dans AppContent */}
      <AppContent
        fragments={fragments}
        setFragments={setFragments}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}

// Composant enfant direct de BrowserRouter pour utiliser useNavigate et useLocation
function AppContent({ fragments, setFragments, darkMode, toggleDarkMode }) {
  const navigate = useNavigate(); // Hook React Router pour naviguer programmatique
  const location = useLocation(); // Hook React Router pour obtenir la location courante

  // Fonction de navigation appelée par le header (boutons)
  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  // Ajoute un nouveau fragment ou modifie un fragment existant (édition)
  const handleAddFragment = (fragment, index = null) => {
    if (index !== null) {
      const updated = [...fragments];
      updated[index] = fragment;
      setFragments(updated);
    } else {
      setFragments((prev) => [...prev, fragment]);
    }
    // Retour à la liste des fragments après ajout ou modification
    navigate('/fragments');
  };

  // Supprime un fragment donné par son index
  const handleDelete = (index) => {
    const updated = [...fragments];
    updated.splice(index, 1);
    setFragments(updated);
  };

  // Prépare l'édition d'un fragment : navigation vers formulaire avec état du fragment à modifier
  const handleEdit = (index) => {
    const fragToEdit = fragments[index];
    navigate('/new', { state: { ...fragToEdit, index } });
  };

  return (
    <>
      {/* Header avec navigation et toggle dark mode */}
      <Header
        onNavigate={handleNavigation}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Routes pour afficher les pages selon l'URL */}
      <Routes location={location}>
        <Route
          path="/fragments"
          element={
            <Fragments
              fragments={fragments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        />
        <Route path="/tags" element={<Tags />} />
        <Route
          path="/new"
          element={<FragmentForm onSubmit={handleAddFragment} />}
        />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
}

// Wrapper qui enveloppe l'app dans le BrowserRouter
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
