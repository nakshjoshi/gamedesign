import React from 'react';

const CaseSelector = ({ cases, onSelect }) => {
  return (
    <div>
      <h2>Select a Case File 🗂️</h2>
      {cases.map(c => (
        <div key={c.case_id} onClick={() => onSelect(c)} style={{border: '1px solid #ccc', margin: '10px', padding: '10px', cursor: 'pointer'}}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CaseSelector;
