import React, { useContext } from 'react'
import { AuthContext } from  '../../AuthContext'

const OpprettLeker = () => {
  const {isLoggedIn} = useContext(AuthContext)

  return (
    <div>
      {isLoggedIn ? (
        <p>User is logged in</p>
      ) : (
        <p>User is not logged in</p>
      )
    }
    </div>
  )
}

export default OpprettLeker