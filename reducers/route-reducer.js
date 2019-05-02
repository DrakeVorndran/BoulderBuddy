import { ADD_ROUTE, DELETE_ROUTE, UPDATE_ROUTE } from '../actions/index'

const routeReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_ROUTE:
      const { name, level } = action.payload
      return [...state, { name, level, attempts: 0 }]

    case DELETE_ROUTE:
      const { index } = action.payload
      return [...state.slice(0, index), ...state.slice(index + 1)]

    case UPDATE_ROUTE:
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

export default routeReducer