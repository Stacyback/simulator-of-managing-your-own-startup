const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is missing in .env or Render Environment Variables');
  process.exit(1);
}

if (!process.env.FIREBASE_API_KEY) {
  console.error('❌ FIREBASE_API_KEY is missing in .env or Render Environment Variables');
  process.exit(1);
}

let db;
try {
  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } else {
    serviceAccount = require('./serviceAccountKey.json');
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin initialized');
  }

  db = admin.firestore();
} catch (error) {
  console.error('❌ Firebase Admin initialization failed:', error.message);
  process.exit(1);
}

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://launch-os-lab5.netlify.app'
  ],
  credentials: true,
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
const startupRoutes = require('./routes/startup');

app.use('/api/auth', authRoutes);
app.use('/api/startup', startupRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});