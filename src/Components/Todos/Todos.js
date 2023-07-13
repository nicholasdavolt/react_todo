import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row } from 'react-bootstrap'
import SingleTodo from './SingleTodo';
import FilterCat from './FilterCat';


export default function Todos() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState(0)


  useEffect(() => {
    axios.get(`https://localhost:7130/api/ToDo`).then(response => {
        console.log(response)
        setTodos(response.data)
      })
  }, []);
  
  return (
    <section className="resources">
      <article className="bg-info p-5">
        <h1 className="text-center">Things To Do!</h1>
      </article>
      <Container>
          <FilterCat  setFilter={setFilter}/>
          <article className="todoGallery row justify-content-center">
            {filter === 0 ? todos.map(t => <SingleTodo key={t.toDoId} todo={t}/>) : todos.filter(t => t.categoryId === filter).map(t => <SingleTodo key={t.toDoId} todo={t}/>)}
          </article>
        
      </Container>
    </section>
  )
}
