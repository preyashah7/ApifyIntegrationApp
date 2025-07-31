const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ List Apify Actors
app.get('/api/actors', async (req, res) => {
  const apiKey = req.query.apiKey;
  if (!apiKey) {
    return res.status(400).json({ error: 'API Key is required' });
  }

  try {
    const response = await fetch('https://api.apify.com/v2/acts?my=1', {
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch actors', details: data });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// ✅ Fetch Input Schema
app.get('/api/actor/:actorId/schema', async (req, res) => {
  const actorId = req.params.actorId;
  const apiKey = req.query.apiKey;

  if (!actorId || !apiKey) {
    return res.status(400).json({ error: "Missing actorId or apiKey" });
  }

  try {
    const schemaRes = await fetch(`https://api.apify.com/v2/acts/${actorId}/input-schema`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    if (!schemaRes.ok) {
      const errorText = await schemaRes.text();
      return res.status(schemaRes.status).json({
        error: "Failed to fetch schema",
        details: errorText
      });
    }

    const schema = await schemaRes.json();
    res.json(schema);
  } catch (error) {
    console.error("Schema fetch failed:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

app.get('/api/local-schema/:actor', (req, res) => {
  const actorName = req.params.actor;
  const filePath = path.join(__dirname, 'schemas', `${actorName}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Local schema not found' });
  }

  const schema = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(schema);
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
