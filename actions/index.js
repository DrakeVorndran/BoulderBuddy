export const ADD_PROBLEM = "ADD_PROBLEM"
export const DELETE_PROBLEM = "DELETE_PROBLEM"
export const UPDATE_PROBLEM = "UPDATE_PROBLEM"

export const addProblem = (name, level) => {
  return {
    type: ADD_PROBLEM,
    payload: {name, level}
  }
}

export const deleteProblem = (index) => {
  return {
    type: DELETE_PROBLEM,
    payload: { index }
  }
}

export const updateProblem = (index, attempts=1) => {
  return {
    type: UPDATE_PROBLEM,
    payload: {index, attempts}
  }
}
