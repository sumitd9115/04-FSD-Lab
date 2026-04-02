import React from 'react';

function Objective({ value, onChange }) {
  return (
    <div className="section">
      <div className="section-title">Career Objective</div>
      <div className="field">
        <label>Professional Summary</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a brief 2–3 sentence career objective or professional summary that highlights your goals and key strengths..."
          style={{ minHeight: '120px' }}
        />
      </div>
    </div>
  );
}

export default Objective;
