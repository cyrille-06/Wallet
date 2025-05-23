import React from 'react';

export default function Header({ onNavigate, darkMode, onToggleDarkMode }) {
  return (
    <header className="header">
      {/* Logo cliquable qui déclenche la navigation vers 'fragments' */}
      <h1 className="logo" onClick={() => onNavigate('fragments')}>
        Code Wallet
      </h1>

      {/* Barre de navigation avec boutons pour changer de page */}
      <nav className="nav">
        <button onClick={() => onNavigate('fragments')}>Fragments</button>
        <button onClick={() => onNavigate('tags')}>Tags</button>
        <button onClick={() => onNavigate('new')}>New</button>
        <button onClick={() => onNavigate('info')}>Infos</button>

        {/* Switch toggle pour le mode sombre */}
        <label className="switch" style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            checked={darkMode}          // État du mode sombre 
            onChange={onToggleDarkMode} // Fonction pour activer/désactiver le mode sombre
          />
          <span className="slider round"></span> {/* Style visuel du switch */}
        </label>
      </nav>
    </header>
  );
}
