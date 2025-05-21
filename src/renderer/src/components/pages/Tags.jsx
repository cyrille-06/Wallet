import React, { useState } from 'react';

export default function Tags() {
  const [tags, setTags] = useState([]); // Liste vide par défaut
  const [selectedTag, setSelectedTag] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (tag = '', index = null) => {
    setSelectedTag(tag);
    setEditIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTag('');
    setEditIndex(null);
    setModalOpen(false);
  };

  const handleSave = () => {
    if (selectedTag.trim() === '') return;
    if (editIndex !== null) {
      const updatedTags = [...tags];
      updatedTags[editIndex] = selectedTag.trim();
      setTags(updatedTags);
    } else {
      setTags([...tags, selectedTag.trim()]);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (editIndex !== null) {
      const updatedTags = tags.filter((_, i) => i !== editIndex);
      setTags(updatedTags);
      closeModal();
    }
  };

  return (
    <div className="tags-container">
      <h2>Tags</h2>
      <div className="tags-list">
        {tags.map((tag, index) => (
          <div key={index} className="tag-chip">
            <span>{tag}</span>
            <button onClick={() => openModal(tag, index)}>Edit</button>
          </div>
        ))}
        <button className="new-tag-button" onClick={() => openModal()}>
          + New Tag
        </button>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editIndex !== null ? 'Edit Tag' : 'New Tag'}</h3>
            <input
              type="text"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              placeholder="Tag name"
              autoFocus
            />
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              {editIndex !== null && (
                <button onClick={handleDelete} className="delete-button">Delete</button>
              )}
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
