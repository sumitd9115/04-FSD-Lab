import React, { useState } from 'react';
import './App.css';
import PersonalInfo from './components/PersonalInfo.jsx';
import Objective from './components/Objective.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Achievements from './components/Achievements.jsx';
import ResumePreview from './components/ResumePreview.jsx';

const TABS = [
  { id: 'personal', label: 'Personal' },
  { id: 'objective', label: 'Objective' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
];

function App() {
  const [activeTab, setActiveTab] = useState('personal');

  const [personal, setPersonal] = useState({
    name: '', title: '', email: '', phone: '', location: '', link: '',
  });
  const [objective, setObjective] = useState('');
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [academicSkills, setAcademicSkills] = useState([]);
  const [nonAcademicSkills, setNonAcademicSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const resumeData = {
    personal, objective, education, experience,
    academicSkills, nonAcademicSkills, achievements,
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="dot" />
          <h1>Resume Builder</h1>
        </div>

        <div className="tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'personal' && (
            <PersonalInfo data={personal} onChange={setPersonal} />
          )}
          {activeTab === 'objective' && (
            <Objective value={objective} onChange={setObjective} />
          )}
          {activeTab === 'education' && (
            <Education items={education} onChange={setEducation} />
          )}
          {activeTab === 'experience' && (
            <Experience items={experience} onChange={setExperience} />
          )}
          {activeTab === 'skills' && (
            <Skills
              academic={academicSkills} onAcademicChange={setAcademicSkills}
              nonAcademic={nonAcademicSkills} onNonAcademicChange={setNonAcademicSkills}
            />
          )}
          {activeTab === 'achievements' && (
            <Achievements items={achievements} onChange={setAchievements} />
          )}
        </div>
      </div>

      <div className="preview-panel">
        <ResumePreview data={resumeData} />
      </div>
    </div>
  );
}

export default App;
