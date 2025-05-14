import React, { useState, useEffect } from 'react';

export default function FragmentForm({ fragment }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (fragment) {
      setTitle(fragment.title);
      setCode(fragment.code);
    }
  }, [fragment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Saved: ${title}\n${code}`);
  };

  return (
    <div className="form-container">
      <h2>{fragment ? 'Edit Fragment' : 'New Fragment'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <label>Code</label>
        <textarea value={code} onChange={e => setCode(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
