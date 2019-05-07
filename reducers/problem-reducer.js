import { ADD_PROBLEM, DELETE_PROBLEM, UPDATE_PROBLEM } from '../actions/index'

const problemReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_PROBLEM:
      const { name, grade } = action.payload
      return [...state, { name, grade, attempts: 0 }]

    case DELETE_PROBLEM:
      const { index } = action.payload
      return [...state.slice(0, index), ...state.slice(index + 1)]

    case UPDATE_PROBLEM:
      const { attempts } = action.payload
      return state.map((item, i) => {
        if(i === action.payload.index) {
          total = item.attempts + attempts
          return {...item, attempts: total}
        }
        return item
      })
    
      default:
        return state
  }
}

export default problemReducer