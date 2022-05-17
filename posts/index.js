const express = require('express')
const cors = require('cors')
const postRouter = require('./routes/postRoute')
const app = express()

app.use(cors())
app.use(express.json())
app.use(postRouter)

app.listen(4000,()=>{
    console.log('v1')
    console.log('Listening on 4000')
})