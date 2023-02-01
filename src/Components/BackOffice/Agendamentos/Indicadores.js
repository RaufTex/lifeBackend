import React, { useState, useEffect } from "react";
import { useUsersContext } from "../../../Context/UserContext";
import * as AWS from "aws-sdk";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Grid,
  Button,
  Box,
  Typography,
  Modal,
  Card,
  CardContent,
  Paper,
  IconButton
} from "@mui/material";
require('dotenv').config({ path: require('find-config')('.env') })



const useStyles = makeStyles((theme) => ({
  headerTable: {
    color: "#5A3D8A",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
  },
  rowTable: {
    fontSize: "16px",
  },
  papers: {
    width: "116px",
    height: "98px",
    background: "#FFFEFE",
    borderRadius: "12px",
    textAlign: "center",
    marginRight: '10px',
    "@media (max-width: 1300px)": {
      marginRight: '2px',
      
    }
  },
  
}));



export default function Indicadores({ children }) {
  console.log('TES', children)

  const {
    getActiveLaudo
  } = useUsersContext();

  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={0} /*sx={{ marginBottom: "23px", display: 'flex', flexDirection: "row" }}*/>
      <IconButton size="small" onClick={() => getActiveLaudo("todas")}>
        <Paper className={classes.papers}>
          <Typography
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "19px",
              color: "#535354",
              padding: "10px",
              width: "100%",
              height: "50%"

            }}
          >
            Todas
          </Typography>{" "}
          <Typography sx={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "19px",
            color: "#535354",
            marginTop: "10px"

          }}>{children.length}</Typography>
        </Paper>
      </IconButton>
      <IconButton size="small" onClick={() => getActiveLaudo("psicologo")}>
        <Paper className={classes.papers}>
          <Typography
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "19px",
              color: "#535354",
              padding: "10px",
              width: "100%",
              height: "50%"

            }}
          >
            Psicólogo
          </Typography>{" "}
          <Typography sx={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "19px",
            color: "#535354",
            marginTop: "10px"

          }}>{children.filter(row => row.tipoTeste !== 'Psicólogo').length}</Typography>
        </Paper>
      </IconButton>
      <IconButton onClick={() => getActiveLaudo("clinico")}>
        <Paper className={classes.papers}>
          <Typography
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "19px",
              color: "#535354",
              padding: "10px",
              width: "100%",
              height: "50%"
            }}
          >
            Clínico Geral
          </Typography>{" "}
          <Typography sx={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "19px",
            color: "#535354",
            marginTop: "10px"


          }}>{children.filter(row => row.tipoTeste === 'Clínico Geral').length}</Typography>
        </Paper>
      </IconButton>

      <IconButton onClick={() => getActiveLaudo("nutri")}>
        <Paper className={classes.papers}>
          <Typography
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "19px",
              color: "#535354",
              padding: "10px",
              width: "100%",
              height: "50%"
            }}
          >
           Nutricionista
          </Typography>{" "}
          <Typography sx={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "19px",
            color: "#535354",
            marginTop: "10px"

          }}>{children.filter(row => row.tipoTeste === 'Nutricionista').length}</Typography>
        </Paper>
      </IconButton>
      {/* <IconButton onClick={() => getActiveLaudo("3")}>
        <Paper className={classes.papers}>
          <Typography
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "19px",
              color: "#535354",
              padding: "10px",
              width: "100%",
              height: "50%"
            }}
          >
            Recebido
          </Typography>{" "}
          <Typography sx={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "19px",
            color: "#535354",
            marginTop: "10px"

          }}>{children.filter(row => row.status === '3').length}</Typography>
        </Paper>
      </IconButton>
      <IconButton onClick={() => getActiveLaudo("4")}>
        <Paper className={classes.papers}>
          <Typography
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "19px",
              color: "#535354",
              padding: "10px",
              width: "100%",
              height: "50%"

            }}
          >
            Envio Lab
          </Typography>{" "}
          <Typography sx={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "19px",
            color: "#535354",
            marginTop: "10px"

          }}>{children.filter(row => row.status === '4').length}</Typography>
        </Paper>
      </IconButton>
      <IconButton onClick={() => getActiveLaudo("5")}>
        <Paper className={classes.papers}>
          <Typography
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "19px",
              color: "#535354",
              padding: "10px",
              width: "100%",
              height: "50%"

            }}
          >
            Recebido Lab
          </Typography>{" "}
          <Typography sx={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "19px",
            color: "#535354",
            marginTop: "10px"

          }}>{children.filter(row => row.status === '5').length}</Typography>
        </Paper>
      </IconButton>
      <IconButton onClick={() => getActiveLaudo("6")}>
        <Paper className={classes.papers}>
          <Typography
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "19px",
              color: "#535354",
              padding: "10px",
              width: "100%",
              height: "50%"

            }}
          >
            Finalizado
          </Typography>{" "}
          <Typography sx={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "19px",
            color: "#535354",
            marginTop: "10px"

          }}>{children.filter(row => row.status === '6').length}</Typography>
        </Paper>
      </IconButton> */}
    </Grid>
  );
}
