import React, { useState } from 'react';

export default function Fragments({ fragments, onDelete, onEdit }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => alert('Code copied to clipboard!'))
      .catch(() => alert('Failed to copy code'));
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setDeleteIndex(null);
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      onDelete(deleteIndex);
      setActiveIndex(null);
      closeModal();
    }
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
              <div
                className="fragment-header"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <strong>{frag.title}</strong>
                <button onClick={() => setActiveIndex(activeIndex === i ? null : i)}>
                  {activeIndex === i ? 'Hide' : '👁 '}
                </button>
              </div>

              {activeIndex === i && (
                <>
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

                  {frag.tag && (
                    <div
                      style={{
                        marginTop: '5px',
                        fontStyle: 'italic',
                        color: '#9A48D0',
                      }}
                    >
                      🏷️ Tag: {frag.tag}
                    </div>
                  )}

                  <div
                    className="fragment-actions"
                    style={{ marginTop: '10px', display: 'flex', gap: '10px' }}
                  >
                    <button onClick={() => handleCopy(frag.code)}>📋 Copy</button>
                    <button onClick={() => onEdit(i)}>✏️ Edit</button>
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
