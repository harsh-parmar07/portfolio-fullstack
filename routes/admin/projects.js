const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');

// Render projects admin page
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.render('projects', { projects });
});

// Add a new project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.redirect('/admin/projects');
});

module.exports = router;