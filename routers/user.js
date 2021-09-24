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

router.patch('/reg/me', async (req, res) => {
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


router.post('/reg/forget', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['password']
        try {
            const user = User.findOneAndUpdate({email: req.body.email}, {password: req.body.password}, {new: true})
            .then((newUser) => {
                console.log(newUser)
                res.status(200).send(newUser)
            })
            .catch((error) => {
                return res.status(400).send("User With Given Email Doesn't Exist!" + error)
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

