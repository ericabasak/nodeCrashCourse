// create simple express server
const express = require('express')
const path = require('path');
const members = require('./members');
const member = require('./members')
const logger = require('./middleware/logger')

const app = express();

// init middleware
// app.use(logger);

// this route gets all members
app.get('/api/members', (req, res) => res.json(members));

// get single member
app.get('/api/members/:id', (req, res) =>{
    // lets us know if a member is found with that same id
    const found = members.some(member => member.id === parseInt(req.params.id))
    // res.send(req.params.id)
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
})

// // create a route below
// app.get("/", (req, res) => {
//     // res.send('<h1>Hello world!!</h1>')
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// set static folder
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server starting on port: ${PORT}`);
});

// the above lines of code will start the server!!