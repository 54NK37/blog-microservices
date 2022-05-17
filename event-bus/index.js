const express = require('express')
const app = express()
const axios = require('axios')
const res = require('express/lib/response')

app.use(express.json())

// store events for event syncing incase any service is down
const events =[]

// handle post request events and echo it to all services
app.post('/events',(req,res)=>{
    const event = req.body
    events.push(event)

    axios.post('http://posts-clusterip-srv:4000/events',event).catch(err=>{
        console.log(err.message)
    })
    axios.post('http://comments-clusterip-srv:4001/events',event).catch(err=>{
        console.log(err.message)
    })
    axios.post('http://query-clusterip-srv:4002/events',event).catch(err=>{
        console.log(err.message)
    })
    axios.post('http://comment-moderation-srv:4003/events',event).catch(err=>{
        console.log(err.message)
    })
    
    res.send({status: 'OK'})
})

app.get('/events',()=>{
    res.send(events)
})

app.listen(4005,()=>{
    console.log('Listening on 4005')
})