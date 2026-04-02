import React, { useState } from 'react';

function SkillGroup({ title, skills, onAdd, onRemove }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const val = input.trim();
    if (!val) return;
    onAdd(val);
    setInput('');
  };

  return (
    <div className="section">
      <div className="section-title">{title}</div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <span className="skill-tag" key={index}>
            {skill}
            <button onClick={() => onRemove(index)}>×</button>
          </span>
        ))}
        {skills.length === 0 && (
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>
            No skills added yet
          </span>
        )}
      </div>

      <div className="skill-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Type a skill and press Enter"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

function Skills({ academic, onAcademicChange, nonAcademic, onNonAcademicChange }) {
  const addSkill = (list, setter) => (val) => setter([...list, val]);
  const removeSkill = (list, setter) => (i) =>
    setter(list.filter((_, idx) => idx !== i));

  return (
    <>
      <SkillGroup
        title="Academic Skills"
        skills={academic}
        onAdd={addSkill(academic, onAcademicChange)}
        onRemove={removeSkill(academic, onAcademicChange)}
      />
      <SkillGroup
        title="Non-Academic Skills"
        skills={nonAcademic}
        onAdd={addSkill(nonAcademic, onNonAcademicChange)}
        onRemove={removeSkill(nonAcademic, onNonAcademicChange)}
      />
    </>
  );
}

export default Skills;
