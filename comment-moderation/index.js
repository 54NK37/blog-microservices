const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())

// taking input from event and again recreating new event after checking words in comments
app.post('/events',async (req,res)=>{
    const {type,data} = req.body
    const {content,status} = data

    if(type == "Comment Created" && status=="Pending")
    {
        if(content.toLowerCase().includes("orange"))
        {
            data.status = "Rejected"
        }
        else{
            data.status = "Approved"
        }
        await axios.post('http://localhost:4005/events',{type:"Comment Moderated",data})
    }


    res.send({})
})

app.listen(4003,()=>{
    console.log('Listening on 4003')
})