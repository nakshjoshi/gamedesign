import React, { useState } from 'react';
import { simulateARIMAForecast, getARIMAHintIndex } from '../utils/forecasting';

const ToolsPanel = ({ dataset, onMark, reduceScore, correctAnomalies }) => {
  const [indexInput, setIndexInput] = useState('');

  return (
    <div>
      <h3>🛠️ Detective Tools</h3>

      <button onClick={() => {
        const forecast = simulateARIMAForecast(dataset);
        const hintIndex = getARIMAHintIndex(correctAnomalies);
        alert(`📈 Forecasted next value: ${forecast}\n🔎 ARIMA Hint: Consider checking near index ${hintIndex}`);
      }}>Forecast Predictor (ARIMA)</button>

      <button onClick={() => {
        const hintIndex = correctAnomalies[Math.floor(Math.random() * correctAnomalies.length)];
        alert(`🧠 LSTM Hint: Check near index ${hintIndex}\n⚠️ Used Hint! -3 Points`);
        reduceScore(3);
      }}>LSTM Pattern Hint</button>

      <div style={{ marginTop: '10px' }}>
        <input 
          type="number"
          placeholder="Enter index"
          value={indexInput}
          onChange={(e) => setIndexInput(e.target.value)}
        />
        <button onClick={() => {
          if(indexInput === '') {
            alert("⚠️ Please enter an index before marking!");
            return;
          }
          onMark(parseInt(indexInput));
          setIndexInput('');
        }}>📍 Mark Anomaly</button>
      </div>
    </div>
  );
};

export default ToolsPanel;
