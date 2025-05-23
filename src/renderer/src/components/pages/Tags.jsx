import React, { useState } from 'react';

export default function Tags() {
  // État pour stocker la liste des tags (initialement vide)
  const [tags, setTags] = useState([]);
  
  // État pour stocker le tag en cours d'édition ou création dans la modale
  const [selectedTag, setSelectedTag] = useState('');
  
  // Index du tag édité dans la liste, null si nouveau tag
  const [editIndex, setEditIndex] = useState(null);
  
  // Booléen pour afficher ou non la modale
  const [modalOpen, setModalOpen] = useState(false);

  // Ouvre la modale, en mettant en place les valeurs pour édition ou création
  // tag = tag à éditer (ou '' pour nouveau), index = position dans le tableau
  const openModal = (tag = '', index = null) => {
    setSelectedTag(tag);
    setEditIndex(index);
    setModalOpen(true);
  };

  // Ferme la modale et réinitialise les états liés à l'édition
  const closeModal = () => {
    setSelectedTag('');
    setEditIndex(null);
    setModalOpen(false);
  };

  // Sauvegarde le tag : soit mise à jour soit ajout
  const handleSave = () => {
    if (selectedTag.trim() === '') return; // Ignore si vide
    
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

  // Supprime un tag selon son index dans la liste
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

      {/* Liste des tags affichée avec bouton éditer */}
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
              {/* Bouton supprimer visible uniquement en édition */}
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
