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

import { useState, useEffect, useMemo } from 'react'

// react-router components
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

// @mui material components
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Icon from '@mui/material/Icon'

// Material Dashboard 2 React components
import MDBox from './components/MDBox'

// Material Dashboard 2 React example components
//import Sidenav from "examples/Sidenav";

import Configurator from './examples/Configurator'

// Material Dashboard 2 React themes
import theme from './assets/theme'
import themeRTL from './assets/theme/theme-rtl'

// Material Dashboard 2 React Dark Mode themes
import themeDark from './assets/theme-dark'
import themeDarkRTL from './assets/theme-dark/theme-rtl'

// RTL plugins
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

// Material Dashboard 2 React routes
// import routes from "routes";

// Material Dashboard 2 React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator
} from './context'

// Images
import brandWhite from './assets/images/logo-ct.png'
import brandDark from './assets/images/logo-ct-dark.png'
import brandUdna from './assets/images/logo_purple.png'
import Sidenav from './examples/Sidenav'
// import routes from "../../../routes";
import routes from './routes'
import routesEspecialistas from './routesEspecialistas'
import routesBackoffice from './routesBackoffice'
import {
  ListUsersProvider,
  useUsersContext
} from '../../../Context/UserContext'
import LoginB2B from '../LoginB2B/Login'
import ClientB2B from '../ClientB2B/ClientB2B'
// import CadastroB2B from '../CadastroB2B/CadastroB2B'
// import CadastroEspecialistas from '../CadastroEspecialistas/CadastroEspecialistas'
import ProtectedRoutes from './ProtectedRoutes'
import InnerContent from './InnerContent'
import PublicRoutes from './PublicRoutes'
import BackOffice from '../BackOffice'
// import Dashboard from '../Dashboard/Dashboard'
import Usuario from '../Usuario/Usuario'
import Dashboard from './layouts/dashboard'
import Teleconsultas from './layouts/teleconsultas'
import Tables from './layouts/tables'
// import SchedulesTest from '../../ScheduleTest/SchedulesTest'
import Billing from './layouts/billing'
import Profile from './layouts/profile'
import Absenteeism from './layouts/absenteeism'
import LoginEspecialistas from '../LoginEspecialistas/Login'
import AgoraCall from '../AgoraCall/AgoraCall'
import DashboardBack from './layouts/dashboardBackoffice'
import Usuarios from './layouts/usuarios'
import EmpresasDash from './layouts/empresas'
import Programas from './layouts/programas'
import Gestao from './layouts/gestao'
// import SetSetores from '../SetSetores/SetSetores'
// import Jornada from '../Jornada/Jornada'
import TeleconsultasGerais from './layouts/teleconsultasGerais'
import ProfissionaisConsultas from './layouts/profissionaisConsultas'


export default function Empresas () {
  const [controller, dispatch] = useMaterialUIController()
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode
  } = controller
  const [onMouseEnter, setOnMouseEnter] = useState(false)
  const [rtlCache, setRtlCache] = useState(null)
  const { pathname } = useLocation()

  const user = {
    isEspecialista: localStorage.getItem('isEspecialista'),
    isBackoffice: localStorage.getItem('isBackoffice')
  }

  console.log('uss', user)

  console.log('LAY', layout)
  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [rtlPlugin]
    })

    setRtlCache(cacheRtl)
  }, [])

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false)
      setOnMouseEnter(true)
    }
  }

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true)
      setOnMouseEnter(false)
    }
  }

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator)

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  const { isAuthenticated, loading, isEspecialista } = useUsersContext()

  //console.log(isAuthenticated)

  const PrivateRoute = ({ children }) => {
    console.log(children)

    if (loading) {
      return <div className='loading'>Carregando...</div>
    }
    // isauth() returns true or false based on localStorage

    return isAuthenticated ? children : <Navigate to='/' />
  }

  // const PrivateRoute = ({ children }) => {
  //   console.log(children)

  //   if (loading) {
  //     return <div className='loading'>Carregando...</div>
  //   }
  //   // isauth() returns true or false based on localStorage

  //   return isAuthenticated ? children : <Navigate to='/' />
  // }

  const getRoutes = allRoutes =>
    allRoutes.map(route => {
      if (route.collapse) {
        return getRoutes(route.collapse)
      }

      if (route.route) {
        console.log('ro')
        if (isAuthenticated) {
          return (
            <Route
              path={route.route}
              element={route.component}
              key={route.key}
            />
          )
        } else {
          return null
        }
      }

      return null
    })

  const configsButton = (
    <MDBox
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='3.25rem'
      height='3.25rem'
      bgColor='white'
      shadow='sm'
      borderRadius='50%'
      position='fixed'
      right='2rem'
      bottom='2rem'
      zIndex={99}
      color='dark'
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize='small' color='inherit'>
        settings
      </Icon>
    </MDBox>
  )

  return direction === 'rtl' ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === 'dashboard' && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={
                (transparentSidenav && !darkMode) || whiteSidenav
                  ? brandUdna
                  : brandUdna
              }
              brandName='Material Dashboard 2'
              routes={user.isEspecialista ? routesEspecialistas : routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            {/* <Configurator />
            {configsButton} */}
          </>
        )}
        {layout === 'vr' && <Configurator />}
        <Routes>
          {/* {getRoutes(routes)} */}
          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
          {/* <Route
            path='/cadastro'
            element={
              <PrivateRoute>
                <CadastroB2B />
              </PrivateRoute>
            }
          />
          <Route path='/' element={<LoginB2B />} /> */}
          <Route path='/' element={<ProtectedRoutes />}>
            <Route path='/' element={<LoginB2B />}>
              <Route path='/' element={<Navigate replace to='dashboard' />} />
            </Route>
            {/* <Route path='/cadastro' element={<CadastroB2B />} /> */}
          </Route>
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === 'dashboard' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandUdna
                : brandUdna
            }
            //brandName='uDNA'
            // routes={user.isEspecialista ? routesEspecialistas  : routes}
            routes={
               routesBackoffice
                
            }
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator />
          {configsButton} */}
        </>
      )}
      {layout === 'vr' && <Configurator />}
      <ListUsersProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route
              element={
                user.isEspecialista ? <LoginEspecialistas /> : <Dashboard />
              }
              path='/dashboard'
              exact
            />
            <Route
              element={<Teleconsultas />}
              path='/teleconsultas/inicio'
              exact
            />
            <Route
              element={<AgoraCall />}
              path='/teleconsultas/chamada'
              exact
            />
            <Route element={<Usuario />} path='/backoffice/usuario' />
            <Route element={<Usuarios />} path='/backoffice/usuarios' />
            <Route element={<DashboardBack />} path='/backoffice/dashboard' />
            <Route element={<EmpresasDash />} path='/backoffice/empresas' />
            <Route element={<Profile />} path='/colaboradores' />
            <Route element={<Absenteeism />} path='/absenteismo' />
            <Route
              element={<TeleconsultasGerais />}
              path='/backoffice/teleconsultas'
              exact
            />
            <Route
              element={<ProfissionaisConsultas />}
              path='/backoffice/profissionais'
              exact
            />
            {/* <Route
              element={<SetSetores />}
              path='/backoffice/programas/incluir'
              exact
            /> */}
            <Route element={<Programas />} path='/backoffice/programas' exact />
            <Route element={<Gestao />} path='/backoffice/gestao' exact />
            {/* <Route element={<Jornada />} path='/backoffice/testes' exact /> */}

            {/* <Route element={<Products/>} path="/products"/> */}
          </Route>
          <Route
            element={
              user.isEspecialista ? <LoginEspecialistas /> : <LoginB2B />
            }
            path='/'
          />
          <Route element={<LoginEspecialistas />} path='/teleconsultas' />
          <Route element={<BackOffice />} path='/backoffice' />
          {/* <Route
            element={
              user.isEspecialista ? <LoginEspecialistas /> : <CadastroB2B />
            }
            path='/cadastro'
            exact
          />
          <Route
            element={<CadastroEspecialistas />}
            path='/cadastro/especialista'
            exact
          /> */}
          <Route element={<Tables />} path='/tables' />
          <Route path='/pagamento' element={<Billing />} />
          {/* {isAuthenticated && <Route element={<Dashboard />} path='/dashboard' exact />} */}
        </Routes>
      </ListUsersProvider>
    </ThemeProvider>
  )
}
