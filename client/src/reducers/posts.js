const posts = (state = [], action) => {
  switch (action.type) {
    case 'POSTS':
      return action.posts
    case 'ADD POST':
      return [...state, action.post]
    case 'UPDATE POST':
      return state.map( post => {
        if (post.id === action.post.id)
          return action.post 
        return post 
      })
    case 'DELETE POST':
      return state.filter(post => post.id !== action.id)
    default:
      return state
  }
}

export default posts