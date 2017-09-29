const profiles = (state = [], action) => {
  switch (action.type) {
    case 'VIEW PROFILE':
      return action.profile
    case 'ADD PROFILE':
      return action.profile
    case 'UPDATE PROFILE':
      return state.map( profile => {
        if (profile.id === action.profile.id)
          return action.profile 
        return profile 
      })
    case 'DELETE PROFILE':
      return action.profile
    default:
      return state
  }
}

export default profiles