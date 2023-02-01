import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useUsersContext } from '../../../Context/UserContext'




// const useAuth = () => {
//   const user = localStorage.getItem('user')
//   if (user) {
//     return true
//   } else {
//     return false
//   }
// }

export default function PublicRoutes (props) {
  //const auth = useAuth()

  const { isAuthenticated, loading } = useUsersContext()

  return isAuthenticated ? <Navigate to='/cadastro' /> : <Outlet/> 
}

//export default ProtectedRoutes
