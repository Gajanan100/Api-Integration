import React from 'react'
import SubmitFrom from './From/SubmitFrom'
import TodoTable from './DataTable/TodoTable'

const Todos = () => {
  return (
    <div>
      <div className='container mt-5'>
        <div className='shadow w-50 p-5 mx-auto'>
        <SubmitFrom/>
        </div>
        <TodoTable/>
      </div>
    </div>
  )
}

export default Todos
