import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'



const Register = () => {

  const {loading , handleRegister} = useAuth()

  const handleSubmit=(e)=>{
    e.preventDefault()

    
  }

 

  return (
     <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name='username' id='usernamae' placeholder='Enter username' />
          <input type="text" name='eamil' id='email' placeholder='Enter eamil' />
          <input type="password" name='password' id='password' placeholder='password' />
          <button className='button primary-button'>Register</button>
        </form>
        <p>Already have an account ? <Link to={'/login'}>Login to account</Link> </p>
      </div>
     </main>
  )
}

export default Register
