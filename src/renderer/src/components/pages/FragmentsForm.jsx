import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FragmentForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [code, setCode] = useState(initialData.code || '');
  const [tagName, setTagName] = useState(initialData.tagName || '');
  const [showTagForm, setShowTagForm] = useState(false);

  const navigate = useNavigate(); // 🔁 Hook pour la redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() && code.trim()) {
      const data = { title, code };
      if (tagName.trim()) {
        data.tag = tagName.trim();
      }

      onSubmit(data); // Appelle la fonction d'enregistrement

      // Reset form
      setTitle('');
      setCode('');
      setTagName('');
      setShowTagForm(false);

      // Redirige vers la page "fragments"
      navigate('/fragments');
    }
  };

  return (
    <div className="form-container">
      <h2>{initialData.id ? "Edit Fragment" : "Add New Fragment"}</h2>
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

        <button type="submit">
          {initialData.id ? "Update Fragment" : "Save"}
        </button>
      </form>
    </div>
  );
}
