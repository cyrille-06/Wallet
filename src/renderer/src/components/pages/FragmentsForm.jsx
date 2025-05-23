import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FragmentForm({ onSubmit, initialData = {} }) {
  // États pour stocker le titre, le code, et le nom du tag (optionnel)
  // initialData permet de pré-remplir le formulaire en cas d'édition
  const [title, setTitle] = useState(initialData.title || '');
  const [code, setCode] = useState(initialData.code || '');
  const [tagName, setTagName] = useState(initialData.tagName || '');
  
  // Booléen pour afficher ou cacher le formulaire du tag
  const [showTagForm, setShowTagForm] = useState(false);

  // Hook pour gérer la navigation (redirection)
  const navigate = useNavigate();

  // Fonction appelée à la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifie que le titre et le code ne sont pas vides
    if (title.trim() && code.trim()) {
      // Création de l'objet fragment à envoyer
      const data = { title, code };
      
      // Ajoute le tag s'il est renseigné et non vide
      if (tagName.trim()) {
        data.tag = tagName.trim();
      }

      // Appelle la fonction onSubmit passée en props avec les données du fragment
      onSubmit(data);

      // Réinitialisation des champs du formulaire
      setTitle('');
      setCode('');
      setTagName('');
      setShowTagForm(false);

      // Redirection vers la liste des fragments
      navigate('/fragments');
    }
  };

  return (
    <div className="form-container">
      <h2>{initialData.id ? "Edit Fragment" : "Add New Fragment"}</h2>
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

        {/* Champ code (textarea pour plusieurs lignes) */}
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

        {/* Bouton pour afficher/cacher le formulaire de tag */}
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

        {/* Formulaire tag affiché uniquement si showTagForm est vrai */}
        {showTagForm && (
          <div className="tag-form-section">
            <label>
              Tag Name:
              <input
                type="text"
                value={tagName}
                placeholder="Enter tag name"
                onChange={(e) => setTagName(e.target.value)}
              />
            </label>
          </div>
        )}

        {/* Bouton soumettre, change le texte selon édition ou création */}
        <button type="submit">
          {initialData.id ? "Update Fragment" : "Save"}
        </button>
      </form>
    </div>
  );
}
