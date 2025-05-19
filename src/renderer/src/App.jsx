import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Fragments from './components/pages/Fragments';
import Tags from './components/pages/Tags';
import Info from './components/pages/Info';
import FragmentForm from './components/pages/FragmentsForm';

function App() {
  const [fragments, setFragments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  const handleAddFragment = (fragment) => {
    if (editingIndex !== null) {
      // Edition
      const updated = [...fragments];
      updated[editingIndex] = fragment;
      setFragments(updated);
      setEditingIndex(null);
    } else {
      // Nouveau fragment
      setFragments((prev) => [...prev, fragment]);
    }

    navigate('/fragments');
  };

  const handleDelete = (index) => {
    const updated = [...fragments];
    updated.splice(index, 1);
    setFragments(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    navigate('/new');
  };

  return (
    <div>
      <Header onNavigate={handleNavigation} />

      <Routes>
        <Route
          path="/fragments"
          element={
            <Fragments
              fragments={fragments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        />
        <Route path="/tags" element={<Tags />} />
        <Route
          path="/new"
          element={
            <FragmentForm
              onSubmit={handleAddFragment}
              initialData={editingIndex !== null ? fragments[editingIndex] : {}}
            />
          }
        />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
