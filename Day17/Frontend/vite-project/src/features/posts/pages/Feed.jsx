import React from 'react'

const Feed = () => {
  return (
     <main>
        <div className="feed">
            <div className="posts">
                <div className="user">
                    <img src="https://images.unsplash.com/photo-1724710151888-d9f0607f344a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                    <p>Username</p>
                </div>
                <img src="https://images.unsplash.com/photo-1773414001281-7e1cadd04a79?q=80&w=751&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  />
                <div className="botton">
                    <p className='caption'>caption</p>
                </div>
            </div>
        </div>
     </main>
  )
}

export default Feed
