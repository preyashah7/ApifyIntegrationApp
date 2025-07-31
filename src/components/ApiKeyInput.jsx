import React from 'react';

const ApiKeyInput = ({ apiKey, setApiKey }) => {
  return (
    <div>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
        🔐 Step 1: Enter Your Apify API Key
      </label>
      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your Apify API Key"
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '6px',
        }}
      />
    </div>
  );
};

export default ApiKeyInput;
