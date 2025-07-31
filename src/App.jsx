import React, { useState } from 'react';
import ApiKeyInput from './components/ApiKeyInput';
import ActorSelector from './components/ActorSelector';
import ActorInputForm from './components/ActorInputForm';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [selectedActor, setSelectedActor] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [step, setStep] = useState(1);

  const handleInputChange = (key, value) => {
    setInputValues((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Apify Integration App</h1>
      <div style={styles.stepper}>
        {['API Key', 'Select Actor', 'Run Actor'].map((label, idx) => (
          <div
            key={idx}
            style={{
              ...styles.step,
              backgroundColor: step === idx + 1 ? '#007bff' : '#ddd',
              color: step === idx + 1 ? '#fff' : '#000'
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={styles.card}>
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          <button onClick={nextStep} disabled={!apiKey} style={styles.button}>
            Next
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div style={styles.card}>
          <ActorSelector
            apiKey={apiKey}
            selectedActor={selectedActor}
            setSelectedActor={setSelectedActor}
          />
          <div style={styles.navButtons}>
            <button onClick={prevStep} style={styles.button}>Back</button>
            <button onClick={nextStep} disabled={!selectedActor} style={styles.button}>Next</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div style={styles.card}>
          <ActorInputForm
            apiKey={apiKey}
            selectedActor={selectedActor}
            inputValues={inputValues}
            onInputChange={handleInputChange}
            showRunButton={true}
            showOutput={true}
          />
          <button onClick={prevStep} style={styles.button}>Back</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '30px', fontFamily: 'sans-serif' },
  title: { textAlign: 'center' },
  stepper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px'
  },
  step: {
    flex: 1,
    textAlign: 'center',
    padding: '10px',
    margin: '0 5px',
    borderRadius: '6px',
    fontWeight: 'bold'
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '0 auto'
  },
  navButtons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default App;
