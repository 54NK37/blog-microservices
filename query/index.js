const express = require('express')
const cors = require('cors')
const queryRoute = require('./routes/queryRoute')
const handleEvent = require('./service/handleEvent')
const { default: axios } = require('axios')
const app = express()

app.use(cors())
app.use(express.json())
app.use(queryRoute)

app.listen(4002,async ()=>{
    console.log('Processing events')

    try {
        const res = axios.get('http://event-bus-srv:4005/events').catch(err=>{
            console.log(err.message)
        }) || []

// handle all pending events ,as this service has been down/launched after making of other services recently
        for(let event of res)
        {
            handleEvent(event.type,event.data)
        }

    } catch (error) {
        console.log(error)
    }

    console.log('Listening on 4002')
})