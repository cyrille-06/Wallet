import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Composant pour créer ou éditer un fragment de code
export default function FragmentForm({ onSubmit }) {
  // Hook React Router pour navigation programmée
  const navigate = useNavigate();

  // Hook React Router pour récupérer les données passées en state via navigation
  const location = useLocation();

  // Données initiales pour pré-remplir le formulaire (si édition)
  const initialData = location.state || {};

  // États pour stocker les valeurs des champs du formulaire
  // On utilise initialData pour initialiser lors d'une édition
  const [title, setTitle] = useState(initialData.title || '');
  const [code, setCode] = useState(initialData.code || '');
  const [tagName, setTagName] = useState(initialData.tag || '');

  // Booléen pour contrôler l'affichage du champ tag optionnel
  // Affiché uniquement si on a un tag initialement
  const [showTagForm, setShowTagForm] = useState(!!initialData.tag);

  // Fonction déclenchée lors de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de page

    // Validation basique : titre et code doivent être renseignés
    if (title.trim() && code.trim()) {
      // On prépare l'objet à envoyer
      const data = { title, code };

      // Si un tag a été saisi, on l'ajoute à l'objet
      if (tagName.trim()) {
        data.tag = tagName.trim();
      }

      // On récupère l'index du fragment si on édite un existant
      const index = initialData.index;

      // On appelle la fonction onSubmit passée en props
      // avec les données et l'index (peut être undefined si création)
      onSubmit(data, index);

      // Après soumission, on redirige vers la liste des fragments
      navigate('/fragments');
    }
  };

  // JSX renvoyé : formulaire avec champs contrôlés
  return (
    <div className="form-container">
      {/* Titre dynamique selon création ou édition */}
      <h2>{initialData.title ? "Edit Fragment" : "Add New Fragment"}</h2>

      <form onSubmit={handleSubmit} className="fragment-form">
        {/* Champ texte pour le titre */}
        <label>
          Title:
          <input
            type="text"
            value={title}
            placeholder="Enter fragment title"
            onChange={(e) => setTitle(e.target.value)} // mise à jour état
            required
          />
        </label>

        {/* Champ textarea pour le code */}
        <label>
          Code:
          <textarea
            value={code}
            placeholder="Enter your code here..."
            onChange={(e) => setCode(e.target.value)} // mise à jour état
            rows="8"
            required
          />
        </label>

        {/* Bouton toggle pour afficher/cacher le champ tag */}
        <div style={{ marginTop: '10px' }}>
          <button
            type="button"
            onClick={() => setShowTagForm(!showTagForm)}
            style={{
              background: 'none',
              border: 'none',
              color: '#9A48D0',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}
          >
            {showTagForm ? 'Hide Tag Form ▲' : 'Add a Tag ▼'}
          </button>
        </div>

        {/* Champ texte pour le tag, affiché uniquement si toggle activé */}
        {showTagForm && (
          <label>
            Tag Name:
            <input
              type="text"
              value={tagName}
              placeholder="Enter tag name"
              onChange={(e) => setTagName(e.target.value)} // mise à jour état
            />
          </label>
        )}

        {/* Bouton pour soumettre le formulaire */}
        <button type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
