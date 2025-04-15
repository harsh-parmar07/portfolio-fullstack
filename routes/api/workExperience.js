const express = require('express');
const router = express.Router();
const WorkExperience = require('../../models/WorkExperience');

// Get all work experience
router.get('/', async (req, res) => {
  try {
    const workExperience = await WorkExperience.find();
    res.json(workExperience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;