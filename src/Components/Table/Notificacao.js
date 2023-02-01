import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import * as AWS from 'aws-sdk'
import Divider from '@mui/material/Divider'
import { Paper } from '@mui/material'
import {
  Button,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material'
import { useUsersContext } from '../../Context/UserContext'
import axios from 'axios'

require('dotenv').config({ path: require('find-config')('.env') })
export let questions = []
export let resposta = []
export let cpfAvaliacao = []

const useStyles = makeStyles(theme => ({
  eachForm: {
    display: 'flex',
    flexDirection: 'column'
  },
  perfil: {
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    color: '#5A3D8A',
    marginTop: '5%'
  },
  titleDados: {
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '16px',
    lineHeight: '19px',
    marginBottom: '2px',
    /* identical to box height */

    color: '#535354'
  }
}))

/* const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
})); */

export default function Notificacao () {
  const [questionsClean, setQuestion] = React.useState([])
  const [uScore, setUscore] = useState([])

  const {
    rowAvaliacao,
    row,
    getQuestions,
    titleQuestions,
    answers,
    getAnswers,
    changeActive
  } = useUsersContext()
  console.log('row', row)

  const defaultValues = {
    titulo: '',
    mensagem: '',
    tokenDevice: row.tokenDevice
  }

  const defaultSetores = [
    'Setor Estresse',
    'Setor Álcool',
    'Setor Alimentação',
    'Setor Sono',
    'Setor Hidratação',
    'Setor Vitamina D',
    'Setor Tabagismo',
    'Setor Atividade Física'
  ]

  const [formValues, setFormValues] = useState(defaultValues)

  const [result, setResult] = useState([])

  console.log("form",formValues)

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  async function sendNotification (formValues) {
    const api =
        'https://fbvjt6tiaa.execute-api.us-east-1.amazonaws.com/default/triggerNotification';
    const dados = JSON.stringify({
        token: formValues.tokenDevice,
        title: formValues.titulo,
        body: formValues.mensagem
    });

    /*  console.log(dados); */

    await axios
        .get(
            api,
            { params: { data: dados } },
            {
                headers: {
                    Authorization:
                        'Bearer tfp_DYbd83AQS6EE12BR97kcvPeC8jdPAsPkcfyW3vDYJEes_3pZ6sRwQ4LDS5M',
                },
            },
        )
        .then(response => {
            //console.warn("res",response.data.fatores.L);
            console.log('res', response);
            
            
        })
        .catch(error => {
            console.log(error);
            //getActiveData('erropagamento')
        });
}

  const handleSubmit = event => {
    event.preventDefault()
    console.log(formValues)
    sendNotification(formValues)
  }

  const handleSubmitRisco = event => {
    event.preventDefault()
    console.log(formValues)
    //result.map(result => createTableFatores(rowAvaliacao.idCpf, result))

    //updateScore()
    console.log('result', result)
  }

  useEffect(() => {
    //getRespostas(rowAvaliacao.cpf, getAnswers, getQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    //updateRisco()
    console.log(rowAvaliacao)
  }, [])

  console.log(result)
  const addFator = () => {
    setFormValues(defaultValues)
    setResult([...result, formValues.fator])
  }

  const classes = useStyles()
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '#fff',
        borderRadius: '12px 12px 0px 0px',
        overflowY: 'scroll',
        height: '100%'
      }}
    >
      <Box sx={{ marginTop: '3%', marginLeft: '4%' }}>
        <span className={classes.perfil}>Notificação</span>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={4}
          padding={4}
          alignItems='center'
          justifyContent='center'
        >
          <Grid container item spacing={3}>
            <Grid sx={{ display: 'flex', flexDirection: 'column' }} item xs>
              <TextField
                id='titulo-input'
                name='titulo'
                label='Titulo'
                type='text'
                value={formValues.titulo}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid sx={{ display: 'flex', flexDirection: 'column' }} item xs>
              <TextField
                id='mensagem-input'
                name='mensagem'
                label='Mensagem'
                type='text'
                value={formValues.mensagem}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
          
          
          <Button
            sx={{
              marginTop: '8%',
              width: '74px',
              height: '27px',
              background: 'rgba(116, 76, 182, 0.19)',
              borderRadius: '5px',
              fontSize: '16px',
              color: '#744CB6',
              fontStyle: 'normal',
              fontWeight: 'normal',
              lineHeight: '19px'
            }}
            variant='contained'
            color='primary'
            type='submit'
          >
            Enviar
          </Button>
        </Grid>
      </form>
    </Box>

    /*fatores de risco e respostas*/
  )
}
