const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const path = require('path');

// Завантаження змінних середовища
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is missing in .env or Render Environment Variables');
  process.exit(1);
}

if (!process.env.FIREBASE_API_KEY) {
  console.error('❌ FIREBASE_API_KEY is missing in .env or Render Environment Variables');
  process.exit(1);
}

// Ініціалізація Firebase Admin
let db;
try {
  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const decoded = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      'base64'
    ).toString('utf8');

    serviceAccount = JSON.parse(decoded);
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

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
  ],
  credentials: true,
}));

app.use(express.json());

// Якщо захочеш віддавати React build через Express, можна буде розкоментувати пізніше
// const clientBuildPath = path.join(__dirname, '../build');
// app.use(express.static(clientBuildPath));

// Роути
const authRoutes = require('./routes/auth');
const startupRoutes = require('./routes/startup');

// Використання роутів
app.use('/api/auth', authRoutes);
app.use('/api/startup', startupRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Якщо захочеш віддавати фронтенд через Express, можна буде розкоментувати
// app.get('*', (req, res, next) => {
//   if (req.path.startsWith('/api')) return next();
//   res.sendFile(path.join(clientBuildPath, 'index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});