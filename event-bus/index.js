const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())


// handle post request events and echo it to all services
app.post('/events',(req,res)=>{
    const event = req.body
    
    axios.post('http://localhost:4000/events',event).catch(err=>{
        console.log(err)
    })
    axios.post('http://localhost:4001/events',event).catch(err=>{
        console.log(err)
    })
    axios.post('http://localhost:4002/events',event).catch(err=>{
        console.log(err)
    })
    axios.post('http://localhost:4003/events',event).catch(err=>{
        console.log(err)
    })
    
    res.send({status: 'OK'})
})

app.listen(4005,()=>{
    console.log('Listening on 4005')
})