/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import react, { useEffect, useState } from 'react'
import MDBox from '../../../components/MDBox'
import MDTypography from '../../../components/MDTypography'
import MDAvatar from '../../../components/MDAvatar'
import MDBadge from '../../../components/MDBadge'

import * as AWS from 'aws-sdk'
import { useNavigate } from 'react-router-dom'

// Images
import team2 from '../../../assets/images/team-2.jpg'
import team3 from '../../../assets/images/team-3.jpg'
import team4 from '../../../assets/images/team-4.jpg'

import TextField from '@mui/material/TextField'
import DataFormatter from '../../../../utils/DataFormatter'
import MDButton from '../../../components/MDButton'
import { useUsersContext } from '../../../../../../Context/UserContext'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import axios from 'axios'

function getTableUser (cpf, dados, i) {
  console.log(cpf)
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeValues: {
      ':a': {
        S: cpf
      }
    },
    FilterExpression: 'id = :a',
    TableName: 'User-3tn77dv2gbag7ibwijizdpc7sa-prd'
  }

  var dynamodb = new AWS.DynamoDB()

  dynamodb.scan(params, function (err, data) {
    if (err) {
      console.log(err, err.stack)
    } else {
      //LOCAL ADICIONADO PARA CAPTURA DOS ITEMS RETORNADOS PELO BANCO DE DADOS
      //CAPTURAR O (DATA.ITEMS) E RENDERIZAR DENTRO DE ROWS!!!!! <===========
      //PARA A CAPTURA UTILIZAR USESTATE( OU QUALQUER FATOR DE SUA PREFERENCIA)
      //NESTA FUNÇAO *ExpressionAttributeNames = RETORNA OS ATRIBUTOS DO BANCO DE DADOS QUE EU QUERO, **ExpressionAttributeValues = RECEBE O "FILTRO/PARAMETRO" UTILIZADO NA BUSCA
      // **FilterExpression = EXPRESSAO DE FILTRO, **ProjectionExpression = EXIBIÇAO DE RETORNO DOS DADOS, **TableName == TABELA DE BUSCA
      // AO CAPTURAR OS DADOS DO RETORNO DE EXPRESSAO, A RENDERIZAÇÃO ESTARA COMPLETA DESDE QUE A VARIAVEL GLOBAL DE RENDERIZAÇÅO SEJA A MESMA QUE ESTEJA RENDERIZANDO
      // REPTIR ESSE MODELO PARA TODOS OS METODOS DE RENDERIZAÇAO
      console.log('ITEMSUSER', data?.Items[0])
      // setArrayUser(data?.Items[0])
      dados[i] = data?.Items[0]
      //setColaboradores(data?.Items[0]?.colaboradores?.L)

      //setUscore(data.Items)
    }
  })
}

function createTable (cpf, id) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      '#IP': 'idProfissional',
      
    },
    ExpressionAttributeValues: {
      ':ip': {
        S: id
      }
    },
    Key: {
      id: {
        S: cpf
      }
    },
    ReturnValues: 'ALL_NEW',
    TableName: 'AgendamentosCovid_2022_prd',
    UpdateExpression:
      'SET #IP = :ip'
  }

  var dynamodb = new AWS.DynamoDB()
  dynamodb.updateItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else console.log(data) // successful response
  })
}

export default function Data (props) {
  const [arrayUser, setArrayUser] = useState(null)

  const [especialistas, setEspecialistas] = useState(null)
  const [especialista, setEspecialista] = useState([''])
  const {
    getRow,
    getRowStatus,
    handleModal,
    agendamentos,
    getAgendamentos,
    changeActive,
    getTokenDevice,
    activeLaudo
  } = useUsersContext()
  let navigate = useNavigate()
  function createData (
    nome,
    cpf,
    statusConsulta,
    tipoProfissional,
    dataAgendada,
    horarioEscolhido
  ) {
    return {
      nome,
      cpf,
      statusConsulta,
      tipoProfissional,
      dataAgendada,
      horarioEscolhido
    }
  }

  function getTableTokenDevice (cpf, getTokenDevice) {
    const api =
      'https://fbvjt6tiaa.execute-api.us-east-1.amazonaws.com/default/getTableUser'
    const dados = JSON.stringify({
      id: cpf
    })

    /*  console.log(dados); */

    axios
      .get(
        api,
        { params: { data: dados } },
        {
          headers: {
            Authorization:
              'Bearer tfp_DYbd83AQS6EE12BR97kcvPeC8jdPAsPkcfyW3vDYJEes_3pZ6sRwQ4LDS5M'
          }
        }
      )
      .then(response => {
        //console.warn("res",response.data.fatores.L);
        console.log('res', response)
        getTokenDevice(response.data.tokenDevice?.S)
        // setDescricoes([{fatores: response.data.fatores.L.map(resp => resp.S), descricoes: response.data.descricoes.L.map(resp => resp.S)}])
        // setDescDoenca(response.data.descricaoDoenca.S)
        // setLoadingServ(true)
        //xsetAllFatores("fat",response.data.fatores.L);
        //setAllFatores(response.data)
        //setDescricoes(response.data.d)
        //   if(response.status === 200){
        //     getActiveData('pagconfirmado')
        //     createTableSchedule(props);
        //     createTableAllSchedules(userData, props);
        //   }
      })
      .catch(error => {
        console.log(error)
        //getActiveData('erropagamento')
      })
  }

  function getTableEspecialistas (setEspecialistas) {
    let awsConfig2 = {
      region: process.env.REACT_APP_LOCATION_KEY,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY
    }
    AWS.config.update(awsConfig2)

    var params = {
      TableName: 'UserProfissionais-prd'
    }

    var dynamodb = new AWS.DynamoDB()

    dynamodb.scan(params, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        //LOCAL ADICIONADO PARA CAPTURA DOS ITEMS RETORNADOS PELO BANCO DE DADOS
        //CAPTURAR O (DATA.ITEMS) E RENDERIZAR DENTRO DE ROWS!!!!! <===========
        //PARA A CAPTURA UTILIZAR USESTATE( OU QUALQUER FATOR DE SUA PREFERENCIA)
        //NESTA FUNÇAO *ExpressionAttributeNames = RETORNA OS ATRIBUTOS DO BANCO DE DADOS QUE EU QUERO, **ExpressionAttributeValues = RECEBE O "FILTRO/PARAMETRO" UTILIZADO NA BUSCA
        // **FilterExpression = EXPRESSAO DE FILTRO, **ProjectionExpression = EXIBIÇAO DE RETORNO DOS DADOS, **TableName == TABELA DE BUSCA
        // AO CAPTURAR OS DADOS DO RETORNO DE EXPRESSAO, A RENDERIZAÇÃO ESTARA COMPLETA DESDE QUE A VARIAVEL GLOBAL DE RENDERIZAÇÅO SEJA A MESMA QUE ESTEJA RENDERIZANDO
        // REPTIR ESSE MODELO PARA TODOS OS METODOS DE RENDERIZAÇAO
        // setConsultas(data.Count)
        setEspecialistas(data.Items)
        console.log(data.Items)
      }
    })
  }

  useEffect(() => {
    getTableEspecialistas(setEspecialistas)
  }, [])

  const rows = props?.agendamentos?.map(result => {
    return createData(
      result.nome.S,
      result.cpf.S,
      result.statusConsulta?.S,
      result.tipoProfissional?.S,
      result.dataAgendada.S,
      result.horarioEscolhido.S
    )
  })

  console.log('esppp', especialista)

  function handleInput (e, index) {
    console.log('test', e)
    let newArr = [...especialista]
    const { name, value } = e.target

    newArr[index] = value
    setEspecialista(value)
    // console.log('index', index)
    
    // const { name, value } = e.target

    // 

    setEspecialista(newArr)
  }

  function handleInfoClick (row, index) {
    console.log(row)
    if (especialista !== ''){
      console.log('TTTTT', especialista[index])
      createTable(row.cpf, especialista[index])
    } 
    // getRow(row)
    // getTableTokenDevice(row.cpf, getTokenDevice)
    // navigate('/teleconsultas/chamada')
    // changeActive('menuatendimento')
  }
  console.log(
    'POOIOP',
    props?.agendamentos?.filter(
      user => user?.tipoProfissional?.S === props.especialidade
    )
  )

  const Author = ({ image, name, email }) => (
    <MDBox display='flex' alignItems='center' lineHeight={1}>
      <MDAvatar src={image} name={name} size='sm' />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display='block' variant='button' fontWeight='medium'>
          {name}
        </MDTypography>
        <MDTypography variant='caption'>{email}</MDTypography>
      </MDBox>
    </MDBox>
  )

  let rowsTeste = []

  rows
    ?.filter(row => row?.statusConsulta === 'confirmado')

    .map((user, index) => {
      return (rowsTeste[index] = {
        colaborador: (
          <Author
            image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
            name={user?.nome}
            email={`${DataFormatter(user?.dataAgendada)} / ${
              user?.horarioEscolhido
            }`}
          />
        ),
        score: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent='feito'
              color='success'
              variant='gradient'
              size='sm'
            />
          </MDBox>
        ),
        consultas: (
          <MDBox ml={-1}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              {/* <InputLabel id='programa'>Programa</InputLabel> */}
              <Select
                sx={{ padding: '8px 0.75rem!important' }}
                key={index}
                name='esopecialista'
                label='Especialista'
                value={especialista[index]}
                onChange={event => handleInput(event, index)}
                required
              >
                {especialistas
                  ?.map(esp => {
                    return (
                      <MenuItem key={esp.id.S} value={esp.id.S}>
                        {esp.nome.S}
                      </MenuItem>
                    )
                  })
                  .sort()}
              </Select>
            </FormControl>
          </MDBox>
        ),
        prof: (
          <MDBox ml={-1}>
            {/* <MDBox mt={4} mb={1}> */}
            <MDButton
              variant='gradient'
              color='info'
              onClick={() => handleInfoClick(user, index)}
              fullWidth
            >
              atribuir
            </MDButton>
            {/* </MDBox> */}
          </MDBox>
        )
      })
    })

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign='left'>
      <MDTypography
        display='block'
        variant='caption'
        color='text'
        fontWeight='medium'
      >
        {title}
      </MDTypography>
      <MDTypography variant='caption'>{description}</MDTypography>
    </MDBox>
  )

  return {
    columns: [
      {
        Header: 'paciente - data/hora',
        accessor: 'colaborador',
        width: '45%',
        align: 'left'
      },
      //   { Header: 'function', accessor: 'function', align: 'left' },
      { Header: 'score', accessor: 'score', align: 'center' },
      {
        Header: 'selecionar profissional',
        accessor: 'consultas',
        align: 'center'
      },
      {
        Header: 'atribuir profissional',
        accessor: 'prof',
        align: 'center'
      }
    ],

    rows: rowsTeste
  }
}
