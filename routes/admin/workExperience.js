const express = require('express');
const router = express.Router();
const WorkExperience = require('../../models/WorkExperience');

// Render work experience admin page
router.get('/', async (req, res) => {
  const workExperience = await WorkExperience.find();
  res.render('workExperience', { workExperience });
});

// Add new work experience
router.post('/', async (req, res) => {
  const workExperience = new WorkExperience(req.body);
  await workExperience.save();
  res.redirect('/admin/work-experience');
});

module.exports = router;