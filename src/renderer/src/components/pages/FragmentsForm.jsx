import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Composant formulaire pour créer ou éditer un fragment de code.
 * 
 * Props :
 * - onSubmit : fonction callback appelée lors de la soumission du formulaire.
 *              Elle reçoit deux arguments : 
 *              1) un objet fragment {title, code, tag?} 
 *              2) l'index du fragment édité (undefined si création).
 * 
 * Fonctionnalités :
 * - Pré-remplit les champs si des données sont passées via navigation (édition).
 * - Permet d'ajouter ou cacher un champ optionnel pour un tag.
 * - Valide que le titre et le code sont non vides avant soumission.
 * - Redirige vers la page "/fragments" après sauvegarde.
 */
export default function FragmentForm({ onSubmit }) {
  // Hook React Router : navigation programmée
  const navigate = useNavigate();

  // Hook React Router : récupère les données envoyées lors de la navigation (édition)
  const location = useLocation();

  // Données initiales du formulaire, ou objet vide (création)
  const initialData = location.state || {};

  // États pour chaque champ du formulaire, initialisés à partir des données reçues
  const [title, setTitle] = useState(initialData.title || '');
  const [code, setCode] = useState(initialData.code || '');
  const [tagName, setTagName] = useState(initialData.tag || '');

  // Booléen pour afficher ou masquer le champ du tag (toggle)
  const [showTagForm, setShowTagForm] = useState(!!initialData.tag);

  /**
   * Fonction appelée à la soumission du formulaire.
   * Empêche le comportement par défaut, valide les champs,
   * appelle onSubmit puis navigue vers la liste des fragments.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Bloque le rechargement de page

    // Validation simple : titre et code doivent être remplis
    if (title.trim() && code.trim()) {
      // Prépare l'objet fragment à envoyer
      const data = { title, code };

      // Ajoute le tag seulement s'il est renseigné
      if (tagName.trim()) {
        data.tag = tagName.trim();
      }

      // Récupère l'index pour édition si présent
      const index = initialData.index;

      // Appelle la fonction de sauvegarde passée en props
      onSubmit(data, index);

      // Redirige vers la page listant les fragments
      navigate('/fragments');
    }
  };

  return (
    <div className="form-container">
      {/* Titre dynamique selon mode création ou édition */}
      <h2>{initialData.title ? "Edit Fragment" : "Add New Fragment"}</h2>

      <form onSubmit={handleSubmit} className="fragment-form">
        {/* Champ texte contrôlé pour le titre */}
        <label>
          Title:
          <input
            type="text"
            value={title}
            placeholder="Enter fragment title"
            onChange={(e) => setTitle(e.target.value)} // Met à jour le state à chaque saisie
            required
          />
        </label>

        {/* Champ textarea contrôlé pour le code */}
        <label>
          Code:
          <textarea
            value={code}
            placeholder="Enter your code here..."
            onChange={(e) => setCode(e.target.value)} // Met à jour le state à chaque saisie
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

        {/* Champ texte tag affiché uniquement si toggle activé */}
        {showTagForm && (
          <label>
            Tag Name:
            <input
              type="text"
              value={tagName}
              placeholder="Enter tag name"
              onChange={(e) => setTagName(e.target.value)} // Mise à jour de l'état tagName
            />
          </label>
        )}

        {/* Bouton de soumission du formulaire */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
