import React, { useState, useEffect } from 'react'
import './Todo.css'
import axios from 'axios'
import { Container} from 'react-bootstrap'
import SingleTodo from './SingleTodo';
import FilterCat from './FilterCat';

import {useAuth} from '../../contexts/AuthContext'
import TodoCreate from './TodoCreate';


export default function Todos() {
  const [todos, setTodos] = useState([])

  const {currentUser} = useAuth()
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState(0)
  const [showComplete, setShowComplete] = useState(false);

  const getTodos =  () => {
    axios.get(`http://todoapi.nicholasdavolt.com/api/ToDo`).then(response => {
      console.log(response)
        setTodos(response.data)
    })
  }

  useEffect(() => {
    axios.get(`http://todoapi.nicholasdavolt.com/api/ToDo`).then(response => {
        console.log(response)
        setTodos(response.data)
      })
  }, []);
  
  return (
    <section className="todos">
      <article className=" p-5">
        <h1 className="text-center">Things To Do!</h1>
      </article>
      {/* BEGIN CREATE UI */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
          <button className="btn btn-outline-primary" onClick={() => setShowCreate(!showCreate)}>
            {!showCreate ? 'Create New ToDo' : 'Close Form'}
          </button>
          <div className="createContainer">
            {showCreate &&
            <TodoCreate getTodos={getTodos} setShowCreate={setShowCreate}/>}
          </div>
        </div>
        }
        {/* END CREATE UI */}
      <Container>
          <FilterCat  setFilter={setFilter} setShowComplete={setShowComplete} showComplete={showComplete}/>
          <article className="todoGallery row justify-content-center">
            {showComplete ?
            filter === 0 ? todos.map(t => <SingleTodo key={t.toDoId} todo={t} getTodos={getTodos} setShowComplete={setShowComplete} showComplete={showComplete}/>) : todos.filter(t => t.categoryId === filter).map(t => <SingleTodo key={t.toDoId} todo={t} getTodos={getTodos}/>) : filter === 0 ? todos.filter(t => !t.done).map(t => <SingleTodo key={t.toDoId} todo={t} getTodos={getTodos}/>) : todos.filter(t => t.categoryId === filter && !t.done).map(t => <SingleTodo key={t.toDoId} todo={t} getTodos={getTodos}/>)}
          </article>
        
      </Container>
    </section>
  )
}
