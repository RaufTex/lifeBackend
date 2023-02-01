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

export default function ProtectedRoutes (props) {
  //const auth = useAuth()

  const { isAuthenticated, loading } = useUsersContext()

  const useAuth = () => {
    const user = { loggedIn: localStorage.getItem("token") };
    return user && user.loggedIn;
  };

  const isAuth = useAuth();

  //console.log('iss', isAuth)

  return isAuth ? <Outlet /> : <Navigate to='/' />
}

//export default ProtectedRoutes
