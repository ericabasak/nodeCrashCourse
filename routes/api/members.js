const express = require('express');
const router = express.Router();
const member = require('../../members');
const uuid = require('uuid');
const members = require('../../members');
const { update } = require('tar');

// this route gets all members
router.get('/', (req, res) => res.json(members));

// get single member
router.get('/:id', (req, res) =>{
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

// create member
router.post('/', (req, res) => {
    // res.send(req.bo{dy)
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active",
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ message: "please fill out name and emails" });
    }

    // use save when saving to a database
    members.save(newMember)
    // below is for hard coded data
    members.push(newMember);
    res.json(members);
})

// update member
router.put('/:id', (req, res) =>{
    // lets us know if a member is found with that same id
    // high order array method
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.body.id)) {
                member.name === updateMember.name ? updateMember.name : member.name;
                member.email === updateMember.email ? updateMember.email : member.email;

                res.json({ message: "member updated", member });
            }
        })
    } else {
        res.status(400).json({ message: `No member with the id of ${req.params.id} found`});
    }
})

// delete member
router.delete('/:id', (req, res) =>{
    // lets us know if a member is found with that same id
    // high order array method
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        // res.send(req.params.id)
        res.json({ 
            message: "member deleted", 
            members: members.filter(member => member.id === parseInt(req.params.id))})
    } else {
        res.status(400).json({ message: `No member with the id of ${req.params.id} found`});
    }
})

module.exports = router;