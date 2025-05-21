import React from 'react';

export default function Header({ onNavigate, darkMode, onToggleDarkMode }) {
  return (
    <header className="header">
      <h1 className="logo" onClick={() => onNavigate('fragments')}>
        Code Wallet
      </h1>
      <nav className="nav">
        <button onClick={() => onNavigate('fragments')}>Fragments</button>
        <button onClick={() => onNavigate('tags')}>Tags</button>
        <button onClick={() => onNavigate('new')}>New</button>
        <button onClick={() => onNavigate('info')}>Infos</button>

        {/* Switch toggle dark mode */}
        <label className="switch" style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={onToggleDarkMode}
          />
          <span className="slider round"></span>
        </label>
      </nav>
    </header>
  );
}
