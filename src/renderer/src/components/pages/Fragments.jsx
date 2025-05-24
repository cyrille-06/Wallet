import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Composant affichant la liste des fragments, avec options pour copier, éditer et supprimer
export default function Fragments({ fragments, onDelete }) {
  // Index du fragment actuellement ouvert (affiché en détail)
  const [activeIndex, setActiveIndex] = useState(null);

  // Contrôle l'affichage de la modale de confirmation de suppression
  const [modalOpen, setModalOpen] = useState(false);

  // Stocke l'index du fragment sélectionné pour suppression
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Hook React Router pour naviguer vers la page d'édition
  const navigate = useNavigate();

  // Fonction pour copier le code dans le presse-papier
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => alert('Code copied to clipboard!')) // succès
      .catch(() => alert('Failed to copy code')); // échec
  };

  // Ouvre la modale et stocke l'index du fragment à supprimer
  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setModalOpen(true);
  };

  // Ferme la modale et reset l'index de suppression
  const closeModal = () => {
    setDeleteIndex(null);
    setModalOpen(false);
  };

  // Confirme la suppression : appelle onDelete avec l'index
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      onDelete(deleteIndex);
      setActiveIndex(null); // ferme le détail affiché si ouvert
      closeModal();
    }
  };

  // Lance la navigation vers la page de création/édition, en passant les données du fragment et son index
  const handleEdit = (fragment, index) => {
    navigate('/new', {
      state: { ...fragment, index }
    });
  };

  return (
    <div className="fragments-container">
      <h2>Fragments List</h2>

      {/* Si pas de fragment, message utilisateur */}
      {fragments.length === 0 ? (
        <p>No fragments yet!</p>
      ) : (
        <ul className="fragment-list">
          {/* Parcours des fragments pour affichage */}
          {fragments.map((frag, i) => (
            <li
              key={i}
              className="fragment-item"
              style={{ borderBottom: '1px solid #FFFFFF', padding: '1rem' }}
            >
              <div
                className="fragment-header"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {/* Titre du fragment */}
                <strong>{frag.title}</strong>

                {/* Bouton pour afficher ou cacher le détail */}
                <button onClick={() => setActiveIndex(activeIndex === i ? null : i)}>
                  {activeIndex === i ? 'Hide' : '👁 '}
                </button>
              </div>

              {/* Détail visible uniquement si actif */}
              {activeIndex === i && (
                <>
                  {/* Affichage du code formaté */}
                  <pre
                    style={{
                      marginTop: '10px',
                      background: '#FFFFFF',
                      padding: '10px',
                      whiteSpace: 'pre-wrap',
                      borderRadius: '4px',
                    }}
                  >
                    {frag.code}
                  </pre>

                  {/* Affichage optionnel du tag */}
                  {frag.tag && (
                    <button
                      className="tag-button"
                      onClick={() => alert(`Tag clicked: ${frag.tag}`)}
                      aria-label={`Tag: ${frag.tag}`}
                    >
                      🏷️ {frag.tag}
                    </button>
                  )}

                  {/* Actions disponibles sur le fragment */}
                  <div
                    className="fragment-actions"
                    style={{ marginTop: '10px', display: 'flex', gap: '10px' }}
                  >
                    {/* Copier dans le presse-papier */}
                    <button onClick={() => handleCopy(frag.code)}>📋 Copy</button>

                    {/* Modifier le fragment */}
                    <button onClick={() => handleEdit(frag, i)}>✏️ Edit</button>

                    {/* Ouvrir modale suppression */}
                    <button onClick={() => openDeleteModal(i)}>🗑 Delete</button>

                    {/* Annuler affichage détail */}
                    <button onClick={() => setActiveIndex(null)}>❌ Cancel</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Modale de confirmation de suppression */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this fragment?</p>
            <div className="modal-actions">
              {/* Annuler suppression */}
              <button className="modal-btn cancel-btn" onClick={closeModal}>No</button>

              {/* Confirmer suppression */}
              <button className="modal-btn confirm-btn" onClick={confirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
