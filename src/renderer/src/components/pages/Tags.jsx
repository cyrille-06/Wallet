import React, { useState, useEffect } from 'react';

export default function Tags() {
  // Initialisation des tags depuis localStorage (ou tableau vide si rien)
  const [tags, setTags] = useState(() => {
    const saved = localStorage.getItem('tags');
    return saved ? JSON.parse(saved) : [];
  });

  // Tag en cours d'édition ou création
  const [selectedTag, setSelectedTag] = useState('');

  // Index du tag édité, null si nouveau tag
  const [editIndex, setEditIndex] = useState(null);

  // Booléen pour afficher la modale
  const [modalOpen, setModalOpen] = useState(false);

  // Sauvegarde automatique dans localStorage à chaque changement de tags
  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

  // Ouvre la modale et prépare le tag pour édition ou création
  const openModal = (tag = '', index = null) => {
    setSelectedTag(tag);
    setEditIndex(index);
    setModalOpen(true);
  };

  // Ferme la modale et reset les champs d'édition
  const closeModal = () => {
    setSelectedTag('');
    setEditIndex(null);
    setModalOpen(false);
  };

  // Enregistre un nouveau tag ou met à jour un tag existant
  const handleSave = () => {
    if (selectedTag.trim() === '') return; // ignore si vide

    if (editIndex !== null) {
      // Mise à jour du tag existant
      const updatedTags = [...tags];
      updatedTags[editIndex] = selectedTag.trim();
      setTags(updatedTags);
    } else {
      // Ajout d'un nouveau tag
      setTags([...tags, selectedTag.trim()]);
    }
    closeModal();
  };

  // Supprime un tag par son index
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

      {/* Liste des tags avec bouton d'édition */}
      <div className="tags-list">
        {tags.map((tag, index) => (
          <div key={index} className="tag-chip">
            <span>{tag}</span>
            <button onClick={() => openModal(tag, index)}>Edit</button>
          </div>
        ))}

        {/* Bouton pour créer un nouveau tag */}
        <button className="new-tag-button" onClick={() => openModal()}>
          + New Tag
        </button>
      </div>

      {/* Modale d'édition ou création */}
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
                <button onClick={handleDelete} className="delete-button">
                  Delete
                </button>
              )}
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
