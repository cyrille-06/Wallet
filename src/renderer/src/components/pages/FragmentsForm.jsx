import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Composant de formulaire pour ajouter ou éditer un fragment de code
export default function FragmentForm({ onSubmit }) {
  const navigate = useNavigate();      // Permet la redirection après soumission
  const location = useLocation();      // Récupère les données passées par navigation (state)

  // Données initiales en cas de modification (sinon objet vide)
  const initialData = location.state || {};

  // États du formulaire
  const [title, setTitle] = useState(initialData.title || '');         // Titre du fragment
  const [code, setCode] = useState(initialData.code || '');            // Contenu du code
  const [tagName, setTagName] = useState(initialData.tag || '');       // Tag associé
  const [showTagForm, setShowTagForm] = useState(!!initialData.tag);   // Affichage du champ tag

  // Gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifie que les champs obligatoires ne sont pas vides
    if (title.trim() && code.trim()) {
      const data = { title, code };

      // Si un tag est présent, on l’ajoute à l’objet à soumettre
      if (tagName.trim()) {
        data.tag = tagName.trim();
      }

      const index = initialData.index;   // Permet de savoir si on édite un fragment existant
      onSubmit(data, index);             // Appelle la fonction de soumission (prop)
      navigate('/fragments');            // Redirige vers la liste après soumission
    }
  };

  return (
    <div className="form-container">
      <h2>{initialData.title ? "Edit Fragment" : "Add New Fragment"}</h2>

      {/* Formulaire principal */}
      <form onSubmit={handleSubmit} className="fragment-form">
        {/* Champ titre */}
        <label>
          Title:
          <input
            type="text"
            value={title}
            placeholder="Enter fragment title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        {/* Champ code */}
        <label>
          Code:
          <textarea
            value={code}
            placeholder="Enter your code here..."
            onChange={(e) => setCode(e.target.value)}
            rows="8"
            required
          />
        </label>

        {/* Bouton pour afficher ou masquer le champ tag */}
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

        {/* Champ tag, affiché uniquement si activé */}
        {showTagForm && (
          <label>
            Tag Name:
            <input
              type="text"
              value={tagName}
              placeholder="Enter tag name"
              onChange={(e) => setTagName(e.target.value)}
            />
          </label>
        )}

        {/* Bouton de soumission */}
        <button type="submit">
          {initialData.title ? "Save" : "Save"}
        </button>
      </form>
    </div>
  );
}
