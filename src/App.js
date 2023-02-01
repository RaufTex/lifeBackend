import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { useMediaQuery } from 'react-responsive'
import './App.css'
import { ListUsersProvider } from './Context/UserContext'
import Empresas from './Components/BackOffice/Empresas/Empresas'

/* const isMobileDevice = useMediaQuery({
  query: "(min-device-width: 480px)",
});

const isTabletDevice = useMediaQuery({
  query: "(min-device-width: 768px)",
});

const isLaptop = useMediaQuery({
  query: "(min-device-width: 1024px)",
});

const isDesktop = useMediaQuery({
  query: "(min-device-width: 1200px)",
});

const isBigScreen = useMediaQuery({
  query: "(min-device-width: 1201px )",
}); */

function App () {
  return (
    <Router>
      <ListUsersProvider>
        <Empresas>
          <Routes />
        </Empresas>
      </ListUsersProvider>
    </Router>
  )
}

export default App
