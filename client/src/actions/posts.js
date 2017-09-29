import axios from 'axios'
import {setHeaders} from './headers'

//getAllPosts
export const getPosts = () => {
  //thunk
  return(dispatch) => {
    axios.get('/api/posts')
    .then( res => {
      dispatch(setHeaders(res.headers));   
      dispatch({type: 'POSTS', posts: res.data})})
  }
}

//AddPost
export const addPost = (post) => {
  return(dispatch) => {
    axios.post(`/api/posts`, {post})
      .then( res => {
        dispatch(setHeaders(res.headers));  
        dispatch({ type: 'ADD POST', post: res.data })
      })
  }
}

//EditPost
export const updatePost = (post) => {
  return(dispatch) => {
    axios.put(`/api/posts/${post.id}`, {post})
      .then(res => {
        dispatch(setHeaders(res.headers))        
        dispatch({type: 'UPDATE POST', post: res.data})
      })
  }
}

//DeletePost
export const deletePost = (id) => {
  return(dispatch) => {
    axios.delete(`/api/posts/${id}`)
      .then(res => {
        dispatch(setHeaders(res.headers))        
        dispatch({type: 'DELETE POST', id})
      })
  }
}
