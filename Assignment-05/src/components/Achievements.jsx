import React from 'react';

function Achievements({ items, onChange }) {
  const add = () =>
    onChange([...items, { id: Date.now(), text: '' }]);

  const remove = (id) => onChange(items.filter((i) => i.id !== id));

  const update = (id, value) =>
    onChange(items.map((i) => (i.id === id ? { ...i, text: value } : i)));

  return (
    <div className="section">
      <div className="section-title">Skills &amp; Achievements</div>

      {items.map((item) => (
        <div className="card-item" key={item.id}>
          <button className="remove-btn" onClick={() => remove(item.id)}>×</button>
          <div className="field">
            <label>Achievement</label>
            <input
              value={item.text}
              onChange={(e) => update(item.id, e.target.value)}
              placeholder="e.g. 1st place in college hackathon 2023"
            />
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={add}>
        + Add Achievement
      </button>
    </div>
  );
}

export default Achievements;
