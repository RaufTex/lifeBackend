/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
// import Dashboard from "layouts/dashboard";

// import Tables from ".layouts/tables";
// import Billing from "./Components/BackOffice/Empresas/layouts/billing";
// import RTL from "./Components/BackOffice/Empresas/layouts/rtl";
// import Notifications from "./Components/BackOffice/Empresas/layouts/notifications";
// import Profile from "./Components/BackOffice/Empresas/layouts/profile";
// import SignIn from "./Components/BackOffice/Empresas/layouts/authentication/sign-in";
// import SignUp from "./Components/BackOffice/Empresas/layouts/authentication/sign-up";

// // @mui icons
// import Icon from "@mui/material/Icon";
// import Dashboard from "./Components/BackOffice/Empresas/layouts/dashboard";
// import Tables from "./Components/BackOffice/Empresas/layouts/tables";

// const routes = [
//   {
//     type: "collapse",
//     name: "Dashboard",
//     key: "dashboard",
//     icon: <Icon fontSize="small">dashboard</Icon>,
//     route: "/dashboard",
//     component: <Dashboard />,
//   },
//   {
//     type: "collapse",
//     name: "Tables",
//     key: "tables",
//     icon: <Icon fontSize="small">table_view</Icon>,
//     route: "/tables",
//     component: <Tables />,
//   },
//   {
//     type: "collapse",
//     name: "Billing",
//     key: "billing",
//     icon: <Icon fontSize="small">receipt_long</Icon>,
//     route: "/billing",
//     component: <Billing />,
//   },
//   {
//     type: "collapse",
//     name: "RTL",
//     key: "rtl",
//     icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
//     route: "/rtl",
//     component: <RTL />,
//   },
//   {
//     type: "collapse",
//     name: "Notifications",
//     key: "notifications",
//     icon: <Icon fontSize="small">notifications</Icon>,
//     route: "/notifications",
//     component: <Notifications />,
//   },
//   {
//     type: "collapse",
//     name: "Profile",
//     key: "profile",
//     icon: <Icon fontSize="small">person</Icon>,
//     route: "/profile",
//     component: <Profile />,
//   },
//   {
//     type: "collapse",
//     name: "Sign In",
//     key: "sign-in",
//     icon: <Icon fontSize="small">login</Icon>,
//     route: "/authentication/sign-in",
//     component: <SignIn />,
//   },
//   {
//     type: "collapse",
//     name: "Sign Up",
//     key: "sign-up",
//     icon: <Icon fontSize="small">assignment</Icon>,
//     route: "/authentication/sign-up",
//     component: <SignUp />,
//   },
// ];

// export default routes;

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import HomePage from './Components/HomePage/HomePage'
// import PaternityPage from './Components/PaternityPage/PaternityPage'
import BackOffice from './Components/BackOffice/BackOffice'
import Usuario from './Components/BackOffice/Usuario/Usuario'
// import Ursula from './Components/Ursula/Ursula'
import { useUsersContext } from './Context/UserContext'
//import Vendas from "./Components/BackOffice/Vendas/Vendas";
//import Agendamentos from "./Components/BackOffice/Agendamentos/Agendamentos";
// import Schedules from './Components/Schedules/Schedules'
// import SchedulesTest from './Components/ScheduleTest/SchedulesTest'
// import AutoTeste from './Components/AutoTeste/AutoTeste'
// import Empresas from './Components/BackOffice/Empresas/Empresas'
// import Dashboard from './Components/BackOffice/Empresas/layouts/dashboard'
import ClientB2B from './Components/BackOffice/ClientB2B/ClientB2B'
// import Dashboard from './Components/BackOffice/Dashboard/Dashboard'
// import CadastroB2B from './Components/BackOffice/CadastroB2B/CadastroB2B'



export default function MainRoutes () {
  const { isAuthenticated, loading } = useUsersContext()

  console.log(isAuthenticated)

  const PrivateRoute = ({ children }) => {
    console.log(children)

    if (loading) {
      return <div className='loading'>Carregando...</div>
    }
    // isauth() returns true or false based on localStorage

    return isAuthenticated ? children : <Navigate to='/backoffice' />
  }

  return (
    <Routes>
      <Route path='/' element={<ClientB2B />} />
      {/* <Route path='/teste-paternidade' element={<PaternityPage />} /> */}
      <Route path='/backoffice' element={<BackOffice />} />
      <Route exact path='/backoffice/usuario' element={<Usuario />} />
      {/* <Route path='/avaliacao-ursula' element={<Ursula />} /> */}
      <Route
        path='/teste'
        element={
          <PrivateRoute>
            <h1>teste</h1>
          </PrivateRoute>
        }
      />
      {/* <Route path="/tabela" element={<PrivateRoute><Vendas /></PrivateRoute>}/> */}
      {/* <Route path="/teste-agendamento" element={<Agendamentos />} /> */}
      {/* <Route path='/agendamentos' element={<Schedules />} />
      <Route path='/pagamento' element={<SchedulesTest />} />
      <Route path='/auto-teste-covid-19' element={<AutoTeste />} /> */}
      {/* <Route path='/empresas/dashboard' element={<Empresas />} /> */}
     
    </Routes>
  )
}
