import React from 'react';

function PersonalInfo({ data, onChange }) {
  const handle = (field) => (e) =>
    onChange({ ...data, [field]: e.target.value });

  return (
    <div className="section">
      <div className="section-title">Personal Information</div>

      <div className="field">
        <label>Full Name</label>
        <input
          value={data.name}
          onChange={handle('name')}
          placeholder="e.g. Aditya Sharma"
        />
      </div>

      <div className="field">
        <label>Professional Title</label>
        <input
          value={data.title}
          onChange={handle('title')}
          placeholder="e.g. Full Stack Developer"
        />
      </div>

      <div className="row2">
        <div className="field">
          <label>Email</label>
          <input
            value={data.email}
            onChange={handle('email')}
            placeholder="you@email.com"
            type="email"
          />
        </div>
        <div className="field">
          <label>Phone</label>
          <input
            value={data.phone}
            onChange={handle('phone')}
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label>Location</label>
          <input
            value={data.location}
            onChange={handle('location')}
            placeholder="Pune, Maharashtra"
          />
        </div>
        <div className="field">
          <label>LinkedIn / Portfolio</label>
          <input
            value={data.link}
            onChange={handle('link')}
            placeholder="linkedin.com/in/you"
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
