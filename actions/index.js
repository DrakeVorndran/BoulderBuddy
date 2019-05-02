export const ADD_ROUTE = "ADD_ROUTE"
export const DELETE_ROUTE = "DELETE_ROUTE"
export const UPDATE_ROUTE = "UPDATE_ROUTE"

export const addRoute = (name, level) => {
  return {
    type: ADD_ROUTE,
    payload: {name, level}
  }
}

export const deleteRoute = (index) => {
  return {
    type: DELETE_ROUTE,
    payload: { index }
  }
}

export const updateRoute = (index, attempts=1) => {
  return {
    type: UPDATE_ROUTE,
    payload: {index, attempts}
  }
}
