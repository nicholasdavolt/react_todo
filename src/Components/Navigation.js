import React from 'react'
import { Nav, Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Logout from './Auth/Logout'

export default function Navigation() {
    const {currentUser} = useAuth()
  return (
    <Navbar expand='md'  sticky='top' className='p-3 navBar'>
        <Navbar.Brand id='mainLogo' href='/'>Things To Do</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            <Nav>
                {currentUser ? <Logout/> : 
                <Link to='/Login' className='nav-link'>Login</Link>
              }
              <Link to='/Categories' className='nav-link'>Categories</Link>
                <Link to='/Todos' className='nav-link'>Todos</Link>

            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
