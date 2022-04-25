import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    if(comment.status === "Approved")
      return <li key={comment.id}>{comment.content}</li>;
    else{
      return <li key={comment.id}>{comment.status}</li>;
    }
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
