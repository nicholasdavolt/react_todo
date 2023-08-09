import React, {useState, useEffect} from 'react'
import { Formik, Form, Field, } from 'formik'
import {todoSchema} from '../../utilities/validationSchema'
import axios from 'axios'

export default function TodoForm(props) {
    const [categories, setCategories] = useState([])
    

    const getCategories = () => {
        axios.get(`http://todoapi.nicholasdavolt.com/api/Categories`).then(response => {
          console.log(response)
          setCategories(response.data)
        }) }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo) {
            const todoToCreate = values

            axios.post(`http://todoapi.nicholasdavolt.com/api/ToDo`, todoToCreate).then(() => {
                props.setShowCreate(false)
                props.getTodos()
            })
        }
        else {

            const todoToEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                done: props.todo.done,
                categoryId: values.categoryId

            }

            console.log(todoToEdit)

            axios.put(`http://todoapi.nicholasdavolt.com/api/ToDo/${props.todo.toDoId}`, todoToEdit).then(() => {
                
                props.setShowEdit(false)
                props.getTodos()
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);
  
    return (
        <Formik 
        initialValues={{
            name: props.todo ? props.todo.name : '',
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}>

            {({ errors, touched}) => (
                <Form id='todoForm'>
                    <div className="form-group m-3">
                        <Field name='name' className='form-control' placeholder='Name'/>
                        {errors.name && touched.name &&
                            <div className='text-danger'>{errors.name}</div>}
                    </div>
                    <div className="form-group m-3">
                        <Field name='categoryId' as='select' className='form-control' >
                            <option value='' disabled>
                                [--Please Choose--]
                            </option>
                            {categories.map(cat => 
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.catName}
                                </option>)}
                        </Field>

                        
                    </div>

                    <div className="form-group m-3">
                        <button type='submit' className='btn btn-info m-3'>
                            Submit ToDo
                        </button>
                    </div>

                </Form>
            )}

        </Formik>
    

    
  )
}
