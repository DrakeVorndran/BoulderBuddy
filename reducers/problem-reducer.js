import { ADD_PROBLEM, DELETE_PROBLEM, UPDATE_PROBLEM, FINISH_PROBLEM } from '../actions/index'

const problemReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PROBLEM:
      const { name, grade, image } = action.payload
      return [...state, { name, grade, image, attempts: 0, finished: false }]

    case DELETE_PROBLEM:
      const { index } = action.payload
      return [...state.slice(0, index), ...state.slice(index + 1)]

    case UPDATE_PROBLEM:
      const { attempts } = action.payload
      return state.map((item, i) => {
        if (i === action.payload.index) {
          total = item.attempts + attempts
          return { ...item, attempts: total }
        }
        return item
      })

    case FINISH_PROBLEM:
      return state.map((item, i) => {
        if (i === action.payload.index) {
          total = item.attempts + 1
          return { ...item, attempts: total, finished: true }
        }
        return item
      })

    default:
      return state
  }
}

export default problemReducer