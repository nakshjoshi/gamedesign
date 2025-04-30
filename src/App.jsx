import React, { useState } from 'react';
import CaseSelector from './components/CaseSelector';
import DataVisualizer from './components/DataVisualizer';
import casesData from './data/cases.json';

function App() {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="app">
      {!selectedCase ? (
        <CaseSelector cases={casesData} onSelect={setSelectedCase} />
      ) : (
        <DataVisualizer caseData={selectedCase} goBack={() => setSelectedCase(null)} />
      )}
    </div>
  );
}

export default App;
