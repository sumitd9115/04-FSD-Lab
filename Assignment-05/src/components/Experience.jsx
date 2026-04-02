import React from 'react';

function Experience({ items, onChange }) {
  const add = () => {
    onChange([
      ...items,
      { id: Date.now(), role: '', org: '', start: '', end: '', desc: '' },
    ]);
  };

  const remove = (id) => onChange(items.filter((i) => i.id !== id));

  const update = (id, field, value) =>
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="section">
      <div className="section-title">Experience &amp; Internships</div>

      {items.map((item) => (
        <div className="card-item" key={item.id}>
          <button className="remove-btn" onClick={() => remove(item.id)}>×</button>

          <div className="field">
            <label>Role / Position</label>
            <input
              value={item.role}
              onChange={(e) => update(item.id, 'role', e.target.value)}
              placeholder="e.g. Frontend Intern"
            />
          </div>

          <div className="field">
            <label>Company / Organisation</label>
            <input
              value={item.org}
              onChange={(e) => update(item.id, 'org', e.target.value)}
              placeholder="e.g. Tech Corp Pvt. Ltd."
            />
          </div>

          <div className="row2">
            <div className="field">
              <label>Start Date</label>
              <input
                value={item.start}
                onChange={(e) => update(item.id, 'start', e.target.value)}
                placeholder="Jun 2023"
              />
            </div>
            <div className="field">
              <label>End Date</label>
              <input
                value={item.end}
                onChange={(e) => update(item.id, 'end', e.target.value)}
                placeholder="Aug 2023"
              />
            </div>
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              value={item.desc}
              onChange={(e) => update(item.id, 'desc', e.target.value)}
              placeholder="Briefly describe your role, responsibilities, and impact..."
            />
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={add}>
        + Add Experience / Internship
      </button>
    </div>
  );
}

export default Experience;
