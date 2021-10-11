const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()


// SignUp
router.post('/reg', async (req, res) => {
    const user = new User(req.body)
        try {
            await user.save()
            res.status(200).send(user)
        }
        catch (e) {
            console.log(e)
            res.status(400).send(e)
        }
})

// LogIn
router.post('/reg/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password })
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/reg/me', auth, async (req, res) => {
    res.send(req.user)
})

//Update Profile
router.patch('/reg/me', auth, async (req, res) => {
    const update = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if(!isValidOperation) {
            return res.status(400).send({error})
        }
        try {
            updates.forEach((update) => req.user[update] = req.body[update])
            await req.user.save()
            res.send(req.user)
            console.log(user)
        }
        catch (e){
            console.log(e)
            res.status(400).send(e)
        }
})

// logOut
router.post('/reg/logout', auth, async(req, res) => {
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

// forget password
router.post('/reg/forget', async (req, res) => {
    const updates = Object.keys(req.body)
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
