const express = require("express")
const cors = require('cors')
const commentRouter = require('./routes/commentRoute')
const app = express()

app.use(cors())
app.use(express.json())
app.use(commentRouter)

app.listen(4001,()=>{
    console.log('Listening on 4001')
})