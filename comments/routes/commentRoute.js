const express = require('express')
const {randomBytes} = require('crypto')
const axios = require('axios')

const commentRouter = express.Router()
const commentsByPostId = require('../testdata/comments.json')

commentRouter.get('/posts/:id/comments',(req,res)=>{
    const postId = req.params['id']
    const comments = commentsByPostId[postId] || []
    
    res.status(201).send(comments)
})

commentRouter.post('/posts/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const postId = req.params['id']
    const comments = commentsByPostId[postId] || []

    const newComment = {id:commentId,content:req.body.comment,status:"Pending"}
    comments.push(newComment)

    const event = {
        type : "Comment Created",
        data : {id:commentId,content:req.body.comment,status:"Pending",postId}
    }

    // creating new event for event-bus
    await axios.post('http://localhost:4005/events',event)

    res.status(201).send(comments)
})

commentRouter.post('/events',(req,res)=>{

    const type = req.body.type

    console.log('Received event ',type)

    if(type == 'Comment Updated')
    {
        const {id,content,status,postId} = req.body.data
        commentsByPostId[postId].every((comment,index)=>{
            if(comment.id == id)
            {
                commentsByPostId[postId][index].status = status
                return false 
            }
            return true
        })
    }

    res.send()
})

module.exports = commentRouter