
import { REFETCH_TODO_DATA, UPDATED_TODO_DATA, UPDATE_TODO_FROM_DATA } from "./Action"

export const initialState = {
    todoData: [],
    refecthTodoDataApi:null,
    initialTodoFromData:null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATED_TODO_DATA:
            return { ...state, todoData: action.payload }
        case REFETCH_TODO_DATA:
            return { ...state, refecthTodoDataApi: action.payload }
            case UPDATE_TODO_FROM_DATA:
                return { ...state, initialTodoFromData: action.payload }
    
        default:
            return state
    }
}