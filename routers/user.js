const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()


// SignUp
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// LogIn User
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password })
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

// Read LogIn User
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

// Update User Profile
router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// LogOut User
router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send("Logged Out")
    } catch (e) {
        res.status(500).send()
    }
})

// Forgot Password
router.patch('/users/forgot', async(req, res) => {
    const updates = Object.keys(req.body)
        // console.log(req.body)
    const allowedUpdates = ['password']
    try {
        await User.updateOne({ email: req.body.email }, { password: req.body.password })
        const user = await User.findOne({ email: req.body.email })
        res.status(200).send(user)
        if (!user)
            return res.status(400).send("User With Given Email Doesn't Exist!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router