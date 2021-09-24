const express = require('express')
const User = require('../models/user')

const router = new express.Router()

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

router.post('/reg/login', async (req, res) => {
    try {
        const user = await user.findOne({email: req.body.email, password: req.body.password})
        res.send({ user })
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/reg/me', async (req, res) => {
    res.send(req.user)
})