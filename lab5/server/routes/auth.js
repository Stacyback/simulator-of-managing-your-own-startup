const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const JWT_SECRET = process.env.JWT_SECRET;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const db = admin.firestore();

// Реєстрація
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email та пароль обов'язкові",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Пароль повинен містити не менше 6 символів",
      });
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name || '',
    });

    console.log('✅ Firebase Auth user created:', userRecord.uid);

    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      name: name || '',
      createdAt: new Date().toISOString(),
    });

    console.log('✅ Firestore user document created:', userRecord.uid);

    const token = jwt.sign(
      {
        uid: userRecord.uid,
        email: userRecord.email,
        name: name || '',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: name || '',
      },
    });
  } catch (error) {
    console.error('❌ Помилка реєстрації:', error);
    return res.status(400).json({
      success: false,
      error: error.message || 'Помилка реєстрації',
    });
  }
});

// Вхід
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email та пароль обов'язкові",
      });
    }

    const firebaseResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const firebaseData = await firebaseResponse.json();

    if (!firebaseResponse.ok) {
      return res.status(401).json({
        success: false,
        error: 'Невірний email або пароль',
      });
    }

    const userRecord = await admin.auth().getUser(firebaseData.localId);
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    const userData = userDoc.exists ? userDoc.data() : {};

    const token = jwt.sign(
      {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userData.name || userRecord.displayName || '',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userData.name || userRecord.displayName || '',
      },
    });
  } catch (error) {
    console.error('❌ Помилка входу:', error);
    return res.status(500).json({
      success: false,
      error: 'Помилка входу в систему',
    });
  }
});

// Профіль
router.get('/profile', require('../middleware/auth'), async (req, res) => {
  try {
    const userId = req.user.uid;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Користувача не знайдено',
      });
    }

    return res.json({
      success: true,
      user: userDoc.data(),
    });
  } catch (error) {
    console.error('❌ Помилка отримання профілю:', error);
    return res.status(500).json({
      success: false,
      error: 'Не вдалося отримати профіль',
    });
  }
});

module.exports = router;