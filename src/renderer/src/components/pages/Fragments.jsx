import React, { useState } from 'react';

// Exemple de données de fragments
const initialFragments = [
  {
    id: 1,
    title: "React useState Hook",
    code: `const [count, setCount] = useState(0);`,
  },
  {
    id: 2,
    title: "JavaScript Array Map",
    code: `const squares = arr.map(num => num * num);`,
  },
  {
    id: 3,
    title: "CSS Flexbox Centering",
    code: `display: flex;\njustify-content: center;\nalign-items: center;`,
  }
];

export default function Fragments() {
  const [fragments, setFragments] = useState(initialFragments);
  const [selectedFragment, setSelectedFragment] = useState(null);

  // Ouvrir la modale pour afficher le code complet
  const openModal = (fragment) => {
    setSelectedFragment(fragment);
  };

  const closeModal = () => {
    setSelectedFragment(null);
  };

  return (
    <div className="fragments-container">
      <h2>My Code Fragments</h2>
      <div className="fragments-list">
        {fragments.map(fragment => (
          <div key={fragment.id} className="fragment-card">
            <h3>{fragment.title}</h3>
            <p>{fragment.code.slice(0, 30)}...</p>
            <button onClick={() => openModal(fragment)}>View Code</button>
          </div>
        ))}
      </div>

      {selectedFragment && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedFragment.title}</h3>
            <pre>{selectedFragment.code}</pre>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
