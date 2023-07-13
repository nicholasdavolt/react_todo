import React, {useState, useEffect}from 'react'
import axios from 'axios'

export default function FilterCat(props) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7130/api/Categories`).then(response => {console.log(response)
            setCategories(response.data)
            
            })
      }, []);


  return (
    <div className="float-start text-center">
        <button className="btn btn-outline-info bg-dark m-1 d-block" onClick={() => props.setFilter(0)}>
            All
        </button>

        {categories.map(c =>
            <button key={c.categoryId} className='btn btn-outline-info bg-dark m-1 d-block' onClick={() => props.setFilter(c.categoryId)}>
                {c.catName}
            </button>)}
    </div>
  )
}
