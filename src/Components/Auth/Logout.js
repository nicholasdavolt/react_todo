import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function Logout() {

    const {logout} = useAuth()
    const navigate = useNavigate()

    function handleAuth() {
        logout()
        navigate('/')
    }

  return (
    
        
        <button className="btn btn-link nav-link" onClick={() => handleAuth()}>
            Logout
        </button>
   
  )
}
