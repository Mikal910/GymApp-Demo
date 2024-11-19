const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Load workout data from `workout.js`
const { workoutinfo } = require('./workout');

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files (e.g., main.js, styles.css)
app.use(express.static(path.join(__dirname)));

// Route to render the main EJS page with workout data
app.get('/', (req, res) => {
    res.render('index.ejs', { workouts: workoutinfo }); // Pass workoutinfo data to the EJS template
});

// Start the server
app.listen(PORT, () => {
    console.log(`The server is getting JACKED on http://localhost:${PORT}`);
});
