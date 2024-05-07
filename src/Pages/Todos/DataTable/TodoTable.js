import React, {  useContext, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { deleteTodo, getTodoList } from '../Services';
import { REFETCH_TODO_DATA, UPDATE_TODO_FROM_DATA } from '../../../Provider/Action';
import { globlContext } from '../../../Provider/Provider';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";


// import { render } from '@testing-library/react';
// import { globlContext } from '../../../Provider/Provider';
// import { type } from '@testing-library/user-event/dist/type';
// import { REFETCH_TODO_DATA } from '../../../Provider/Action';
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const TodoTable = () => {
  const [data,setData]=useState([])
  const[isActive,setIsActive]=useState(null)
  const[selectedRow,setSelectedRow]=useState([])
  const[loading,setLoading]=useState(false)
  const{dispatch}=useContext(globlContext)
  

  async function listofTodos()
  {
    const data =await getTodoList()
    // console.log(data.data.map(({id,attributes}) =>({id,...attributes})))
    try {
      const newData=data.data.map(({id,attributes}) =>({id,...attributes}))
      setData(newData)      
    } catch (error) {
       console.log(error.response);
    }
  }

  useEffect(()=>{
    listofTodos()
    dispatch({type:REFETCH_TODO_DATA,payload:listofTodos})
  },[dispatch])
        //  console.log(selectedRow);
       async function DeleteHandler()
        {
          setLoading(true)
          for(let i=0; i<selectedRow.length;i++)
            {
              await deleteTodo(selectedRow[i])
            }
          //  console.log(selectedRow);
            await listofTodos()
            setSelectedRow([])
            setLoading(false)
        }

        //single Delete
        async function singleDeleteHandler(value)
        {
          setIsActive(true)
          setLoading(true)
            await deleteTodo(value)
            await listofTodos()
            setSelectedRow([])
            setLoading(false)
            setIsActive(null)
        }
      async function editHandler(value){
          dispatch({type:UPDATE_TODO_FROM_DATA,payload:value})
        }
        const columns = [
          {
            title: 'Title',
            dataIndex: 'title',
          },
          {
            title: 'Author',
            dataIndex: 'author',
          },
          {
            title: 'IsActive',
            dataIndex: 'isActive',
            render:value=> <span>{value?"true":"false"}</span>
          },
          {
            title: 'Description',
            dataIndex: 'description',
          },
          {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => <div className='d-flex gap-2 '>
              <Button className='border bg-none ' onClick={async()=> await singleDeleteHandler(record?.id)}>
              {loading &&   isActive=== record?.id ?"Loading...":<MdDelete/>}</Button>
              <Button className='border bg-none ' onClick={async()=> await editHandler(record)}>
             <MdEdit/></Button>
            </div>,
          },
        
        ];        
 return <>
    {selectedRow.length>0 && <Button disabled={loading} onClick={DeleteHandler} className='my-2' size='small' type="primary" danger>
      {loading ? "Loading...":"Delete"}
    </Button>}
 <Table
  bordered
    columns={columns}
    dataSource={data}
    size='small'
    rowKey={(record) => record.id} // Use record.id as rowKey
    rowSelection={
      {
        onChange(value)
        {
          setSelectedRow(value)
          // console.log(value);
        },
        selectedRowKeys:selectedRow
      }
    }
    pagination={false}
    onChange={onChange}
    showSorterTooltip={{
      target: 'sorter-icon',
    }}
  />

 </>
}
export default TodoTable;