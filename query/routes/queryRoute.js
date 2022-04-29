const express = require('express')
const queryRouter  = express.Router()
const {handleEvent,posts} = require('../service/handleEvent')

queryRouter.get('/posts',(req,res)=>{
    res.send(posts)
})

queryRouter.post('/events',(req,res)=>{
    console.log('Received Event :',req.body)
    const {type,data} = req.body
    
    handleEvent(type,data)

    res.status(201).send(posts)
})

module.exports = queryRouter
