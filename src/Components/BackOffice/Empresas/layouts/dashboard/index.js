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
import reportsBarChartData from '../../layouts/dashboard/data/reportsBarChartData'
import reportsLineChartData from '../../layouts/dashboard/data/reportsLineChartData'
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

function getTableScore (email, setIndicadores) {
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

function Dashboard () {
  const { sales, tasks } = reportsLineChartData

  const { email } = useUsersContext()
  const user = { email: localStorage.getItem('email') }

  console.log('EMAIL LOGADO', user.email)

  const [uScore, setUscore] = useState([])
  const [indicadores, setIndicadores] = useState([])

  const arrayCpf = ['11444112627', '18258865714', '15275021712']

  let usuarios = []

  console.log('USCO', uScore)

  usuarios = arrayCpf.map(array =>
    uScore.filter(score => score.id.S === array).map(scor => scor.doencas.L)
  )

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
    getTableScore(user.email, setIndicadores)
    meusPedidos()
  }, [])

  //const testStr = "Hello, World,\n and all you beautiful people in it!"

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {indicadores !== '' ? (
        <>
          <MDBox py={3}>
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

export default Dashboard
