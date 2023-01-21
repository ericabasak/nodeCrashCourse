const express = require('express');
const router = express.Router();


// this route gets all members
app.get('/api/members', (req, res) => res.json(members));

// get single member
app.get('/api/members/:id', (req, res) =>{
    // lets us know if a member is found with that same id
    // high order array method
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        // res.send(req.params.id)
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ message: `No member with the id of ${req.params.id} found`});
    }
    
})