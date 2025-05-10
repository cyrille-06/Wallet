import React from 'react';

export default function Header({ onNavigate }) {
  return (
    <header className="header">
      <h1 className="logo" onClick={() => onNavigate('fragments')}>
        Code Wallet
      </h1>
      <nav className="nav">
        <button onClick={() => onNavigate('fragments')}>Fragments</button>
        <button onClick={() => onNavigate('tags')}>Tags</button>
        <button onClick={() => onNavigate('new')}>New</button>
        <button onClick={() => onNavigate('info')}>Info</button>
      </nav>
    </header>
  );
}
