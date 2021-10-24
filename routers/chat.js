const http = require('http')
const express = require('express')
const Chat = require('../models/chat')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create Chats
router.post('/chats', auth, async(req, res) => {
    const chat = new Chat({
        sender: req.user.email,
        receiver: req.body.friend,
        message: req.body.message
    })
    try {
        await chat.save()
        res.status(201).send(chat)
    } catch (e) {
        res.status(400).send(e)
    }
})

// List All Chats
router.get('/chats', auth, async(req, res) => {
    try {
        const chat = await Chat.find()
        res.send(chat)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router