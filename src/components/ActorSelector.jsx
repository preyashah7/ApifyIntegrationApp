import React, { useEffect, useState } from 'react';

const ActorSelector = ({ apiKey, selectedActor, setSelectedActor }) => {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiKey) return;

    const fetchActors = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/actors?apiKey=${apiKey.trim()}`);
        if (!response.ok) throw new Error('Invalid API Key or failed to fetch actors.');
        const data = await response.json();
        setActors(data.data.items);
        setError('');
      } catch (err) {
        setError(err.message);
        setActors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, [apiKey]);

  if (!apiKey) return null;

  return (
    <div style={{ marginTop: '30px' }}>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
        🎬 Step 2: Select an Actor
      </label>

      {loading ? (
        <p>Loading actors...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : actors.length > 0 ? (
        <select
          style={{
            padding: '10px',
            width: '100%',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
          }}
          value={selectedActor}
          onChange={(e) => setSelectedActor(e.target.value)}
        >
          <option value="">-- Select an actor --</option>
          {actors.map((actor) => (
            <option key={actor.id} value={`${actor.username}~${actor.name}`}>
              {actor.name}
            </option>
          ))}
        </select>
      ) : (
        <p>No actors found.</p>
      )}
    </div>
  );
};

export default ActorSelector;
