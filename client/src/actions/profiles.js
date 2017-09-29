import axios from 'axios'
import {setHeaders} from './headers'

//getAllProfiles
export const viewProfile = (id) => {
  //thunk
  return(dispatch) => {
    axios.get(`/api/profiles/${id}`)
      .then( res => {
        dispatch(setHeaders(res.headers))
        dispatch({type: 'VIEW PROFILE', profile: res.data})
    })
  }
}

//AddProfile
export const addProfile = (profile) => {
  return(dispatch) => {
    axios.post('/api/profiles', profile)
      .then( res => {
        dispatch(setHeaders(res.headers)); 
        dispatch({ type: 'ADD PROFILE', profile: res.data })
      })
  }
}

//EditProfile
export const updateProfile = (id, profile) => {
  return(dispatch) => {
    axios.put(`/api/categories/${id}`, {profile})
      .then(res => {
        dispatch(setHeaders(res.headers))        
        dispatch({type: 'UPDATE PROFILE', profile: res.data})
      })
  }
}

//DeleteCategory
export const deleteProfile = (id) => {
  return(dispatch) => {
    axios.delete(`/api/profiles/${id}`)
      .then(res => {
        dispatch(setHeaders(res.headers))        
        dispatch({type: 'DELETE PROFILE', profile: res.data})
      })
  }
}
