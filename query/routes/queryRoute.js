const express = require('express')
const queryRouter  = express.Router()

const posts =require('../testdata/query.json')

queryRouter.get('/posts',(req,res)=>{
    res.send(posts)
})

queryRouter.post('/events',(req,res)=>{
    console.log('Received Event :',req.body)
    const {type,data} = req.body
    
    if(type == 'Post Created')
    {
        const {id,title} = data
        posts[id] = {id,title,comments:[]}
    }
    
    if(type == 'Comment Created')
    {
        const {id,content,status,postId} = data
        posts[postId].comments.push({id,content,status})
    }

    if(type == 'Comment Updated')
    {
        const {id,content,status,postId} = data
        posts[postId].comments.every((comment,index)=>{
            if(comment.id == id)
            {
                posts[postId].comments[index].status = status
                return false 
            }
            return true
        })
    }

    console.log(posts)
    res.status(201).send(posts)
})

module.exports = queryRouter
