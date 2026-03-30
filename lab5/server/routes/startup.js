const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const authMiddleware = require('../middleware/auth');

const db = admin.firestore();

// Отримати інформацію про стартап
router.get('/company', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;
    const companyRef = db.collection('companies').doc(userId);
    const companyDoc = await companyRef.get();

    if (companyDoc.exists) {
      return res.json({
        success: true,
        data: companyDoc.data(),
      });
    }

    return res.json({
      success: true,
      data: {
        name: '',
        description: '',
        industry: '',
        revenue: 0,
        employees: 1,
        marketShare: 0,
        satisfaction: 75,
        createdAt: null,
        updatedAt: null,
      },
    });
  } catch (error) {
    console.error('Помилка отримання даних компанії:', error);
    return res.status(500).json({
      success: false,
      error: 'Не вдалося отримати дані компанії',
    });
  }
});

// Зберегти інформацію про стартап
router.post('/company', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;
    const {
      name = '',
      description = '',
      industry = '',
      revenue = 0,
      employees = 1,
      marketShare = 0,
      satisfaction = 75,
    } = req.body;

    // Валідація назви компанії
    if (!name || name.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Назва компанії повинна містити щонайменше 5 символів',
      });
    }

    const companyRef = db.collection('companies').doc(userId);
    const existingDoc = await companyRef.get();

    const dataToSave = {
      userId,
      name: name.trim(),
      description: String(description).trim(),
      industry: String(industry).trim(),
      revenue: Number(revenue) || 0,
      employees: Number(employees) || 1,
      marketShare: Number(marketShare) || 0,
      satisfaction: Number(satisfaction) || 75,
      updatedAt: new Date().toISOString(),
      createdAt: existingDoc.exists
        ? existingDoc.data().createdAt || new Date().toISOString()
        : new Date().toISOString(),
    };

    await companyRef.set(dataToSave, { merge: true });

    return res.json({
      success: true,
      message: 'Інформацію про компанію успішно збережено',
      data: dataToSave,
    });
  } catch (error) {
    console.error('Помилка збереження даних компанії:', error);
    return res.status(500).json({
      success: false,
      error: 'Не вдалося зберегти дані компанії',
    });
  }
});

module.exports = router;