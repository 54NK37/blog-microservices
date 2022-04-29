const posts =require('../testdata/query.json')

const handleEvent = (type,data)=>{
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
                posts[postId].comments[index].content = content
                return false 
            }
            return true
        })
    }

}

module.exports = {handleEvent,posts}