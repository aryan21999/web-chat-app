const http = require('http')
const express = require('express')
const Friend = require('../models/friend')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create New Friends
router.post('/friends', auth, async (req, res) => {
    const friend = new Friend ({
        name: req.body.name,
        email: req.body.email,
        owner: req.user.email
    })
    try {
        await friend.save()
        res.status(201).send(friend)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Read All Friends
router.get('/friends', auth, async (req, res) => {
    try {
        const friend = await Friend.find({ owner: req.user.email })
        res.send(friend)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Find Friend By ID
router.get('/friends/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const friend = await Friend.findOne({ _id, owner: req.user.email })

        if (!friend) {
            return res.status(404).send()
        }
        res.send(friend)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router