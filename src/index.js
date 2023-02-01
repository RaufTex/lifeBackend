import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MaterialUIControllerProvider } from './Components/BackOffice/Empresas/context'
import { BrowserRouter } from 'react-router-dom'
import Empresas from './Components/BackOffice/Empresas/Empresas'
// import { Chart, registerables } from 'chart.js'

// Chart.register(...registerables)

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter>  */}
    <MaterialUIControllerProvider>
      {/* <Empresas> */}
      <App/>
      {/* </Empresas> */}
        
      
    </MaterialUIControllerProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
)
