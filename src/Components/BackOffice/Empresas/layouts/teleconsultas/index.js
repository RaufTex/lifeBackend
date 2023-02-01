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
import teleconsultasTableData from '../tables/data/teleconsultasTableData'
import consultasGeraisTableData from '../tables/data/consultasGeraisTableData'

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

function getTableConsultas () {
  console.log('AHHHHH entro')
  const api = 'https://q7amrtd8t8.execute-api.us-east-1.amazonaws.com/dev/duty'
  // const dados = JSON.stringify({
  //   id: cnpj
  // })

  /*  console.log(dados); */

  axios
    .get(
      api,
      // { params: { data: dados } },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    .then(response => {
      //console.warn("res",response.data.fatores.L);
      console.log('res', response)
      // setIndicadores(response.data)
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
      console.log('errrro', error)
      //getActiveData('erropagamento')
    })
}

function Teleconsultas () {
  const { sales, tasks } = reportsLineChartData

  const { email } = useUsersContext()
  const user = {
    email: localStorage.getItem('email'),
    isBackoffice: localStorage.getItem('isBackoffice')
  }

  console.log('EMAIL LOGADO', user.email)

  const [uScore, setUscore] = useState([])
  const [indicadores, setIndicadores] = useState([])
  const [especialidade, setEspecialidade] = useState()
  const [agendamentos, getAgendamentos] = useState([])

  const { columns, rows } = teleconsultasTableData({
    agendamentos: agendamentos,
    especialidade: especialidade
  })
  // const { columns, pRows } =

  console.log('coll', rows)

  const arrayCpf = ['11444112627', '18258865714', '15275021712']

  let usuarios = []

  console.log('USCO', uScore)

  // usuarios = arrayCpf.map(array =>
  //   uScore.filter(score => score.id.S === array).map(scor => scor.doencas.L)
  // )

  let usuariosDoencas = []

  function meusPedidos () {
    pagarme.client
      .connect({ api_key: 'ak_live_AtbUQ7qSpyrFNR5ziHLYkxOQZ7txoi' })
      .then(client => client.transactions.all({ count: 10 }))
      .then(transaction => {
        console.log(transaction)
        // for(let i = 0; i < transaction.length; i++){
        //   examData.push(
        //     {
        //     cpf: transaction[i].customer.document_number === null ? transaction[i].customer.documents[0]?.number : transaction[i].customer.document_number,
        //     }
        //   )
        // }
        // console.log(examData)

        // for(let i = 0; i < transaction.length; i++){
        //   examData.push(
        //     {
        //       id: transaction[i].id,
        //       name: transaction[i].customer.name,
        //       cpf: transaction[i].customer.document_number === null ? transaction[i].customer.documents[0]?.number : transaction[i].customer.document_number,
        //       telefone: transaction[i].phone?.ddd + "-" + transaction[i].phone?.number,
        //       examId: transaction[i].id,
        //       price: transaction[i].amount,
        //       payment: transaction[i].payment_method,
        //       status: transaction[i].status,
        //       date: transaction[i].date_created,
        //       gateway: "Pagar.me",
        //       email: transaction[i].customer.email
        //     }
        //   )
        // }
        // examData.map((elem, index) => {
        //   setTimeout(() => {
        //     // do stuff function with item
        //     verifyTransaction(elem)
        //   }, 2000*index )
        //   })
      })
    // .then(client => client.transactions.all({count: 1000, status: "paid"}))
    // .then(transaction => {
    //   //console.log(transaction[0]?.date_created)
    //   for(let i = 0; i < transaction.length; i++){
    //     examData.push(
    //       {
    //         id: transaction[i].id,
    //         name: transaction[i].customer.name,
    //         cpf: transaction[i].customer.document_number,
    //         telefone: transaction[i].customer.phone_numbers,
    //         examId: transaction[i].id,
    //         price: transaction[i].amount,
    //         payment: transaction[i].payment_method,
    //         status: transaction[i].status,
    //         date: moment(transaction[i].date_created).format('DD/MM/YYYY'),
    //         gateway: "Pagar.me"
    //       }
    //     )
    //   }

    //   examData.map(elem => verifyTransaction(elem))

    // })
  }

  console.log('TesteArray', usuarios)

  console.log(
    uScore
      .map((score, index) => score)
      .filter((scor, i) => scor.id.S === arrayCpf[i])
  )

  useEffect(() => {
    // getTableScore(user.email, setEspecialidade)
    // getTableAgendamento(getAgendamentos)
    getTableConsultas()
    // meusPedidos()
  }, [])

  //const testStr = "Hello, World,\n and all you beautiful people in it!"

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* <Grid container spacing={3}>
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
        </Grid> */}

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
                    Minhas consu
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

export default Teleconsultas
