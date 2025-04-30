// 📈 Simulate ARIMA Forecast using simple linear projection
export const simulateARIMAForecast = (dataset) => {
    const key = Object.keys(dataset[0]).find(k => k !== 'timestamp');
    const values = dataset.map(d => d[key]);
    const lastDiff = values[values.length - 1] - values[values.length - 2];
    return (values[values.length - 1] + lastDiff).toFixed(2);
};

// 🔎 ARIMA suggests a "forecasted anomaly" index safely
export const getARIMAHintIndex = (correctAnomalies) => {
    if (!correctAnomalies || correctAnomalies.length === 0) {
        return "No anomalies detected";
    }
    return correctAnomalies[Math.floor(Math.random() * correctAnomalies.length)];
};
