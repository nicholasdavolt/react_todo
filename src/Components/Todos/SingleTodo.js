import React from 'react'
import { Form } from 'react-bootstrap'

export default function SingleTodo(props) {
    const {name} = props.todo

  return (
    <div className="singleTodo col-md-4 m-4">
        <h3>{name}</h3>
        {/* <Form.Check aria-label='Done' onChange={}/> */}
    </div>
  )
}
