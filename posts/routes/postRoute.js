const express = require('express')
const {randomBytes} = require('crypto')
const axios = require('axios')

const postRouter = express.Router()
const posts = require('../testdata/posts.json')

postRouter.get('/posts',(req,res)=>{
    res.send(posts)
})

postRouter.post('/posts',async (req,res)=>{
    const id = randomBytes(4).toString('hex')
    const title = req.body.title
    const newPost = {
        id,
        title
    }

    posts.push(newPost)

    console.log(posts)

    const event = {
        type : "Post Created",
        data : newPost
    }

    // creating new event for event-bus
    await axios.post('http://event-bus-srv:4005/events',event).catch(err=>{
        console.log(err.message)
    })

    res.status(201).send(newPost)
})

postRouter.post('/events',(req,res)=>{

    const type = req.body.type

    console.log('Received event ',type)

})

module.exports = postRouter