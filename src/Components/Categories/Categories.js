import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleCategory from './SingleCategory';


export default function Categories() {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`https://localhost:7130/api/Categories`).then(response => {console.log(response)
        setCategories(response.data)
        
        })
  }, []);
  return (
    <section className='categories'>
      <article className="bg-info p-5">
        <h1 className="text-center">Categories Dashboard</h1>
      </article>

      <Container className='p-2'>
        <table className='table bg-info table-dark my-3'>
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c =>
                <SingleCategory key={c.categoryId} category={c} />
              )}
          </tbody>

        </table>
      </Container>
    </section>
  )
}
