import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import TodoEdit from './TodoEdit'


export default function SingleTodo(props) {
    const {name} = props.todo

    const {currentUser} = useAuth()
    const [showEdit, setShowEdit] = useState(false)
    const [isChecked, setIsChecked] = useState(props.todo.done);

    const deleteTodo = (id) => {
      if(window.confirm(`Are you sure you want to delete ${props.todo.name}?`)) {
        axios.delete(`https://localhost:7130/api/ToDo/${props.todo.toDoId}`).then(() => props.getTodos())
      }
    }

    const updateDone = () => {

      const todoToEdit = {
        toDoId: props.todo.toDoId,
        name: props.todo.name,
        done: !props.todo.done,
        categoryId: props.todo.categoryId

    }
    console.log(todoToEdit)

    axios.put(`https://localhost:7130/api/ToDo/${props.todo.toDoId}`, todoToEdit).then(() => {
        setIsChecked(!props.todo.done)       
        props.getTodos()
        
    })
  }



  return (
    <div className="singleTodo col-md-4 m-4">
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className='toDoTop'>
          <button id='editLink' onClick={() => setShowEdit(true)}>
            <FaEdit/>
          </button>
          <button id='deleteLink' onClick={() => deleteTodo(props.todo.toDoId)}>
            <FaTrashAlt/>
          </button>
          {showEdit && 
          <TodoEdit 
            todo={props.todo}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            getTodos={props.getTodos} />}
        </div> }
        <h3>{name}</h3>
        <input type='checkbox'  checked={isChecked} onChange={updateDone}/>
    </div>
  )
}
