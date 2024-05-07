
import React, { createContext, useReducer } from 'react'
import { initialState, reducer } from './Reducer'

export const globlContext = createContext()
const Provider = ({ children }) => {
    const [values, dispatch] = useReducer(reducer, initialState)

    return (
        <globlContext.Provider value={{ values, dispatch }}>
            {children}
        </globlContext.Provider>
    )
}

export default Provider
