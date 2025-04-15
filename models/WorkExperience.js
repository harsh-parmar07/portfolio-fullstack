const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('WorkExperience', workExperienceSchema);