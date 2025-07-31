// ActorInputForm.jsx — Part 1
import React, { useEffect, useState } from 'react';

const ActorInputForm = ({
  apiKey,
  selectedActor,
  inputValues,
  onInputChange,
  showRunButton = true,
  showOutput = false,
  showInputForm = true,
}) => {

  const [inputSchema, setInputSchema] = useState(null);
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [outputItems, setOutputItems] = useState([]);
  const [outputError, setOutputError] = useState('');

  const handleRunActor = async () => {
    if (!selectedActor || !apiKey) {
      alert('Actor and API key required');
      return;
    }

    setIsRunning(true);
    setOutputItems([]);
    setOutputError('');

    try {
      const response = await fetch(
        `https://api.apify.com/v2/acts/${selectedActor}/runs?token=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputValues),
        }
      );

      const data = await response.json();

      if (response.ok) {
        pollRunStatus(data.data.id, data.data.defaultDatasetId);
      } else {
        alert(`❌ Failed to run actor: ${data.message || 'Unknown error'}`);
        setIsRunning(false);
      }
    } catch (err) {
      console.error('Run actor error:', err);
      alert('❌ Error running actor');
      setIsRunning(false);
    }
  };

  const pollRunStatus = async (runId, datasetId) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${apiKey}`);
        const runData = await res.json();

        if (['SUCCEEDED', 'FAILED', 'ABORTED', 'TIMED-OUT'].includes(runData.data.status)) {
          clearInterval(interval);
          setIsRunning(false);

          if (runData.data.status === 'SUCCEEDED') {
            fetchOutput(datasetId);
          } else {
            setOutputError(`❌ Actor run failed with status: ${runData.data.status}`);
          }
        }
      } catch (err) {
        clearInterval(interval);
        setIsRunning(false);
        setOutputError('❌ Error while polling actor status.');
      }
    }, 3000);
  };
// ActorInputForm.jsx — Part 2
  const fetchOutput = async (datasetId) => {
    try {
      const res = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?format=json`);
      const data = await res.json();
      setOutputItems(data);
    } catch (err) {
      setOutputError('❌ Failed to fetch actor output.');
    }
  };

  useEffect(() => {
    if (!selectedActor) return;

    const fetchSchema = async () => {
      try {
        const encodedActor = encodeURIComponent(selectedActor);
        let response = await fetch(
          `http://localhost:5000/api/actor/${encodedActor}/schema?apiKey=${apiKey.trim()}`
        );

        if (!response.ok) {
          response = await fetch('http://localhost:5000/api/local-schema/mytestactor');
          if (!response.ok) throw new Error('Failed to load schema from both API and local fallback.');
        }

        const data = await response.json();
        setInputSchema(data);
        setError('');
      } catch (err) {
        setError(err.message);
        setInputSchema(null);
      }
    };

    fetchSchema();
  }, [selectedActor, apiKey]);

  if (!selectedActor) return null;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!inputSchema) return <p>Loading input schema...</p>;

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>📝 Step 3: Enter Actor Input</h2>

      {Object.entries(inputSchema.properties).map(([key, prop]) => (
        <div key={key} style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
            {prop.title || key}
          </label>
          <input
            type="text"
            placeholder={prop.prefill || ''}
            value={inputValues[key] || ''}
            onChange={(e) => onInputChange(key, e.target.value)}
            style={{
              padding: '8px',
              width: '100%',
              maxWidth: '400px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '15px',
            }}
          />
        </div>
      ))}

      <button
        onClick={handleRunActor}
        disabled={isRunning}
        style={{
          padding: '10px 20px',
          backgroundColor: isRunning ? '#888' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isRunning ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          marginTop: '10px',
        }}
      >
        {isRunning ? 'Running...' : '🚀 Run Actor'}
      </button>

      {isRunning && <p style={{ marginTop: '10px' }}>⏳ Waiting for actor to complete...</p>}
      {outputError && <p style={{ color: 'red', marginTop: '10px' }}>{outputError}</p>}

      {outputItems.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2>📦 Actor Output</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {outputItems.map((item, idx) => (
              <li
                key={idx}
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  marginBottom: '10px',
                }}
              >
                <strong>{item.level?.toUpperCase() || 'INFO'}:</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActorInputForm;
