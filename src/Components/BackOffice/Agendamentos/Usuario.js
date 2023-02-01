import React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import UserTable from "../../Table/UserTable";
import IconMenu from "../Menu/Menu";
import UserForm from "./Perfil";
import { useUsersContext } from "../../../Context/UserContext";
import Respostas from "../Respostas/Respostas";
import Ursula from "../../Table/Ursula";
import Jornada from "../Jornada/Jornada";
import Avaliacoes from "../../Table/Avaliacoes";
import NewUser from "../Jornada/NewUser"
import AgoraCall from "../AgoraCall/AgoraCall";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "#fff",
  },
  leftBox: {
    width: "20%",
  },
  rightBox: {
    width: "80%",
    height: "100vh",
    backgroundColor: "#F4F4F4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tableUser: {
    width: "95%",
    height: "533px",
    marginBottom: '20%'
  },
  imgLogo: {
    width: 102,
    height: 29,
    marginTop: 71,
    marginLeft: 27,
  },
  titleBack: {
    marginLeft: 27,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    /* identical to box height */

    color: "#535354",
  },
}));

export default function Usuario() {
  const { active } = useUsersContext();

  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Box className={classes.leftBox}>
        <Stack>
          <img
            src="/images/uDNA_logo_extenso_roxo.svg"
            alt="logo"
            className={classes.imgLogo}
          />
          <span className={classes.titleBack}>backoffice</span>
          <IconMenu />
        </Stack>
        
      </Box>
      <Box className={classes.rightBox}>
        <Box className={classes.tableUser}>

          {active === "usuarios" && <UserTable />}
          {active === "menuavaliacoes" && <Avaliacoes />}
          {active === "perfil" && <UserForm />} 
          {active === "respostas" && <Respostas />}
          {active === "jornada" && <Jornada/>}
          {active === "newuser" &&  <NewUser/>}
          {active === "menuatendimento" && <AgoraCall/>}

          
        </Box>
      </Box>
    </Box>
  );
}

/* import React, { useState } from "react";
import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        width: '100%',
        height: '100vh',
        backgroundColor: '#fff'
    }
  }));


export default function Usuario() {
    const classes = useStyles();
    return (
        <Box className={classes.main}>
            <div><span>TESTE</span></div>


        </Box>
    )

}     */
