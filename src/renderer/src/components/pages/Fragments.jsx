import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Fragments({ fragments, onDelete }) {
  // Index du fragment actuellement développé (affiché en détail), ou null si aucun
  const [activeIndex, setActiveIndex] = useState(null);

  // Booléen qui contrôle l'affichage de la modale de confirmation de suppression
  const [modalOpen, setModalOpen] = useState(false);

  // Index du fragment sélectionné pour suppression dans la modale, ou null si aucun
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Hook React Router pour naviguer entre les pages
  const navigate = useNavigate();

  /**
   * Copie le code passé en argument dans le presse-papier.
   * Affiche une alerte selon succès ou échec.
   * @param {string} code 
   */
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => alert('Code copied to clipboard!'))
      .catch(() => alert('Failed to copy code'));
  };

  /**
   * Ouvre la modale de confirmation suppression
   * et stocke l'index du fragment à supprimer.
   * @param {number} index 
   */
  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setModalOpen(true);
  };

  /**
   * Ferme la modale de suppression et reset l'index de suppression.
   */
  const closeModal = () => {
    setDeleteIndex(null);
    setModalOpen(false);
  };

  
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      onDelete(deleteIndex);        // Supprime dans le parent
      setActiveIndex(null);         // Reset fragment actif
      closeModal();
    }
  };

  /**
   * Lance la navigation vers la page de création/édition d'un fragment.
   * Passe dans l'état de navigation les données du fragment et son index.
   * @param {Object} fragment Objet fragment {title, code, tag}
   * @param {number} index Index du fragment
   */
  const handleEdit = (fragment, index) => {
    navigate('/new', {
      state: { ...fragment, index }
    });
  };

  useEffect(() => {
    localStorage.setItem('fragments', JSON.stringify(fragments));
  }, [fragments]);

  return (
    <div className="fragments-container">
      <h2>Fragments List</h2>

      {/* Si aucun fragment, affichage message */}
      {fragments.length === 0 ? (
        <p>No fragments yet!</p>
      ) : (
        <ul className="fragment-list">
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

                {/* Bouton pour afficher ou cacher le détail du fragment */}
                <button onClick={() => setActiveIndex(activeIndex === i ? null : i)}>
                  {activeIndex === i ? 'Hide' : '👁 '}
                </button>
              </div>

              {/* Affiche le détail uniquement si ce fragment est actif */}
              {activeIndex === i && (
                <>
                  {/* Affichage du code formaté avec style */}
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

                  {/* Affiche un bouton tag si tag existe */}
                  {frag.tag && (
                    <button
                      className="tag-button"
                      onClick={() => alert(`Tag clicked: ${frag.tag}`)}
                      aria-label={`Tag: ${frag.tag}`}
                    >
                      🏷️ {frag.tag}
                    </button>
                  )}

                  {/* Boutons d'actions sur le fragment */}
                  <div
                    className="fragment-actions"
                    style={{ marginTop: '10px', display: 'flex', gap: '10px' }}
                  >
                    <button onClick={() => handleCopy(frag.code)}>📋 Copy</button>
                    <button onClick={() => handleEdit(frag, i)}>✏️ Edit</button>
                    <button onClick={() => openDeleteModal(i)}>🗑 Delete</button>

                    {/* Bouton Info redirige vers la page d'information */}
                    <button onClick={() => navigate('/info')}>ℹ️ Info</button>

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
              <button className="modal-btn cancel-btn" onClick={closeModal}>No</button>
              <button className="modal-btn confirm-btn" onClick={confirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
