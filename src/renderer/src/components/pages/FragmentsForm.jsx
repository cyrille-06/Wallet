import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FragmentForm({ onSubmit }) {
  const navigate = useNavigate();
  const location = useLocation();

  // On récupère les données passées en state (édition) ou un objet vide
  const initialData = location.state || {};

  // États du formulaire initialisés avec les données existantes ou vides
  const [title, setTitle] = useState(initialData.title || '');
  const [code, setCode] = useState(initialData.code || '');
  const [tagName, setTagName] = useState(initialData.tag || '');
  const [showTagForm, setShowTagForm] = useState(!!initialData.tag);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() && code.trim()) {
      const data = { title, code };

      if (tagName.trim()) {
        data.tag = tagName.trim();
      }

      const index = initialData.index; // null ou index si édition
      onSubmit(data, index);
      navigate('/fragments');
    }
  };

  return (
    <div className="form-container">
      <h2>{initialData.title ? "Edit Fragment" : "Add New Fragment"}</h2>

      <form onSubmit={handleSubmit} className="fragment-form">
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

        <button type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
