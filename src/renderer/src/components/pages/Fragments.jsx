import React, { useState } from 'react';

export default function Fragments({ fragments, onDelete, onEdit }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => alert('Code copied to clipboard!'))
      .catch(() => alert('Failed to copy code'));
  };

  return (
    <div className="fragments-container">
      <h2>Fragments List</h2>

      {fragments.length === 0 ? (
        <p>No fragments yet.</p>
      ) : (
        <ul className="fragment-list">
          {fragments.map((frag, i) => (
            <li key={i} className="fragment-item" style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}>
              <div className="fragment-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{frag.title}</strong>
                <button onClick={() => setActiveIndex(activeIndex === i ? null : i)}>
                  {activeIndex === i ? 'Hide' : '👁 View'}
                </button>
              </div>

              {activeIndex === i && (
                <>
                 
                  <div className="fragment-actions" style={{ marginTop: '10px' }}>
                    <button onClick={() => handleCopy(frag.code)}>📋 Copy</button>
                    <button onClick={() => onEdit(i)}>✏️ Edit</button>
                    <button onClick={() => onDelete(i)}>🗑 Delete</button>
                    <button onClick={() => setActiveIndex(null)}>❌ Cancel</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
