import React, { useState } from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import { useAuth } from '../hook/useAuth.js'
import '../style/form.scss'

const Register = () => {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const {register: registerUser} = useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    registerUser(username, email, password)
  }
  return (
   <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
          onInput={(e)=>{setUsername(e.target.value)}}
          type='text'
          name='username'
          placeholder='Enter username'/>
  
          <input
           onInput={(e)=>{setEmail(e.target.value)}}
           type="email"
           name='username'
           placeholder='Enter email' />

          <input 
           onInput={(e)=>{setPassword(e.target.value)}}
           type="password"
           name='password'
           placeholder='Enter password' />

          <button>Register</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to='/login' >Login</Link></p>
      </div>
   </main>
  )
}

export default Register
