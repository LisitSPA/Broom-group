import React from 'react'

import axios from 'axios';

const UserProfile = () => {
  const handleLogout = () => {
    axios.delete('/users/sign_out')
      .then(response => {
        window.location.href = '/users/sign_in'
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className='p-10'>
      <div class="text-sm cursor-pointer" onClick={handleLogout}>
        Cerrar sesión
      </div>
    </div>
  )
}

export default UserProfile