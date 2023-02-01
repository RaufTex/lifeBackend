import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import PaternityPage from "./Components/PaternityPage/PaternityPage";
import BackOffice from "./Components/BackOffice/BackOffice";
import Usuario from "./Components/BackOffice/Usuario/Usuario";
import Ursula from "./Components/Ursula/Ursula";
import { useUsersContext } from "./Context/UserContext";
//import Vendas from "./Components/BackOffice/Vendas/Vendas";
//import Agendamentos from "./Components/BackOffice/Agendamentos/Agendamentos";
import Schedules from "./Components/Schedules/Schedules";
import SchedulesTest from "./Components/ScheduleTest/SchedulesTest";
//import AutoTeste from "./Components/AutoTeste/AutoTeste";


export default function MainRoutes() {
  const {isAuthenticated, loading} =  useUsersContext();

  console.log(isAuthenticated)

  const PrivateRoute = ({ children }) => {

    console.log(children)
    
    if (loading){
        return <div className="loading">Carregando...</div>
    }
     // isauth() returns true or false based on localStorage
    
    return isAuthenticated ? children : <Navigate to="/backoffice" />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teste-paternidade" element={<PaternityPage />} />
       <Route path="/backoffice" element={<BackOffice />} /> 
      <Route exact path="/backoffice/usuario" element={<Usuario />} />
      <Route path="/avaliacao-ursula" element={<Ursula />} />
      <Route path="/teste" element={<PrivateRoute><h1>teste</h1></PrivateRoute>} />
      {/* <Route path="/tabela" element={<PrivateRoute><Vendas /></PrivateRoute>}/> */}
      {/* <Route path="/teste-agendamento" element={<Agendamentos />} /> */}
      <Route path="/agendamentos" element={<Schedules />} />
      <Route path="/pagamento" element={<SchedulesTest />} />
      {/*<Route path="/auto-teste-covid-19" element={<AutoTeste/>} />*/}
      
    </Routes>
  );
}
