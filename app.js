const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Project = require('./models/Project'); // Import Project model
const WorkExperience = require('./models/WorkExperience'); // Import WorkExperience model
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize Express app
const app = express();

// Set up Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(cors());

// Routes
app.use('/api/projects', require('./routes/api/projects'));
app.use('/api/work-experience', require('./routes/api/workExperience'));
app.use('/admin/projects', require('./routes/admin/projects'));
app.use('/admin/work-experience', require('./routes/admin/workExperience'));

// Home route
app.get('/', async (req, res) => {
  try {
    // Fetch projects and work experience from MongoDB
    const projects = await Project.find();
    const workExperience = await WorkExperience.find();

    // Render the home.pug template and pass the data
    res.render('home', { projects, workExperience });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));