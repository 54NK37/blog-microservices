const express = require('express')
const cors = require('cors')
const queryRoute = require('./routes/queryRoute')
const app = express()

app.use(cors())
app.use(express.json())
app.use(queryRoute)

app.listen(4002,()=>{
    console.log('Listening on 4002')
})