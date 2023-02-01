import Tables from './layouts/tables'
import Billing from './layouts/billing'
import RTL from './layouts/rtl'
import Notifications from './layouts/notifications'
import Profile from './layouts/profile'
import SignIn from './layouts/authentication/sign-in'
import SignUp from './layouts/authentication/sign-up'
import LoginB2B from '../LoginB2B/Login'
import LoginEspecialistas from '../LoginEspecialistas/Login'
import { green } from '@mui/material/colors'

// @mui icons
import Icon from '@mui/material/Icon'
// import Dashboard from "./layouts/dashboard";

// import CadastroB2B from '../CadastroB2B/CadastroB2B'
// import Dashboard from '../Dashboard/Dashboard'
import { useUsersContext } from '../../../Context/UserContext'
import Absenteeism from './layouts/absenteeism'
import Teleconsultas from './layouts/teleconsultas'
import DashboardBack from './layouts/dashboardBackoffice'
import Usuarios from './layouts/usuarios'
import Empresas from './layouts/empresas'
import BackOffice from '../BackOffice'
import Programas from './layouts/programas'
import Gestao from './layouts/gestao'
// import Jornada from '../Jornada/Jornada'
import TeleconsultasGerais from './layouts/teleconsultasGerais'

// const { isAuthenticated, loading } = useUsersContext()

// console.log('isAut', isAuthenticated)

const routes = [
  // {
  //   type: 'collapse',
  //   name: 'Dashboard',
  //   key: 'dashboard',
  //   icon: (
  //     <Icon fontSize='small' sx={{ color: '#7A8386' }}>
  //       dashboard
  //     </Icon>
  //   ),
  //   route: '/backoffice/dashboard',
  //   component: <DashboardBack />
  // },
  // {
  //   type: 'collapse',
  //   name: 'Usuarios',
  //   key: 'usuarios',
  //   icon: (
  //     <Icon fontSize='small' sx={{ color: '#7A8386' }}>
  //       groups
  //     </Icon>
  //   ),
  //   route: '/backoffice/usuarios',
  //   component: <Usuarios />
  // },
  // {
  //   type: 'collapse',
  //   name: 'Testes DNA',
  //   key: 'testes',
  //   icon: (
  //     <Icon fontSize='small' sx={{ color: '#7A8386' }}>
  //       bloodtype
  //     </Icon>
  //   ),
  //   route: '/backoffice/testes',
  //   component: <Jornada />
  // },
  // {
  //   type: 'collapse',
  //   name: 'Empresas',
  //   key: 'empresas',
  //   icon: (
  //     <Icon fontSize='small' sx={{ color: '#7A8386' }}>
  //       receipt_long
  //     </Icon>
  //   ),
  //   route: '/backoffice/empresas',
  //   component: <Empresas />
  // },
  // {
  //   type: 'collapse',
  //   name: 'Programas',
  //   key: 'programas',
  //   icon: (
  //     <Icon fontSize='small' sx={{ color: '#7A8386' }}>
  //       event_note
  //     </Icon>
  //   ),
  //   route: '/backoffice/programas',
  //   component: <Programas />
  // },
  // {
  //   type: 'collapse',
  //   name: 'Profissionais de Saúde',
  //   key: 'profissionais',
  //   icon: (
  //     <Icon fontSize='small' sx={{ color: '#7A8386' }}>
  //       diversity_3
  //     </Icon>
  //   ),
  //   route: '/backoffice/profissionais',
  //   component: <TeleconsultasGerais />
  // },
  {
    type: 'collapse',
    name: 'Teleconsultas',
    key: 'teleconsultas',
    icon: (
      <Icon fontSize='small' sx={{ color: '#7A8386' }}>
        personal_video
      </Icon>
    ),
    route: '/backoffice/teleconsultas',
    component: <Teleconsultas />
  },
  // {
  //   type: 'collapse',
  //   name: 'Gestão de Saúde',
  //   key: 'gestao',
  //   icon: (
  //     <Icon fontSize='small' sx={{ color: '#7A8386' }}>
  //       local_hospital
  //     </Icon>
  //   ),
  //   route: '/backoffice/gestao',
  //   component: <Gestao />
  // },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Dashboard />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },

  {
    //type: "collapse",
    name: 'Sign In',
    key: 'sign-in',
    icon: <Icon fontSize='small'>login</Icon>,
    route: '/authentication/sign-in',
    component: <SignIn />
  },
  // {
  //   //type: "collapse",
  //   name: 'Sign Up',
  //   key: 'sign-up',
  //   icon: <Icon fontSize='small'>assignment</Icon>,
  //   route: '/cadastro',
  //   component: <CadastroB2B />
  // },

  {
    type: 'collapse',
    name: 'Logout',
    key: 'logout',
    icon: (
      <Icon fontSize='small' sx={{ color: '#7A8386' }}>
        logout
      </Icon>
    ),
    route: '/backoffice',
    component: <BackOffice />
  }
]

export default routes
