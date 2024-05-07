import React, {  useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { createTodo, updateTodo } from '../Services';
import { globlContext } from '../../../Provider/Provider';
import { UPDATE_TODO_FROM_DATA } from '../../../Provider/Action';
const {TextArea} = Input

const SubmitFrom = () => {
  const [loading,setLoading]=useState(false)
  const { values: ReducerValues,dispatch} = useContext(globlContext)
  console.log(ReducerValues);
  const formref=useRef(null)
  const onFinish = async (values) => {
    // console.log({data:values});
    setLoading(true)
    if(ReducerValues?.initialTodoFromData)
      {
        //  alert("iam from update")
        //  console.log(ReducerValues?.initialTodoFromData?.id,{data:values});
         updateTodo(ReducerValues?.initialTodoFromData?.id,{data:values});
        
      }
      else
      {
        await createTodo({data:values})
      }
    // console.log(data);
    // alert("Added data Successfully..")
  //  await ReducerValues.REFETCH_TODO_DATA
   if (ReducerValues && typeof ReducerValues.refetchTodoDataAPI === 'function') {
    await ReducerValues.refetchTodoDataAPI(); // Ensure the function exists before calling it
  }
    formref.current.resetFields()
    setLoading(false)
    dispatch({type:UPDATE_TODO_FROM_DATA,dispatch:null})

  };
  
  useEffect(()=>{
    if(ReducerValues?.initialTodoFromData)
      {
        formref.current?.setFieldsValue(ReducerValues?.initialTodoFromData)
      }
  },[ReducerValues?.initialTodoFromData])
  
 return <Form
    name="basic"
    onFinish={onFinish}
    autoComplete="off"
    // defaultValue={ReducerValues?.initialTodoFromData}
    layout='vertical'
    ref={formref} 
  >
    <Form.Item
      label="Title"
      name="title"
      rules={[
        {
          required: true,
          message: 'Please enter  the title!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Author"
      name="author"
      rules={[
        {
          required: true,
          message: 'Please enter author name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
     <Form.Item
           label="Description"
           name="description" rules={[{
            required: true,
            message: 'Please enter description !',
           }]}   
     >
       <TextArea/>
     </Form.Item>
     

    <Form.Item
    >
      <Button type="primary" htmlType="submit">
        {loading?"Loading...":ReducerValues?.initialTodoFromData?"Update": "Submit"}
      </Button>
    </Form.Item>
  </Form>
};
export default SubmitFrom;