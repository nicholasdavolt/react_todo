import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import CatEdit from './CatEdit';



export default function SingleCategory(props) {

  const [showEdit, setShowEdit] = useState(false);
  const {currentUser} = useAuth()

  const deleteCat = (id) => {
    if (window.confirm(`Are you sure you want to delete ${props.category.categoryName}?`)) {
      axios.delete(`http://todoapi.nicholasdavolt.com/api/Categories/${id}`).then (() => props.getCategories())
    }
  }

    const {catName, catDesc} = props.category
  return (
    <tr>
        <td>{catName}</td>
        <td>{catDesc}</td>
        {/* Begin Edit UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
           <td>
           <buton className='m-1 rounded' id='editLink' onClick= {() => setShowEdit(true)}>
             <FaEdit/>
           </buton>
           <buton className='m-1 rounded' id='deleteLink' onClick= {() => deleteCat(props.category.categoryId)}>
             <FaTrashAlt/>
           </buton>
           {showEdit && 
           <CatEdit 
            setShowEdit={setShowEdit}
            showEdit={showEdit}
            getCategories={props.getCategories}
            category={props.category} />
          } 
         </td>
          }
        {/* End Edit UI */}
    </tr>
  )
}
