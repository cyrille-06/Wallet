import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';

// Import des composants de l'application
import Header from './components/Header';
import Fragments from './components/pages/Fragments';
import Tags from './components/pages/Tags';
import Info from './components/pages/Info';
import FragmentForm from './components/pages/FragmentsForm';

/**
 * Composant principal de l'application
 * Gère l'état global des fragments et du mode sombre
 */
function App() {
  // Etat local pour stocker la liste des fragments de code
  const [fragments, setFragments] = useState([]);
  // Etat local pour gérer le mode sombre (true = activé)
  const [darkMode, setDarkMode] = useState(false);

  // Effet pour appliquer ou retirer la classe 'dark' sur le body selon darkMode
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div>
      {/* On délègue le rendu principal à AppContent pour gérer la navigation */}
      <AppContent
        fragments={fragments}
        setFragments={setFragments}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}

/**
 * Composant qui contient le routage et la logique liée à la navigation
 * ainsi que la gestion des fragments (ajout, modification, suppression)
 */
function AppContent({ fragments, setFragments, darkMode, toggleDarkMode }) {
  // Hook de navigation pour changer de route
  const navigate = useNavigate();
  // Hook pour accéder à la location actuelle (utile pour récupérer state passé par navigate)
  const location = useLocation();

  /**
   * Fonction pour naviguer vers une page donnée par son chemin
   * @param {string} path - Le chemin vers lequel naviguer (ex: 'fragments', 'tags')
   */
  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  /**
   * Fonction pour ajouter un nouveau fragment ou modifier un fragment existant
   * @param {Object} fragment - L'objet fragment contenant title, code, tag
   * @param {number|null} index - Si défini, index du fragment à modifier, sinon ajout en fin
   */
  const handleAddFragment = (fragment, index = null) => {
    if (index !== null) {
      // Modification d'un fragment existant
      const updated = [...fragments];
      updated[index] = fragment;
      setFragments(updated);
    } else {
      // Ajout d'un nouveau fragment
      setFragments(prev => [...prev, fragment]);
    }
    // Retour à la liste des fragments après sauvegarde
    navigate('/fragments');
  };

  /**
   * Fonction pour supprimer un fragment par son index
   * @param {number} index - Index du fragment à supprimer
   */
  const handleDelete = (index) => {
    const updated = [...fragments];
    updated.splice(index, 1);
    setFragments(updated);
  };

  /**
   * Fonction pour éditer un fragment existant
   * Navigue vers la page de formulaire avec les données du fragment sélectionné
   * @param {number} index - Index du fragment à éditer
   */
  const handleEdit = (index) => {
    const fragToEdit = fragments[index];
    navigate('/new', { state: { ...fragToEdit, index } });
  };

  return (
    <>
      {/* En-tête avec navigation et switch mode sombre */}
      <Header
        onNavigate={handleNavigation}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Routes de l'application */}
      <Routes location={location}>
        {/* Liste des fragments avec possibilité d'éditer ou supprimer */}
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

        {/* Page des tags (statique ou fonctionnelle selon implémentation) */}
        <Route path="/tags" element={<Tags />} />

        {/* Formulaire d'ajout / modification de fragment */}
        <Route
          path="/new"
          element={
            <FragmentForm
              onSubmit={handleAddFragment}
              initialData={location.state || {}}
            />
          }
        />

        {/* Page d'information (à propos, aide, etc.) */}
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
}

/**
 * Wrapper principal qui englobe l'app dans BrowserRouter
 * Nécessaire pour utiliser le routage React Router
 */
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
