import React from 'react'
import '../style/form.scss'
import {Link} from 'react-router'

const login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <input type="text" name='username' placeholder='Enter username' />
          <input type="password" name="password" placeholder='Enter password'/>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link  className='toggleAuthForm' to='/register' >Register</Link></p>
      </div>
    </main>
  )
}

export default login
