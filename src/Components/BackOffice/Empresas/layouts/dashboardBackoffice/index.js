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

import Grid from '@mui/material/Grid'
import React, { useState, useEffect } from 'react'
// Material Dashboard 2 React components
import MDBox from '../../components/MDBox'
import MDTypography from '../../components/MDTypography'
import pagarme from 'pagarme'
// Material Dashboard 2 React example components
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import DefaultInfoCard from '../../examples/Cards/InfoCards/DefaultInfoCard'
import Footer from '../../examples/Footer'
import ReportsBarChart from '../../examples/Charts/BarCharts/ReportsBarChart'
import ReportsLineChart from '../../examples/Charts/LineCharts/ReportsLineChart'
import ComplexStatisticsCard from '../../examples/Cards/StatisticsCards/ComplexStatisticsCard'

// Data
import reportsBarChartData from '../dashboard/data/reportsBarChartData'
import reportsLineChartData from '../dashboard/data/reportsLineChartData'
import * as AWS from 'aws-sdk'

// Dashboard components
import Projects from './components/Projects'
import OrdersOverview from './components/OrdersOverview'

import icon1 from '../../assets/images/Vector.png'
import icon2 from '../../assets/images/saude.png'
import icon3 from '../../assets/images/Star.png'
import icon4 from '../../assets/images/GroupFat.png'

import axios from 'axios'
import Tables from '../tables'
import { useUsersContext } from '../../../../../Context/UserContext'
import { Card, Box } from '@mui/material'
import DataTable from '../../examples/Tables/DataTable'
import doencasTableData from '../tables/data/doencasTableData'
import fatoresTableData from '../tables/data/fatoresTableData'
import _, { map } from 'underscore'
function getTableScoreIndi (email, setIndicadores) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeValues: {
      ':a': {
        S: email
      }
    },
    FilterExpression: 'email = :a',
    TableName: 'Empresas_B2B-prd'
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
      console.log(data?.Items[0]?.cnpj?.S)
      getTableIndicadores(data?.Items[0]?.cnpj?.S, setIndicadores)
      //setUscore(data.Items)
    }
  })
}

function getTableIndicadores (cnpj, setIndicadores) {
  const api =
    'https://fbvjt6tiaa.execute-api.us-east-1.amazonaws.com/default/getTableIndicadores'
  const dados = JSON.stringify({
    id: cnpj
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
      console.log('res', response.data)
      setIndicadores(response.data)
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

function getData (getUsers) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      '#AT': 'name',
      '#ST': 'createdAt',
      '#CPF': 'cpf',
      '#email': 'email',
      '#fone': 'cellphone',
      '#tokenDevice': 'tokenDevice'
    },
    ExpressionAttributeValues: {
      ':a': {
        BOOL: false
      }
    },
    FilterExpression: 'nutritionalProfile = :a',
    ProjectionExpression: '#ST, #AT, #CPF, #email, #fone, #tokenDevice',
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
      getUsers(data.Items)
      //console.log(data.Items)
    }
  })
}

function getTableTimeline (setTotalUsers, setUscoreUnico) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'timelineTypeformApp-prd'
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
      setTotalUsers(data.Count)
      setUscoreUnico(data.Items)
      console.log(data.Items)
    }
  })
}

function getTableScoreHistory (setTotalScore) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'Score_History_User-prd'
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
      setTotalScore(data.Count)
      console.log(data.Items)
    }
  })
}

function getAllTableFatores (setAllFatores) {
  console.log('entrouuuu')
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'Fatores_History_User-prd'
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
      setAllFatores(data.Items)
    }
  })
}
function getTableScoreAllHistory (setUscoreHistory) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'Score_History_User-prd'
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
      // setActiveScore(data.Count)
      setUscoreHistory(data.Items)
    }
  })
}

function getTableScore (setActiveScore, setUscore) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
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
      setActiveScore(data.Count)
      setUscore(data.Items)
    }
  })
}

function createTableScoreHistory (fator) {
  console.log('TESTESSS', fator)
  const random = Math.floor(Math.random() * 65536)
  const data = new Date()
  //console.log(result)
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      '#CPF': 'cpf',
      '#F': 'fatores',
      '#DC': 'dataCriacao'
    },
    ExpressionAttributeValues: {
      ':c': {
        S: fator.id.S
      },

      ':f': {
        L: fator.Fatores.L
      },
      ':empty_list': { L: [] },

      ':dc': {
        S: data.toString()
      }
    },
    Key: {
      id: {
        S: random.toString()
      }
    },
    ReturnValues: 'ALL_NEW',
    TableName: 'Fatores_History_User-prd',
    UpdateExpression:
      'SET #CPF = :c, #F = list_append(if_not_exists(#F, :empty_list), :f), #DC = :dc'
  }

  var dynamodb = new AWS.DynamoDB()

  dynamodb.updateItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else {
      console.log('FINAL', data)
      //setFinalizadoScore(true)
      //getTableScore()
    } // successful response
  })
}
function getTableConsultas (setConsultas) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'Horarios_Agendamento_2022_prd'
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
      setConsultas(data.Count)
      console.log(data.Items)
    }
  })
}

function DashboardBack () {
  const { sales, tasks } = reportsLineChartData

  const { email, getUsers, users } = useUsersContext()
  const user = { email: localStorage.getItem('email') }

  // console.log('EMAIL LOGADO', users)

  const [uScore, setUscore] = useState([])
  const [uScoreHistory, setUscoreHistory] = useState([])
  const [indicadores, setIndicadores] = useState([])
  const [totalUsers, setTotalUsers] = useState(null)
  const [totalScore, setTotalScore] = useState(null)
  const [activeScore, setActiveScore] = useState(null)
  const [consultas, setConsultas] = useState(null)
  const [uscoreUnico, setUscoreUnico] = useState(null)
  const [allFatores, setAllFatores] = useState(null)

  // console.log('all', allFatores)
  // allFatores.map(fator => createTableScoreHistory(fator))

  function handleCreate () {
    allFatores?.map(fator => createTableScoreHistory(fator))
  }

  // console.log('unico', uscoreUnico?.filter(uscore => uscore.actualScore?.S !== '0').length)

  useEffect(() => {
    getTableTimeline(setTotalUsers, setUscoreUnico)
    getTableScoreHistory(setTotalScore)
    getTableScoreAllHistory(setUscoreHistory)
    getTableScore(setActiveScore, setUscore)
    getTableConsultas(setConsultas)
    getAllTableFatores(setAllFatores)
  }, [])

  const arrayCpf = ['11444112627', '18258865714', '15275021712']

  let usuarios = []
  let fatores = []

  allFatores?.map(
    (score, index) =>
    //   console.log(
    //     index,
    //     _.uniq(score.fatores.L.map((sco, index) => sco.S.split('_')[0]))
    //   )
    fatores.push(..._.uniq(score.fatores.L.map((sco, index) => sco.S.split('_')[0])))
  )

  let ordenadoHistory = uScoreHistory
    .sort(function (a, b) {
      return (
        new Date(b.dataCriacao.S).getTime() -
        new Date(a.dataCriacao.S).getTime()
      )
    })
    .filter(us => us.cpf.S)

  const uniqueUFList = ordenadoHistory.filter((currentUser, index) => {
    return (
      ordenadoHistory.findIndex(user => user.cpf.S === currentUser.cpf.S) ===
      index
    )
  })

  // console.log('USCO', uniqueUFList)

  uniqueUFList.map((score, index) =>
    usuarios.push(
      ...score.doencas.L.map((sco, index) => ({
        // id: index,
        doenca: sco.M.nome.S,
        risco: sco.M.risco.S,
        fatores: sco.M.fatores.S.split('-')
      }))
    )
  )
  //let array = []

  const array = fatores.filter((currentUser, index) => {
    return fatores.findIndex(user => user === currentUser) === index
  })
  // uniqueUFList.map((score, index) =>

  //   fatores[index] = score.doencas.L.map(sco => sco.M.fatores.S.split('-'))
  // )

  // uniqueUFList.map((score, index) =>
  //   fatores.push(
  //     ...score.doencas.L.filter((currentUser, index) => {
  //       return (
  //         score.doencas.L.findIndex(user => user.M.fatores.S.split('-') === currentUser.M.fatores.S.split('-')) ===
  //         index
  //       )
  //     })
  //   )
  // )
  const test = [
    'Privação do sono',
    'Histórico familiar de Obesidade',
    'Sedentarismo',
    'Avós, tios ou primos com Diabetes',
    'Estresse',
    'Ganho de peso progressivo',
    'Histórico familiar de HAS',
    'Consumo excessivo de sal',
    'Irregularmente ativo B',
    'Circunferência da cintura aumentada',
    'Baixa exposição solar',
    'Distúrbios do sono',
    'Fritura, açúcar ou industrializados',
    'Baixo consumo de B1, B9 e/ou B12 (B1)',
    'Baixo consumo de Zinco',
    'Baixo consumo do mineral Cobre',
    'Baixo consumo de Vitamina C',
    'Baixo consumo do mineral Selênio',
    'Baixo consumo de Vitamina D',
    'Mobilidade reduzida',
    'Intolerância à lactose',
    'Doença Celíaca (DC)',
    'Disbioses intestinais',
    'Ansiedade',
    'Compulsão Alimentar Periódica (TCAP)',
    'Ascendência europeia',
    'Histórico de trauma na infância',
    'Baixa ingestão de água',
    'Irregularmente ativo A',
    'Consumo de álcool em excesso',
    'Dieta pobre em antioxidantes',
    'Baixo consumo de B1, B9 e/ou B12 (B9)',
    'Fritura, açúcar ou industrializados (açúcar)',
    'Exposição à agentes tóxicos',
    '≤ 25 anos',
    'Fritura, açúcar ou industrializados (ultraprocessados)',
    'Fritura, açúcar ou industrializados (frituras)',
    'Sobrepeso',
    'Dislipidemias (níveis alterados de colesterol e triglicerídeos)',
    'Doenças intestinais',
    'Infecções precoces',
    'Excesso de gorduras saturadas',
    'Uso precoce de antibióticos',
    'Tabagismo',
    'Dieta baixa em alimentos in natura',
    'Uso de antiulcerosos',
    'Histórico familiar de IL',
    'Histórico familiar de TEV',
    'Ex-tabagista',
    'Baixo consumo de B1, B9 e/ou B12 (B12)',
    'Baixo consumo de proteínas',
    'Ascendências',
    'Pais, irmãos ou filhos com Diabetes',
    'Consumo regular de gorduras saturadas',
    'Baixo consumo de alimentos ricos em Zinco',
    'Maus hábitos alimentares',
    'Infecções gastrointestinais',
    'Depressão',
    'Uso de medicação para pressão alta',
    'Histórico familiar de TCAP',
    'Uso de glicorticoides',
    'Diabetes tipo 1',
    'IMC >28',
    'Medicamentos',
    'Obesidade',
    'Hipovitaminose D',
    'Terapia hormonal atual',
    'Obesidade na infância',
    'Síndrome de ovários policísticos',
    'Hipovitaminose B',
    'Histórico familiar de IAM',
    'Estresse Oxidativo',
    'Grupo sanguíneo',
    'Composição corporal',
    'Presença de varizes',
    'Baixo consumo de B1, B9 e/ou B12',
    'Baixo consumo de vitamina D',
    'Ascendência afro-americana',
    'Imobilização',
    'Uso de antibióticos na infância',
    'Uso periódico/recorrente de antibióticos',
    'Pacientes bariátricos pelo método Bypass gástrico',
    'Quimioterapia/ Radioterapia',
    'Distúrbios da tireoide',
    'Infecção pelo HIV',
    'Uso de antirretrovirais',
    'Infecções virais crônicas',
    'Uso de anticoncepcional',
    'Gravidez',
    'Parto',
    'Menopausa',
    'Episódios de forte estresse',
    'Exposição a agentes tóxicos',
    'Pobre ingestão alimentar de fontes de vitamina B12',
    'Síndrome do Intestino Irritável (SII)',
    'Hipotireoidismo',
    'Câncer',
    'Tratamentos para câncer',
    'Diabetes Mellitus Gestacional',
    'Parto prematuro',
    'Dislipidemias',
    'Climatério',
    'Uso de suplementação com hormônios andrógenos'
  ]

  // console.log('TESFAT', fatores.filter(props => props === 'Privação do sono').length)
  let finalPorcentagemFatores = []

  // console.log('FATTT', fatores.filter(fat => fat === 'Estresse'))

  test.map(
    (test, index) =>
      (finalPorcentagemFatores[index] = {
        fator: test,
        porcentagem: (
          (fatores.filter(props => props === test).length * 100) /
          allFatores?.length
        ).toFixed(2)
      })
  )

  // console.log('TESTTTYT ', finalPorcentagemFatores)

  // usuarios.map(usuario => usuario.fatores
  //       .filter(usuar => usuar !== ' ')
  //       .filter(usua => usua !== '  ')
  //       .filter(usu => usu !== 'Sem Fator')
  //       .map((us, index) => console.log(index, us.trim()))
  //   )

  // usuarios.map(usuario =>
  //   fatores.push(
  //   ...usuario.fatores
  //     // .filter(usu => usu !== ' ' || usu !== '   ' || usu !== 'Sem Fator' || usu !== '' || usu !== " ")
  //     .map(us => us.trim()))
  // )

  // uniqueUFList.map((score, index) =>
  //   score.doencas.L.map(sco => fatores.push(...sco.M.fatores.S.split('-')))
  // )

  // console.log('fatttt', fatores.filter(fat => fat !== 'Sem Fator').filter(fa => fa !== ' ').filter(f => f !== "   "))

  // console.log('FFF', tromb.toFixed(2))

  let finalPorcentagem = [
    {
      doenca: 'Tromboembolismo venoso (TEV)',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Tromboembolismo venoso (TEV)')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Tromboembolismo venoso (TEV)'
        ).length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Tromboembolismo venoso (TEV)')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Tromboembolismo venoso (TEV)'
        ).length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Tromboembolismo venoso (TEV)')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Tromboembolismo venoso (TEV)'
        ).length
      ).toFixed(2)
    },
    {
      doenca: 'Hipovitaminose D',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Hipovitaminose D')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Hipovitaminose D').length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Hipovitaminose D')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Hipovitaminose D').length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Hipovitaminose D')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Hipovitaminose D').length
      ).toFixed(2)
    },
    {
      doenca: 'Intolerância à lactose',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Intolerância à lactose')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Intolerância à lactose')
          .length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Intolerância à lactose')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Intolerância à lactose')
          .length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Intolerância à lactose')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Intolerância à lactose')
          .length
      ).toFixed(2)
    },
    {
      doenca: 'Obesidade',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Obesidade')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Obesidade').length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Obesidade')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Obesidade').length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Obesidade')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Obesidade').length
      ).toFixed(2)
    },
    {
      doenca: 'Disfunção Endotelial',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Disfunção Endotelial')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Disfunção Endotelial').length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Disfunção Endotelial')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Disfunção Endotelial').length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Disfunção Endotelial')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Disfunção Endotelial').length
      ).toFixed(2)
    },
    {
      doenca: 'Hipovitaminose B',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Hipovitaminose B')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Hipovitaminose B').length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Hipovitaminose B')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Hipovitaminose B').length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Hipovitaminose B')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Hipovitaminose B').length
      ).toFixed(2)
    },
    {
      doenca: 'Transtorno de Compulsão Alimentar Periódica (TCAP)',
      baixo: (
        (usuarios
          .filter(
            props =>
              props.doenca ===
              'Transtorno de Compulsão Alimentar Periódica (TCAP)'
          )
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(
          props =>
            props.doenca ===
            'Transtorno de Compulsão Alimentar Periódica (TCAP)'
        ).length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(
            props =>
              props.doenca ===
              'Transtorno de Compulsão Alimentar Periódica (TCAP)'
          )
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(
          props =>
            props.doenca ===
            'Transtorno de Compulsão Alimentar Periódica (TCAP)'
        ).length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(
            props =>
              props.doenca ===
              'Transtorno de Compulsão Alimentar Periódica (TCAP)'
          )
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(
          props =>
            props.doenca ===
            'Transtorno de Compulsão Alimentar Periódica (TCAP)'
        ).length
      ).toFixed(2)
    },
    {
      doenca: 'Hipertensão Arterial Sistêmica (HAS)',
      baixo: (
        (usuarios
          .filter(
            props => props.doenca === 'Hipertensão Arterial Sistêmica (HAS)'
          )
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Hipertensão Arterial Sistêmica (HAS)'
        ).length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(
            props => props.doenca === 'Hipertensão Arterial Sistêmica (HAS)'
          )
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Hipertensão Arterial Sistêmica (HAS)'
        ).length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(
            props => props.doenca === 'Hipertensão Arterial Sistêmica (HAS)'
          )
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Hipertensão Arterial Sistêmica (HAS)'
        ).length
      ).toFixed(2)
    },
    {
      doenca: 'Infarto Agudo do Miocárdio (IAM)',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Infarto Agudo do Miocárdio (IAM)')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Infarto Agudo do Miocárdio (IAM)'
        ).length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Infarto Agudo do Miocárdio (IAM)')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Infarto Agudo do Miocárdio (IAM)'
        ).length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Infarto Agudo do Miocárdio (IAM)')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Infarto Agudo do Miocárdio (IAM)'
        ).length
      ).toFixed(2)
    },
    {
      doenca: 'Insuficiência Cardíaca (IC)',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Insuficiência Cardíaca (IC)')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Insuficiência Cardíaca (IC)')
          .length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Insuficiência Cardíaca (IC)')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Insuficiência Cardíaca (IC)')
          .length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Insuficiência Cardíaca (IC)')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Insuficiência Cardíaca (IC)')
          .length
      ).toFixed(2)
    },
    {
      doenca: 'Doença Hepática Gordurosa Não Alcoólica (DHGNA)',
      baixo: (
        (usuarios
          .filter(
            props =>
              props.doenca === 'Doença Hepática Gordurosa Não Alcoólica (DHGNA)'
          )
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(
          props =>
            props.doenca === 'Doença Hepática Gordurosa Não Alcoólica (DHGNA)'
        ).length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(
            props =>
              props.doenca === 'Doença Hepática Gordurosa Não Alcoólica (DHGNA)'
          )
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(
          props =>
            props.doenca === 'Doença Hepática Gordurosa Não Alcoólica (DHGNA)'
        ).length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(
            props =>
              props.doenca === 'Doença Hepática Gordurosa Não Alcoólica (DHGNA)'
          )
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(
          props =>
            props.doenca === 'Doença Hepática Gordurosa Não Alcoólica (DHGNA)'
        ).length
      ).toFixed(2)
    },
    {
      doenca: 'Diabetes Mellitus tipo 2 e resistência à insulina',
      baixo: (
        (usuarios
          .filter(
            props =>
              props.doenca ===
              'Diabetes Mellitus tipo 2 e resistência à insulina'
          )
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(
          props =>
            props.doenca === 'Diabetes Mellitus tipo 2 e resistência à insulina'
        ).length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(
            props =>
              props.doenca ===
              'Diabetes Mellitus tipo 2 e resistência à insulina'
          )
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(
          props =>
            props.doenca === 'Diabetes Mellitus tipo 2 e resistência à insulina'
        ).length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(
            props =>
              props.doenca ===
              'Diabetes Mellitus tipo 2 e resistência à insulina'
          )
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(
          props =>
            props.doenca === 'Diabetes Mellitus tipo 2 e resistência à insulina'
        ).length
      ).toFixed(2)
    },
    {
      doenca: 'Doença celíaca (DC)',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Doença celíaca (DC)')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Doença celíaca (DC)').length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Doença celíaca (DC)')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Doença celíaca (DC)').length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Doença celíaca (DC)')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Doença celíaca (DC)').length
      ).toFixed(2)
    },
    {
      doenca: 'Inflamação Crônica Sistêmica (ICS)',
      baixo: (
        (usuarios
          .filter(
            props => props.doenca === 'Inflamação Crônica Sistêmica (ICS)'
          )
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Inflamação Crônica Sistêmica (ICS)'
        ).length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(
            props => props.doenca === 'Inflamação Crônica Sistêmica (ICS)'
          )
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Inflamação Crônica Sistêmica (ICS)'
        ).length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(
            props => props.doenca === 'Inflamação Crônica Sistêmica (ICS)'
          )
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(
          props => props.doenca === 'Inflamação Crônica Sistêmica (ICS)'
        ).length
      ).toFixed(2)
    },
    {
      doenca: 'Dislipidemias',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Dislipidemias')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Dislipidemias').length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Dislipidemias')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Dislipidemias').length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Dislipidemias')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Dislipidemias').length
      ).toFixed(2)
    },
    {
      doenca: 'Aterosclerose',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Aterosclerose')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Aterosclerose').length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Aterosclerose')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Aterosclerose').length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Aterosclerose')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Aterosclerose').length
      ).toFixed(2)
    },
    {
      doenca: 'Aterosclerose',
      baixo: (
        (usuarios
          .filter(props => props.doenca === 'Aterosclerose')
          .filter(prop => prop.risco === '1').length *
          100) /
        usuarios.filter(props => props.doenca === 'Aterosclerose').length
      ).toFixed(2),
      moderado: (
        (usuarios
          .filter(props => props.doenca === 'Aterosclerose')
          .filter(prop => prop.risco === '2').length *
          100) /
        usuarios.filter(props => props.doenca === 'Aterosclerose').length
      ).toFixed(2),
      alto: (
        (usuarios
          .filter(props => props.doenca === 'Aterosclerose')
          .filter(prop => prop.risco === '3').length *
          100) /
        usuarios.filter(props => props.doenca === 'Aterosclerose').length
      ).toFixed(2)
    }
  ]

  const { columns, rows } = doencasTableData(finalPorcentagem)
  // const { pColumns,pRows } = fatoresTableData(finalPorcentagemFatores)
  const { columns: pColumns, rows: pRows } = fatoresTableData(
    finalPorcentagemFatores
  )

  // usuarios = arrayCpf.map(array =>
  //   uScore.filter(score => score.id.S === array).map(scor => scor.doencas.L)
  // )

  // let usuariosDoencas = []

  // console.log('TesteArray', usuarios)

  // console.log(
  //   uScore
  //     .map((score, index) => score)
  //     .filter((scor, i) => scor.id.S === arrayCpf[i])
  // )

  useEffect(() => {
    // getTableScore(user.email, setIndicadores)
    // meusPedidos()
    getData(getUsers)
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <button onClick={() => handleCreate()}>TESSS</button> */}
      {indicadores !== '' ? (
        <>
          <MDBox py={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    // color="dark"
                    icon={icon1}
                    title='Total Usuários'
                    count={totalUsers}
                    // percentage={{
                    //   color: "success",
                    //   amount: "+55%",
                    //   label: "than lask week",
                    // }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon={icon2}
                    title='Total uScore Únicos'
                    count={
                      uscoreUnico?.filter(
                        uscore => parseInt(uscore.actualScore?.S) > 0
                      ).length
                    }
                    // percentage={{
                    //   color: "success",
                    //   amount: "+3%",
                    //   label: "than last month",
                    // }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    // color="success"
                    icon={icon3}
                    title='Total uScore Ativos'
                    count={activeScore}
                    // percentage={{
                    //   color: "success",
                    //   amount: "+1%",
                    //   label: "than yesterday",
                    // }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    // color="primary"
                    icon={icon4}
                    title='Total uScore'
                    count={totalScore}
                    // percentage={{
                    //   color: "success",
                    //   amount: "",
                    //   label: "Just updated",
                    // }}
                  />
                </MDBox>
              </Grid>
            </Grid>

            <MDBox pt={6} pb={3}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Card>
                    <MDBox
                      mx={2}
                      mt={-3}
                      py={3}
                      px={2}
                      variant='contained'
                      bgColor='#EFE9FF'
                      borderRadius='lg'
                      coloredShadow='info'
                    >
                      <MDTypography variant='h6' color='#5A3D8A'>
                        Doenças
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={3}>
                      <DataTable
                        table={{ columns, rows }}
                        isSorted={true}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </MDBox>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <MDBox
                      mx={2}
                      mt={-3}
                      py={3}
                      px={2}
                      variant='contained'
                      bgColor='#EFE9FF'
                      borderRadius='lg'
                      coloredShadow='info'
                    >
                      <MDTypography variant='h6' color='#5A3D8A'>
                        Fatores
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={3}>
                      <DataTable
                        table={{ columns: pColumns, rows: pRows }}
                        isSorted={true}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </MDBox>
            {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
            {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
          </MDBox>
        </>
      ) : (
        <>
          <MDBox
            display='flex'
            alignItems='center'
            lineHeight={1}
            opacity={1.5}
            zIndex={1}
            position='absolute'
            mt='10%'
            width='100%'
            marginLeft='2%'
            marginRight='2%'
          >
            <Card>
              <MDBox pb={2} px={2} textAlign='center' lineHeight={1.25}>
                <Box sx={{ marginTop: '91px' }}></Box>
                <MDTypography
                  variant='caption'
                  fontWeight='700'
                  // mt={2}
                  fontSize={36}
                  marginBottom='17px'
                  marginTop='91px'
                  sx={{ color: '#744CB6' }}
                  //textTransform='capitalize'
                >
                  Bem-vindo ao{' '}
                  <span sx={{ fontWeight: 'bold' }}>dashboard</span> da sua
                  empresa!
                </MDTypography>
                <MDBox
                  display='flex'
                  flexDirection='column'
                  justifyContent='center'
                >
                  <MDTypography
                    mt={2}
                    variant='caption'
                    color='text'
                    fontWeight='regular'
                    fontSize={26}
                    marginBottom='71px'
                  >
                    Para realizar o diagnóstico de fatores de risco, siga os 4
                    passos abaixo:
                  </MDTypography>

                  <Grid container spacing={2} justifyContent='center'>
                    <Grid
                      item
                      direction='column'
                      alignItems='center'
                      justifyContent='center'
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img src='/images/number1.png' width={58} />
                        <Box sx={{ marginTop: '19px' }}></Box>
                        <img src='/images/passo1.png' width={246} />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img src='/images/number2.png' width={58} />
                        <Box sx={{ marginTop: '19px' }}></Box>
                        <img src='/images/passo2.png' width={246} />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img src='/images/number3.png' width={58} />
                        <Box sx={{ marginTop: '19px' }}></Box>
                        <img src='/images/passo3.png' width={246} />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img src='/images/number4.png' width={58} />
                        <Box sx={{ marginTop: '19px' }}></Box>
                        <img src='/images/passo4.png' width={246} />
                      </Box>
                    </Grid>
                  </Grid>

                  <MDTypography
                    mt={2}
                    variant='caption'
                    color='text'
                    fontWeight='regular'
                    fontSize={26}
                    marginTop='67px'
                    marginBottom='86px'
                  >
                    Pronto! Agora é só aguardar as informações serem enviadas
                    para o seu dashboard.
                  </MDTypography>

                  {/* <MDTypography
                    mt={2}
                    variant='caption'
                    color='text'
                    fontWeight='regular'
                  >
                    Entre em contato com a nossa equipe através do chat e envie
                    os CPFs de cada colaborador.
                  </MDTypography>

                  <MDTypography
                    mt={2}
                    variant='caption'
                    color='text'
                    fontWeight='regular'
                  >
                    Aguarde as informações serem enviadas para o seu dashboard.
                  </MDTypography> */}
                </MDBox>
              </MDBox>
              {/* <MDBox p={2} mx={3} display="flex" justifyContent="center">
        <MDBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="4rem"
          height="4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </MDBox>
      </MDBox> */}
            </Card>
          </MDBox>
          <MDBox py={3} opacity={0.3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    // color="dark"
                    icon={icon1}
                    title='Colaboradores'
                    count={indicadores?.numColab?.S}
                    // percentage={{
                    //   color: "success",
                    //   amount: "+55%",
                    //   label: "than lask week",
                    // }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon={icon2}
                    title='NP'
                    count={indicadores?.nivelPrev?.S}
                    // percentage={{
                    //   color: "success",
                    //   amount: "+3%",
                    //   label: "than last month",
                    // }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    // color="success"
                    icon={icon3}
                    title='NA'
                    count={indicadores?.nivelAut?.S}
                    // percentage={{
                    //   color: "success",
                    //   amount: "+1%",
                    //   label: "than yesterday",
                    // }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    // color="primary"
                    icon={icon4}
                    title='Total de fatores de risco'
                    count={indicadores?.qtdTotal?.S}
                    // percentage={{
                    //   color: "success",
                    //   amount: "",
                    //   label: "Just updated",
                    // }}
                  />
                </MDBox>
              </Grid>
            </Grid>

            <Tables indicadores={indicadores} />
            {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
            {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
          </MDBox>
        </>
      )}

      <Footer />
    </DashboardLayout>
  )
}

export default DashboardBack
