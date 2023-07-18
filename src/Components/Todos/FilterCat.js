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
    <div className=" text-center ">
        <button className="btn btn-outline-primary  m-1" onClick={() => props.setFilter(0)}>
            All
        </button>

        {categories.map(c =>
            <button key={c.categoryId} className='btn btn-outline-primary m-2' onClick={() => props.setFilter(c.categoryId)}>
                {c.catName}
            </button>)}

            {props.showComplete ? <button className="btn btn-outline-primary m-2" onClick={() => props.setShowComplete(false)}>
            Hide Complete
            </button> : <button className="btn btn-outline-primary  m-2" onClick={() => props.setShowComplete(true)}>
            Show Complete
            </button>}

            
    </div>
  )
}
