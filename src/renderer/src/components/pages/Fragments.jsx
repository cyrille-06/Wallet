import React, { useState } from 'react';

export default function Fragments({ fragments, onDelete, onEdit }) {
  // Index du fragment actuellement ouvert 
  const [activeIndex, setActiveIndex] = useState(null);

  // Booléen pour gérer l'affichage de la modale de confirmation suppression
  const [modalOpen, setModalOpen] = useState(false);

  // Index du fragment sélectionné pour suppression
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Copie le code dans le presse-papier et affiche une alerte selon succès ou échec
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => alert('Code copied to clipboard!'))
      .catch(() => alert('Failed to copy code'));
  };

  // Ouvre la modale et sélectionne le fragment à supprimer
  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setModalOpen(true);
  };

  // Ferme la modale et réinitialise l'index de suppression
  const closeModal = () => {
    setDeleteIndex(null);
    setModalOpen(false);
  };

  // Confirme la suppression du fragment sélectionné
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      onDelete(deleteIndex);  // Appelle la fonction de suppression reçue en props
      setActiveIndex(null);   // Ferme l'affichage détaillé si ouvert
      closeModal();           // Ferme la modale
    }
  };

  return (
    <div className="fragments-container">
      <h2>Fragments List</h2>

      {/* Si aucun fragment, afficher message */}
      {fragments.length === 0 ? (
        <p>No fragments yet!</p>
      ) : (
        <ul className="fragment-list">
          {/* Parcourt chaque fragment */}
          {fragments.map((frag, i) => (
            <li
              key={i}
              className="fragment-item"
              style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}
            >
              {/* Entête du fragment : titre + bouton pour afficher/masquer le détail */}
              <div
                className="fragment-header"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <strong>{frag.title}</strong>
                <button onClick={() => setActiveIndex(activeIndex === i ? null : i)}>
                  {activeIndex === i ? 'Hide' : '👁 '}
                </button>
              </div>

              {/* Détail du fragment visible uniquement si actif */}
              {activeIndex === i && (
                <>
                  {/* Bloc code formaté */}
                  <pre
                    style={{
                      marginTop: '10px',
                      background: '#f5f5f5',
                      padding: '10px',
                      whiteSpace: 'pre-wrap',
                      borderRadius: '4px',
                    }}
                  >
                    {frag.code}
                  </pre>

                  {/* Bouton tag s'il existe */}
                  {frag.tag && (
                    <button
                      className="tag-button"
                      onClick={() => alert(`Tag clicked: ${frag.tag}`)}
                      aria-label={`Tag: ${frag.tag}`}
                    >
                      🏷️ {frag.tag}
                    </button>
                  )}

                  {/* Boutons d'action sur le fragment */}
                  <div
                    className="fragment-actions"
                    style={{ marginTop: '10px', display: 'flex', gap: '10px' }}
                  >
                    {/* Copier le code */}
                    <button onClick={() => handleCopy(frag.code)}>📋 Copy</button>

                    {/* Editer le fragment */}
                    <button onClick={() => onEdit(i)}>✏️ Edit</button>

                    {/* Supprimer : ouvre modale */}
                    <button onClick={() => openDeleteModal(i)}>🗑 Delete</button>

                    {/* Annuler la vue détaillée */}
                    <button onClick={() => setActiveIndex(null)}>❌ Cancel</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Modale de confirmation suppression */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this fragment?</p>
            <div className="modal-actions">
              <button className="modal-btn cancel-btn" onClick={closeModal}>No</button>
              <button className="modal-btn confirm-btn" onClick={confirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
