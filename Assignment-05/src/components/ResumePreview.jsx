import React, { useRef } from 'react';

function ResumePreview({ data }) {
  const {
    personal, objective, education, experience,
    academicSkills, nonAcademicSkills, achievements,
  } = data;

  const resumeRef = useRef();
  const allSkills = [...academicSkills, ...nonAcademicSkills];
  const hasData = personal.name || personal.email || education.length > 0;

  const handleDownload = () => {
    const resumeHTML = resumeRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${personal.name ? personal.name + ' - Resume' : 'Resume'}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #222; background: #fff; }
            .resume-paper { padding: 2.5rem 2.75rem; max-width: 900px; margin: 0 auto; }
            .resume-name { font-size: 28px; font-weight: 700; color: #111; letter-spacing: -0.5px; margin-bottom: 3px; }
            .resume-title-text { font-size: 14px; color: #6b7280; margin-bottom: 12px; }
            .resume-contact { display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #555; border-bottom: 2px solid #1D9E75; padding-bottom: 12px; margin-bottom: 4px; }
            .contact-item { display: flex; align-items: center; gap: 5px; }
            .resume-section-heading { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em; color: #1D9E75; margin-top: 20px; margin-bottom: 10px; }
            .objective-text { font-size: 13px; color: #374151; line-height: 1.7; }
            .exp-item, .edu-item { margin-bottom: 14px; }
            .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
            .exp-role { font-size: 13.5px; font-weight: 600; color: #111; }
            .exp-dates { font-size: 11.5px; color: #9ca3af; }
            .exp-org { font-size: 12.5px; color: #1D9E75; font-weight: 600; margin-bottom: 4px; }
            .exp-desc { font-size: 12.5px; color: #4b5563; line-height: 1.65; }
            .skill-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
            .skill-pill { background: #ecfdf5; color: #065f46; font-size: 11.5px; padding: 4px 11px; border-radius: 20px; border: 1px solid #a7f3d0; }
            .ach-item { font-size: 12.5px; color: #374151; line-height: 1.65; padding-left: 14px; position: relative; margin-bottom: 5px; }
            .ach-item::before { content: '▸'; position: absolute; left: 0; color: #1D9E75; font-size: 11px; top: 1px; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              @page { margin: 0.5in; }
            }
          </style>
        </head>
        <body>
          <div class="resume-paper">${resumeHTML}</div>
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () { window.close(); };
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!hasData) {
    return (
      <div className="resume-paper">
        <div className="empty-state">
          <div style={{ fontSize: '32px' }}>📄</div>
          <p>Fill in the form on the left</p>
          <p>to see your resume preview here</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="download-bar">
        <span className="preview-label">Live Preview</span>
        <button className="download-btn" onClick={handleDownload}>
          ⬇ Download PDF
        </button>
      </div>

      <div className="resume-paper" ref={resumeRef}>
        <div className="resume-name">{personal.name || 'Your Name'}</div>
        {personal.title && (
          <div className="resume-title-text">{personal.title}</div>
        )}

        <div className="resume-contact">
          {personal.email && <span className="contact-item">✉ {personal.email}</span>}
          {personal.phone && <span className="contact-item">☎ {personal.phone}</span>}
          {personal.location && <span className="contact-item">📍 {personal.location}</span>}
          {personal.link && <span className="contact-item">🔗 {personal.link}</span>}
        </div>

        {objective && (
          <>
            <div className="resume-section-heading">Career Objective</div>
            <p className="objective-text">{objective}</p>
          </>
        )}

        {allSkills.length > 0 && (
          <>
            <div className="resume-section-heading">Skills</div>
            <div className="skill-pills">
              {allSkills.map((skill, i) => (
                <span className="skill-pill" key={i}>{skill}</span>
              ))}
            </div>
          </>
        )}

        {education.filter(e => e.degree || e.school).length > 0 && (
          <>
            <div className="resume-section-heading">Education</div>
            {education.map((edu) =>
              (edu.degree || edu.school) && (
                <div className="edu-item" key={edu.id}>
                  <div className="exp-header">
                    <span className="exp-role">{edu.degree || 'Degree'}</span>
                    <span className="exp-dates">{edu.year}</span>
                  </div>
                  <div className="exp-org">{edu.school}</div>
                  {edu.gpa && <div className="exp-desc">CGPA / Percentage: {edu.gpa}</div>}
                </div>
              )
            )}
          </>
        )}

        {experience.filter(e => e.role || e.org).length > 0 && (
          <>
            <div className="resume-section-heading">Experience &amp; Internships</div>
            {experience.map((exp) =>
              (exp.role || exp.org) && (
                <div className="exp-item" key={exp.id}>
                  <div className="exp-header">
                    <span className="exp-role">{exp.role || 'Role'}</span>
                    <span className="exp-dates">
                      {[exp.start, exp.end].filter(Boolean).join(' – ')}
                    </span>
                  </div>
                  <div className="exp-org">{exp.org}</div>
                  {exp.desc && <div className="exp-desc">{exp.desc}</div>}
                </div>
              )
            )}
          </>
        )}

        {achievements.filter(a => a.text).length > 0 && (
          <>
            <div className="resume-section-heading">Achievements</div>
            {achievements.map((ach) =>
              ach.text && <div className="ach-item" key={ach.id}>{ach.text}</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ResumePreview;
