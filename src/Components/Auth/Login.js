import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {

  // These hooks pull from the AuthContext and the react router

  const {login} = useAuth()
  const navigate = useNavigate()

  async function handleAuth() {

    await login()

    return navigate('/')
  }

  return (
    <div className="login">
      <article className="mb-5 p-5">
        <h1 className="mb-3 text-center">Welcome to Things To Do!</h1>
        <Container>
          <Card className='m-2 card text-center'>
            <Card.Header className=' cardHeader text-white'>
              <h2>Login for full functionality</h2>
            </Card.Header>
            <Card.Body className='cardBody'>
              <button className="btn btn-outline-primary" onClick={() => handleAuth()}>
                Login with GitHub
              </button>
            </Card.Body>
          </Card>
        </Container>
      </article>
    </div>
    
  )
}
