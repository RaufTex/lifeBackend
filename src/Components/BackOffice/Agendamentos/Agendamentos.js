import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'

import { makeStyles } from '@mui/styles'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import * as AWS from 'aws-sdk'
import { useUsersContext } from '../../../Context/UserContext'
import DataFormatter from '../utils/DataFormatter'
import _, { map } from 'underscore';
import Indicadores from './Indicadores'
require('dotenv').config({ path: require('find-config')('.env') })
function createTableScore (result) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      '#CPF': 'cpf',
      '#D': 'doencas',
      '#F': 'fatores',
      '#R': 'risco'
    },
    ExpressionAttributeValues: {
      ':c': {
        S: '11444112627'
      },
      ':d': {
        L: [{ S: result }]
      },
      ':f': {
        L: [{ S: 'fatores' }]
      },
      ':r': {
        S: 'teste'
      }
    },
    Key: {
      id: {
        S: '11444112627'
      }
    },
    ReturnValues: 'UPDATED_NEW',
    TableName: 'Score_BI_UDNA_2022',
    UpdateExpression:
      'SET #CPF = :c, #D = list_append(#D, :d), #F = list_append(#F, :f),#R = :r'
  }

  var dynamodb = new AWS.DynamoDB()
  dynamodb.updateItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else console.log(data) // successful response
  })
}

// function createTableScoreDoencas(result) {
//   console.log(result)

//   //console.log(result)
//   let awsConfig2 = {
//     region: process.env.REACT_APP_LOCATION_KEY,
//     accessKeyId: process.env.REACT_APP_ACCESS_KEY,
//     secretAccessKey: process.env.REACT_APP_SECRET_KEY,
//   };
//   AWS.config.update(awsConfig2);

//   var params = {
//     ExpressionAttributeNames: {
//       "#CPF": "cpf",
//       "#D": "doencas",

//     },
//     ExpressionAttributeValues: {
//       ":c": {

//         S: "12345678910"

//       },
//       ":d": {
//         L: [{ S: result }]
//       },
//       ":empty_list":{"L":[]}

//     },
//     Key: {
//       id: {
//         S: "12345678910",
//       },
//     },
//     ReturnValues: "ALL_NEW",
//     TableName: "Score_BI_UDNA_2022",
//     UpdateExpression:
//     "SET #CPF = :c, #D = list_append(if_not_exists(#D, :empty_list), :d)",

//   };

//   var dynamodb = new AWS.DynamoDB();

//   dynamodb.updateItem(params, function (err, data) {
//     if (err) console.log(err, err.stack);
//     // an error occurred
//     else console.log(data); // successful response
//   });

// }

function getTableAllFatores () {
  console.warn('entrou')
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'DoencasOperacional_UDNA_2022'
  }

  var dynamodb = new AWS.DynamoDB()

  dynamodb.scan(params, function (err, data) {
    if (err) {
      console.warn(err, err.stack)
    } else {
      //LOCAL ADICIONADO PARA CAPTURA DOS ITEMS RETORNADOS PELO BANCO DE DADOS
      //CAPTURAR O (DATA.ITEMS) E RENDERIZAR DENTRO DE ROWS!!!!! <===========
      //PARA A CAPTURA UTILIZAR USESTATE( OU QUALQUER FATOR DE SUA PREFERENCIA)
      //NESTA FUNÇAO *ExpressionAttributeNames = RETORNA OS ATRIBUTOS DO BANCO DE DADOS QUE EU QUERO, **ExpressionAttributeValues = RECEBE O "FILTRO/PARAMETRO" UTILIZADO NA BUSCA
      // **FilterExpression = EXPRESSAO DE FILTRO, **ProjectionExpression = EXIBIÇAO DE RETORNO DOS DADOS, **TableName == TABELA DE BUSCA
      // AO CAPTURAR OS DADOS DO RETORNO DE EXPRESSAO, A RENDERIZAÇÃO ESTARA COMPLETA DESDE QUE A VARIAVEL GLOBAL DE RENDERIZAÇÅO SEJA A MESMA QUE ESTEJA RENDERIZANDO
      // REPTIR ESSE MODELO PARA TODOS OS METODOS DE RENDERIZAÇAO
      console.warn(data)
      //getVendas(data.Items);
    }
  })
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

function createTableScoreDoencas (doenca, fatores) {
  const data = new Date()

  const array = fatores?.split('-')
  const arrayDupli = _.uniq(array)
  console.log('aray', array)
  console.log('arraydupli', arrayDupli)
  let result = '';

  arrayDupli.map(arr => {
    result += `${arr} - `

  })



   console.log('testeFatores', result)
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      '#CPF': 'cpf',
      '#D': 'doencas',
      '#N': 'nome',
      '#SE': 'setores',
      '#SSE': 'statusSetores',
      '#DC': 'dataCriacao'
    },
    ExpressionAttributeValues: {
      ':c': {
        S: '11444112627'
      },
      ':d': {
        L: [
          {
            M: {
              nome: { S: doenca },
              fatores: { S: fatores ? result : 'Sem Fator' },
              risco: { S: 'nothing' }
            }
          }
        ]
      },
      ':empty_list': { L: [] },
      ':n': {
        S: 'nome'
      },
      ':sse': {
        S: 'Pendente'
      },
      ':se': {
        L: [
          {
            M: {
              s1: { S: '' },
              s2: { S: '' },
              s3: { S: '' },
              s4: { S: '' },
              s5: { S: '' },
              s6: { S: '' },
              s7: { S: '' },
              s8: { S: '' }
            }
          }
        ]
      },

      ':dc': {
        S: data.toString()
      }
      // ":f": {
      //    L: [{ S: "Teste Fator" }]
      // },

      // ":d": {
      //   L: [{ M: {":n" : {S: "TesteNome"}, ":f" :{L: [{ S: "Teste Fator" }]}, ":r": {S: "TesteRisco"} } }]
      // },
    },
    Key: {
      id: {
        S: '11444112627'
      }
    },
    ReturnValues: 'ALL_NEW',
    TableName: 'Score_BI_UDNA_2022',
    UpdateExpression:
      'SET #CPF = :c, #D = list_append(if_not_exists(#D, :empty_list), :d), #N = :n, #SSE = :sse, #SE = :se, #DC = :dc'
  }

  var dynamodb = new AWS.DynamoDB()

  dynamodb.updateItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else console.log(data) // successful response
  })
}

function getTableScore (setUscore) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    // ExpressionAttributeValues: {
    //   ":a": {
    //     S: "09965891710"
    //   },
    // },
    // FilterExpression: "id = :a",
    TableName: 'Score_BI_UDNA_2022'
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
      console.log(data)
      setUscore(data.Items)
    }
  })
}

function getTableFatores (setFatores) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeValues: {
      ':a': {
        S: '11444112627'
      }
    },
    FilterExpression: 'id = :a',
    TableName: 'fatoresUsersAnalise2022-prdVix'
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
      console.log(data)
      setFatores(data.Items)
    }
  })
}

function getTableDoencas (setDoencas) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    // ExpressionAttributeValues: {
    //   ":a": {
    //     S: "09965891710"
    //   },
    // },
    // FilterExpression: "id = :a",
    TableName: 'DoencasOperacional_UDNA_2022'
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
      console.log(data)
      setDoencas(data.Items)
    }
  })
}

function getTableAgendamento (getAgendamentos) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'AgendamentosCovid_2022_prd'
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
      console.log(data)
      getAgendamentos(data.Items)
    }
  })
}

function createTable () {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      '#Nome': 'nome',
      '#TEL': 'telefone',
      '#C': 'cpf',
      '#E': 'email',
      '#S': 'sexo',
      '#DN': 'dataNascimento'
    },
    ExpressionAttributeValues: {
      ':n': {
        S: 'Teste'
      },
      ':t': {
        S: 'nothing'
      },
      ':c': {
        S: '12345678910'
      },
      ':e': {
        S: 'nothing'
      },
      ':s': {
        S: 'nothing'
      },
      ':dn': {
        S: 'nothing'
      }
    },
    Key: {
      id: {
        S: '12345678910'
      }
    },
    ReturnValues: 'ALL_NEW',
    TableName: 'AgendamentosCovid_2022_prd',
    UpdateExpression:
      'SET #Nome = :n, #TEL = :t, #C = :c,#E = :e,#S = :s, #DN = :dn'
  }

  var dynamodb = new AWS.DynamoDB()
  dynamodb.updateItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else console.log(data) // successful response
  })
}

function createData (
  nomeFirst,
  nomeSecond,
  telefone,
  cpf,
  email,
  sexo,
  tipoTeste,
  idTeste,
  dataCriacao,
  dataAgendada,
  horarioEscolhido,
  endereco,
  statusConsulta,
  motivo
) {
  return {
    nomeFirst,
    nomeSecond,
    telefone,
    cpf,
    email,
    sexo,
    tipoTeste,
    idTeste,
    dataCriacao,
    dataAgendada,
    horarioEscolhido,
    endereco,
    statusConsulta,
    motivo
  }
}

function deleteItem () {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    Key: {
      id: {
        S: '09965891710'
      }
    },

    TableName: 'AgendamentosCovid_2022_prd'
  }

  var dynamodb = new AWS.DynamoDB()
  dynamodb.deleteItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else console.log(data) // successful response
  })
}

function updateData () {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      /* "#DC": "dataCriacao",
      "#DA": "dataAgendada" */
      '#NomeSecond': 'nomeSecond',
      '#END': 'endereco'
    },
    ExpressionAttributeValues: {
      /* ":dc": {
        S: "nothing",
      },
      ":da": {
        S: "nothing",
      }, */
      ':ns': {
        S: 'nothing'
      },
      ':end': {
        S: 'nothing'
      }
    },
    Key: {
      id: {
        S: '50449838889'
      }
    },
    ReturnValues: 'ALL_NEW',
    TableName: 'AgendamentosCovid_2022_prd',
    UpdateExpression: 'SET #NomeSecond = :ns, #END = :end'
  }

  var dynamodb = new AWS.DynamoDB()
  dynamodb.updateItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else {
      console.log(data)
      alert('Status alterado com sucesso!')
    } // successful response
  })
}

const useStyles = makeStyles(theme => ({
  headerTable: {
    color: '#5A3D8A',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px'
  },
  rowTable: {
    fontSize: '16px'
  }
}))

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort (array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis?.map(el => el[0])
}

const headCells = [
  {
    id: 'nome',
    numeric: false,
    disablePadding: true,
    label: 'Nome'
  },
  // {
  //   id: "nomeSecond",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Nome Participante 2 (DNA)",
  // },
  {
    id: 'telefone',
    numeric: false,
    disablePadding: true,
    label: 'Telefone'
  },
  {
    id: 'cpf',
    numeric: false,
    disablePadding: true,
    label: 'CPF'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'E-Mail'
  },

  {
    id: 'tipoTeste',
    numeric: false,
    disablePadding: true,
    label: 'Profissional'
  },
  {
    id: 'idTeste',
    numeric: false,
    disablePadding: true,
    label: 'ID do Teste'
  },
  {
    id: 'dataRealizado',
    numeric: false,
    disablePadding: true,
    label: 'Data da criação'
  },
  {
    id: 'dataAgendada',
    numeric: false,
    disablePadding: true,
    label: 'Data Agendada'
  },
  {
    id: 'horarioEscolhido',
    numeric: false,
    disablePadding: true,
    label: 'Horário'
  },
  {
    id: 'motivo',
    numeric: false,
    disablePadding: true,
    label: 'Motivo'
  },

  {
    id: 'sala',
    numeric: false,
    disablePadding: false,
    label: 'Sala'
  }
]

function EnhancedTableHead (props) {
  const classes = useStyles()
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }
  return (
    <TableHead sx ={{display: "contents"}}>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={classes.headerTable}
              sx={{ color: '#5A3D8A' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const EnhancedTableToolbar = props => {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            flex: '1 1 100%',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: ''
          }}
          variant='h6'
          id='tableTitle'
          component='div'
        ></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

export default function Agendamentos () {
  const [search, setSearch] = useState('')
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [doencas, setDoencas] = useState([])
  const [fatores, setFatores] = useState([])
  const [uScore, setUscore] = useState([])
  const [objeto, setObjeto] = useState([])
  const testeArray = 'testando a (logica)';

  console.log(testeArray.split('(')[0].trim())
  console.log(objeto)

  console.log('USCORE', uScore)

  // uScore?.map(score => {
  //   for(let i = 0; i< score.doencas.L.length; i++){
  //     console.log(`${score.doencas.L[i].S} - ${score.fatores.L[i].SS}` )
  //   }

  // }
  //   )

  const result = [{}]
  const resultD = []
  const data = []
  const teste = 'teste'
  console.log('resultado', result)

  console.log('doencas', doencas)
  //console.log("fatores", fatores[0]?.Fatores.L.length);

  doencas?.map((doen, index) => {
    //console.log("DOENCA", doen.nome);
    result[index] = { doenca: doen.nome.S }

    for (let i = 0; i < doen.fatores.L.length; i++) {
      for (let j = 0; j < fatores[0]?.Fatores.L.length; j++) {
        if (doen.fatores.L[i].S === fatores[0]?.Fatores.L[j].S.split('(')[0].trim()) {
          result[index].fatores += `${doen.fatores.L[i].S}-`
        }
      }
    }
  })

  console.log('doenca', result)
  //console.log("fatores", resultD)
  // const response = []
  // result.map(result => {
  //   let i = 0;
  //   response.push(result.split("-")[0]);

  // })
  // console.log(response)

  function createTeste () {
    result?.map(resultado =>
      createTableScoreDoencas(
        resultado.doenca,
        resultado.fatores?.split('undefined')[1]
      )
    )
    //createTableScoreDoencas()
    // for (let i = 0; i < result.length; i++) {
    //   createTableScoreDoencas(result[i])
    // }
  }

  // for (let i = 0; i < fatores[0]?.Fatores.L.length; i++) {
  //   //console.log("FATORES", fatores[0]?.Fatores.L[i].S);
  //   doencas?.map((doen, index) => {
  //     //console.log("DOENCA", doen.nome);
  //     console.log("DOENCA", doen.nome);
  //     for (let j = 0; j < doen.fatores.L.length; j++) {

  //       //console.log("FATORESDOENCAS", doen.fatores.L[j].S)

  //       if (fatores[0]?.Fatores.L[i].S === doen.fatores.L[j].S) {

  //         console.log("FATOR: ", doen.fatores.L[j])
  //         //console.log(`${fatores[0]?.Fatores.L[i].S} --- ${doen.fatores.L[j].S}`)
  //       }
  //       //  if(doen.nome.S === "Hipersão Arterial Sistêica (HAS)")
  //       //    {
  //       // console.log("DOENCA", doen.nome);
  //       // console.log(doen.fatores.L[j])
  //       //     }

  //     }
  //   })
  // }

  // fatores?.map((fator, i) => {
  //   console.log(fator.Fatores.L)
  // })

  // doencas?.map((doen, index) => {
  //   console.log("DOENCA", doen.nome)
  //   for(let i=0; i<doen.fatores.L.length; i++ )
  //   {
  //     console.log(doen.fatores.L[i])
  //   }

  // })

  // fatores?.map((fatores, index) => (
  //   result = doencas?.map((doen, i) => doen.)
  // ))

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

  const [anchorEl, setAnchorEl] = React.useState(null)

  console.log('agend', agendamentos)

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    getTableFatores(setFatores)
    getTableDoencas(setDoencas)
    getTableAgendamento(getAgendamentos)
    getTableScore(setUscore)
    getTableAllFatores()
    /* deleteItem() */
    // updateData()
  }, [])

  function handleInfoClick (row) {
    getRow(row)
    getTableTokenDevice(row.cpf, getTokenDevice)

    changeActive('menuatendimento')
  }

  const rows = agendamentos.map(result => {
    return createData(
      result.nome.S,
      result.nomeSecond.S,
      result.telefone.S,
      result.cpf.S,
      result.email.S,
      result.sexo.S,
      result.tipoProfissional?.S,
      result.idTeste.S,
      result.dataCriacao.S,
      result.dataAgendada.S,
      result.horarioEscolhido.S,
      result.endereco.S,
      result.statusConsulta?.S,
      result.motivo?.S
    )
  })

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <>
      {/* <button onClick={() => createTeste()}>PRESS</button> */}
      <Box sx={{ width: '100%' }}>
      <Indicadores>{rows}</Indicadores>
        <Paper sx={{ width: '100%' }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <Box
            sx={{ display: 'flex', flexDirection: 'row', marginBottom: '2%' }}
          >
            <Typography
              sx={{
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '',
                marginLeft: '5%'
              }}
              variant='h6'
              id='tableTitle'
              component='div'
            >
              Agendamentos
            </Typography>
            <Box sx={{ marginLeft: '10%' }}>
              <TextField
                sx={{ width: '274px' }}
                id='outlined-search'
                label='Pesquise pelo cpf'
                type='search'
                size='small'
                onChange={event => {
                  setSearch(event.target.value)
                }}
              />
            </Box>
          </Box>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
              size='medium'
            >
              <EnhancedTableHead
                key={rows}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
       rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .filter((row) => {
                    if (activeLaudo === "todas") {
                      return row;

                    }
                    if (activeLaudo === "psicologo") {
                      return row.tipoTeste?.includes("Psicólogo");
                    }
                    if (activeLaudo === "clinico") {
                      return row.tipoTeste?.includes("Clínico Geral");
                    }
                    if (activeLaudo === "nutri") {
                      return row.tipoTeste?.includes("Nutricionista");
                    }

                  })
                  .filter(row => {
                    if (search === '') {
                      return row
                    } else if (row.cpf.includes(search)) {
                      return row
                    }
                  })
                  .filter(row => row.statusConsulta === 'confirmado')
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name)
                    const labelId = `enhanced-table-checkbox-${index}`
                    return (
                      <>
                        <TableRow
                          hover
                          /* onClick={(event) => handleClick(event, row.name)} */
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.nome}
                          selected={isItemSelected}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              onClick={event => handleClick(event, row.name)}
                              color='primary'
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component='th'
                            id={labelId}
                            scope='row'
                            padding='none'
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                          >
                            {row.nomeFirst}
                          </TableCell>
                          {/* <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            sx={{
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: "16px",
                              lineHeight: "19px",
                              color: "#535354",
                            }}
                          >
                            {row.nomeSecond}
                          </TableCell> */}
                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            {row.telefone}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            {row.cpf}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            {row.email}
                          </TableCell>

                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            {row.tipoTeste}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            {row.idTeste}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            {DataFormatter(row.dataCriacao)}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            {DataFormatter(row.dataAgendada)}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            {row.horarioEscolhido}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            {row.motivo}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '19px',
                              color: '#535354'
                            }}
                            align='left'
                          >
                            <Button
                              sx={{
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
                              onClick={() => handleInfoClick(row)}
                            >
                              Criar
                            </Button>
                          </TableCell>
                          {/* <TableCell
                            sx={{
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: "16px",
                              lineHeight: "19px",
                              color: "#535354",
                            }}
                            align="left"
                          >
                            <div>
                              <Button
                                id="basic-button"
                  
                                sx={{
                                  width: "74px",
                                  height: "27px",
                                  background: "rgba(116, 76, 182, 0.19)",
                                  borderRadius: "5px",
                                  fontSize: "16px",
                                  color: "#744CB6",
                                  fontStyle: "normal",
                                  fontWeight: "normal",
                                  lineHeight: "19px",
                                }}
                                variant="contained"
                                onClick={() => handleClickUpload( row)}
                              >
                                Ações
                              </Button>
                              {openModal === true && <ModalInfo />}
                              {openModalUpload === true && <ModalUpload />}
                            </div>
                          </TableCell> */}
                        </TableRow>
                      </>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='Páginas'
          />
        </Paper>
      </Box>
    </>
  )
}
