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

// @mui material components

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
import FormLoadingComponent from '../../../utils/FormLoading'
import empresasTableData from '../tables/data/empresasTableData'



function getTableScore (email, setEspecialidade) {
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
    TableName: 'EspecialistasWeb-prd'
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
      console.log(data?.Items[0]?.especialidade?.S)
      setEspecialidade(data?.Items[0]?.especialidade?.S)
      // getTableIndicadores(data?.Items[0]?.cnpj?.S, setIndicadores)
      //setUscore(data.Items)
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
function getTableEmpresas (setEmpresas) {
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
      console.log(data)
      setEmpresas(data.Items)
    }
  })
}
function EmpresasDash () {
  const { sales, tasks } = reportsLineChartData

  const { email, getUsers, users } = useUsersContext()
  const user = { email: localStorage.getItem('email') }

  console.log('EMAIL LOGADO', user.email)

  const [uScore, setUscore] = useState([])
  const [indicadores, setIndicadores] = useState([])
  const [especialidade, setEspecialidade] = useState()
  const [agendamentos, getAgendamentos] = useState([])
  const [empresas, setEmpresas] = useState([])

  

  const arrayCpf = ['11444112627', '18258865714', '15275021712']

  let usuarios = []

  console.log('USCO', uScore)

  usuarios = arrayCpf.map(array =>
    uScore.filter(score => score.id.S === array).map(scor => scor.doencas.L)
  )

  let usuariosDoencas = []

 

  console.log('TesteArray', usuarios)

  console.log(
    uScore
      .map((score, index) => score)
      .filter((scor, i) => scor.id.S === arrayCpf[i])
  )

  useEffect(() => {
    getTableScore(user.email, setEspecialidade)
    getTableAgendamento(getAgendamentos)
    getData(getUsers)
    getTableEmpresas(setEmpresas)
    // meusPedidos()
  }, [])

  const { columns, rows } = empresasTableData({agendamentos: agendamentos, especialidade: especialidade, empresas: empresas})

  //const testStr = "Hello, World,\n and all you beautiful people in it!"

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>

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
                    Empresas
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
          </Grid>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  )
}

export default EmpresasDash
