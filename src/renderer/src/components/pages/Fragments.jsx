import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Composant qui affiche la liste des fragments avec options : afficher, copier, éditer, supprimer
export default function Fragments({ fragments, onDelete, onEdit }) {
  // Index du fragment actuellement ouvert (null si aucun)
  const [activeIndex, setActiveIndex] = useState(null);
  // Contrôle de l'affichage de la modale de confirmation de suppression
  const [modalOpen, setModalOpen] = useState(false);
  // Index du fragment sélectionné pour suppression
  const [deleteIndex, setDeleteIndex] = useState(null);

  const navigate = useNavigate();

  // Copie le code d’un fragment dans le presse-papiers
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => alert('Code copied to clipboard!'))
      .catch(() => alert('Failed to copy code'));
  };

  // Ouvre la modale de suppression pour confirmer
  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setModalOpen(true);
  };

  // Ferme la modale et réinitialise l’index
  const closeModal = () => {
    setDeleteIndex(null);
    setModalOpen(false);
  };

  // Supprime le fragment après confirmation
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      onDelete(deleteIndex);
      setActiveIndex(null);
      closeModal();
    }
  };

  // Lance l’édition du fragment en naviguant vers le formulaire avec les données en state
  const handleEdit = (fragment, index) => {
    navigate('/new', {
      state: { ...fragment, index }
    });
    // Optionnel : appeler aussi la prop onEdit si tu veux faire autre chose
    if (onEdit) onEdit(fragment, index);
  };

  return (
    <div className="fragments-container">
      <h2>Fragments List</h2>

      {fragments.length === 0 ? (
        <p>No fragments yet!</p>
      ) : (
        <ul className="fragment-list">
          {fragments.map((frag, i) => (
            <li
              key={i}
              className="fragment-item"
              style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}
            >
              <div className="fragment-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{frag.title}</strong>
                <button onClick={() => setActiveIndex(activeIndex === i ? null : i)}>
                  {activeIndex === i ? 'Hide' : '👁 '}
                </button>
              </div>

              {activeIndex === i && (
                <>
                  <pre style={{
                    marginTop: '10px',
                    background: '#f5f5f5',
                    padding: '10px',
                    whiteSpace: 'pre-wrap',
                    borderRadius: '4px',
                  }}>
                    {frag.code}
                  </pre>

                  {frag.tag && (
                    <button
                      className="tag-button"
                      onClick={() => alert(`Tag clicked: ${frag.tag}`)}
                      aria-label={`Tag: ${frag.tag}`}
                    >
                      🏷️ {frag.tag}
                    </button>
                  )}

                  <div
                    className="fragment-actions"
                    style={{ marginTop: '10px', display: 'flex', gap: '10px' }}
                  >
                    <button onClick={() => handleCopy(frag.code)}>📋 Copy</button>
                    <button onClick={() => handleEdit(frag, i)}>✏️ Edit</button>
                    <button onClick={() => openDeleteModal(i)}>🗑 Delete</button>
                    <button onClick={() => setActiveIndex(null)}>❌ Cancel</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

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
