import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import ToolsPanel from './ToolsPanel';

const DataVisualizer = ({ caseData, goBack }) => {
  const [markedPoints, setMarkedPoints] = useState([]);
  const [score, setScore] = useState(100);
  const [correctAnomalies, setCorrectAnomalies] = useState([]);

  const dataKeys = Object.keys(caseData.dataset[0]).filter(k => k !== 'timestamp');
  const selectedMetric = dataKeys[0];

  const labels = caseData.dataset.map(d => d.timestamp);
  const dataValues = caseData.dataset.map(d => d[selectedMetric]);

  const data = {
    labels,
    datasets: [{
      label: selectedMetric,
      data: dataValues,
      borderColor: 'cyan',
      pointBackgroundColor: (ctx) => {
        const index = ctx.dataIndex;
        return markedPoints.includes(index) ? 'red' : 'blue';
      },
      tension: 0.4
    }]
  };

  // 🎨 Plugin to show index numbers on points
  const indexLabelPlugin = {
    id: 'indexLabelPlugin',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      chart.getDatasetMeta(0).data.forEach((point, index) => {
        ctx.save();
        ctx.font = '10px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(index, point.x - 5, point.y - 10);
        ctx.restore();
      });
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Analyzing: ${selectedMetric}` },
      indexLabelPlugin: true
    },
    scales: {
      x: { display: false }
    }
  };

  // 🔍 Detect anomalies based on sudden jump (20% of max)
  const detectAnomalies = (dataset) => {
    const key = Object.keys(dataset[0]).find(k => k !== 'timestamp');
    const values = dataset.map(d => d[key]);
    const threshold = 0.2 * Math.max(...values);
    let anomalies = [];

    for (let i = 1; i < values.length; i++) {
      const diff = Math.abs(values[i] - values[i - 1]);
      if (diff > threshold) {
        anomalies.push(i);
      }
    }
    return anomalies;
  };

  useEffect(() => {
    setCorrectAnomalies(detectAnomalies(caseData.dataset));
  }, [caseData]);

  const handleMarkAnomaly = (index) => {
    if (!markedPoints.includes(index)) {
      setMarkedPoints([...markedPoints, index]);
      if (correctAnomalies.includes(index)) {
        setScore(score + 10);
        alert("✅ Correct Anomaly! +10 Points");
      } else {
        setScore(score - 5);
        alert("❌ False Alarm! -5 Points");
      }
    }
  };

  const reduceScore = (points) => {
    setScore(prev => prev - points);
  };

  return (
    <div>
      <h2>{caseData.title}</h2>
      <h3>Score: {score} 🏆</h3>
      <Line data={data} options={options} plugins={[indexLabelPlugin]} />
      <ToolsPanel
        dataset={caseData.dataset}
        onMark={handleMarkAnomaly}
        reduceScore={reduceScore}
        correctAnomalies={correctAnomalies}
      />
      <button onClick={goBack} style={{ marginTop: '20px' }}>🔙 Back to Cases</button>
    </div>
  );
};

export default DataVisualizer;
