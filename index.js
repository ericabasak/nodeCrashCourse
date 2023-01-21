// create simple express server
const express = require('express')
const path = require('path');
const members = require('./members');
const logger = require('./middleware/logger')

const app = express();

// init middleware
// app.use(logger);

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// set static folder
app.use(express.static(path.join(__dirname, "public")))

// memnbers api routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server starting on port: ${PORT}`);
});

