import React from 'react';

function Education({ items, onChange }) {
  const add = () => {
    onChange([
      ...items,
      { id: Date.now(), degree: '', school: '', year: '', gpa: '' },
    ]);
  };

  const remove = (id) => onChange(items.filter((i) => i.id !== id));

  const update = (id, field, value) =>
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="section">
      <div className="section-title">Education Qualifications</div>

      {items.map((item) => (
        <div className="card-item" key={item.id}>
          <button className="remove-btn" onClick={() => remove(item.id)}>×</button>

          <div className="field">
            <label>Degree / Course</label>
            <input
              value={item.degree}
              onChange={(e) => update(item.id, 'degree', e.target.value)}
              placeholder="e.g. B.E. Computer Engineering"
            />
          </div>

          <div className="field">
            <label>School / University</label>
            <input
              value={item.school}
              onChange={(e) => update(item.id, 'school', e.target.value)}
              placeholder="e.g. Savitribai Phule Pune University"
            />
          </div>

          <div className="row2">
            <div className="field">
              <label>Year of Passing</label>
              <input
                value={item.year}
                onChange={(e) => update(item.id, 'year', e.target.value)}
                placeholder="2024"
              />
            </div>
            <div className="field">
              <label>CGPA / Percentage</label>
              <input
                value={item.gpa}
                onChange={(e) => update(item.id, 'gpa', e.target.value)}
                placeholder="8.5 / 85%"
              />
            </div>
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={add}>
        + Add Education
      </button>
    </div>
  );
}

export default Education;
