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
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import axios from 'axios'
// Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import Footer from '../../examples/Footer'
import MasterCard from '../../examples/Cards/MasterCard'
import DefaultInfoCard from '../../examples/Cards/InfoCards/DefaultInfoCard'
import Alert from '@mui/material/Alert'

// Billing page components
import PaymentMethod from '../../layouts/billing/components/PaymentMethod'
import Invoices from '../../layouts/billing/components/Invoices'
import BillingInformation from '../../layouts/billing/components/BillingInformation'
import Transactions from '../../layouts/billing/components/Transactions'
import MDBox from '../../components/MDBox'
import MDTypography from '../../components/MDTypography'
import Card from '@mui/material/Card'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import * as AWS from 'aws-sdk'
import absenteeismTableData from '../tables/data/absenteeismTableData'

import DataTable from '../../examples/Tables/DataTable'
import { useUsersContext } from '../../../../../Context/UserContext'

function getTableUser (cpf, setArrayUsers) {
   
  let dados = []

//   console.log(cpf)
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
    FilterExpression: 'idCpf = :a',
    TableName: 'AtestadosOperacional_2022-prd'
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
      
      dados = data?.Items[0]
      if(dados !== undefined) {
        if (dados.idCpf.S === dados.idCpf.S){
            // console.warn('entrou')
        }  
        setArrayUsers(oldArray => [...oldArray, dados])
        // console.warn('aaa', dados.faltas.S)

      } 

      
    //   console.warn('dad', dados)

      //setArrayUser(data?.Items[0])
      //setColaboradores(data?.Items[0]?.colaboradores?.L)

      //setUscore(data.Items)
    }
  })

  return dados
  //return dados;
}

function getTableEmpresas (
  email,
  setColaboradores,
  setArrayUsers,
  changeRefresh
) {
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
    //   console.log('ITEMS', data?.Items[0]?.colaboradores?.L)
      data?.Items[0]?.colaboradores?.L.map(dado =>
        getTableUser(dado.S, setArrayUsers)
      )
      setColaboradores(data?.Items[0]?.colaboradores?.L)

      //data?.Items[0]?.colaboradores?.L.map((colab,i) => getTableUser(colab.S, setColaboradores, i))
      //setColaboradores(data?.Items[0]?.colaboradores?.L)

      //setUscore(data.Items)
    }
  })
}

function getTableTeste (cpf, setArrayUsers, changeRefresh) {
  let dad = []

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
      console.log('res', response.data)

      if (response.data !== '') {
        setArrayUsers(oldArray => [...oldArray, response.data])
      }

      changeRefresh(false)
      //  setArrayUsers([...arrayUsers, response.data])
      //handleData(response.data)
      //teste = response.data
      //dad.push(response.data)
      //console.log(dad)

      //setIndicadores(response.data)
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

  //return dad
}
function getTableAtestados(setAllAtestados) {
    let awsConfig2 = {
      region: process.env.REACT_APP_LOCATION_KEY,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY,
    };
    AWS.config.update(awsConfig2);
  
    var params = {
      TableName: "AtestadosOperacional_2022-prd",
    };
  
    var dynamodb = new AWS.DynamoDB();
  
    dynamodb.scan(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        //LOCAL ADICIONADO PARA CAPTURA DOS ITEMS RETORNADOS PELO BANCO DE DADOS
        //CAPTURAR O (DATA.ITEMS) E RENDERIZAR DENTRO DE ROWS!!!!! <===========
        //PARA A CAPTURA UTILIZAR USESTATE( OU QUALQUER FATOR DE SUA PREFERENCIA)
        //NESTA FUNÇAO *ExpressionAttributeNames = RETORNA OS ATRIBUTOS DO BANCO DE DADOS QUE EU QUERO, **ExpressionAttributeValues = RECEBE O "FILTRO/PARAMETRO" UTILIZADO NA BUSCA
        // **FilterExpression = EXPRESSAO DE FILTRO, **ProjectionExpression = EXIBIÇAO DE RETORNO DOS DADOS, **TableName == TABELA DE BUSCA
        // AO CAPTURAR OS DADOS DO RETORNO DE EXPRESSAO, A RENDERIZAÇÃO ESTARA COMPLETA DESDE QUE A VARIAVEL GLOBAL DE RENDERIZAÇÅO SEJA A MESMA QUE ESTEJA RENDERIZANDO
        // REPTIR ESSE MODELO PARA TODOS OS METODOS DE RENDERIZAÇAO
        console.log(data);
        setAllAtestados(data.Items);
      }
    });
  }
function Absenteeism () {
  const user = { email: localStorage.getItem('email') }

  let teste = []

//   console.warn('emai', user.email)

  const [colaboradores, setColaboradores] = useState([])
  const [arrayUsers, setArrayUsers] = useState([])
  const [allAtestados, setAllAtestados] = useState([])

  console.log('allatesta', allAtestados)

  const { refreshCollab, changeRefresh } = useUsersContext()

//   console.log('arrayuser', arrayUsers)

//   console.log('colab', colaboradores)

//   console.log(refreshCollab)


  let array1 = arrayUsers.filter(function (a) {
    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true)
  }, Object.create(null))

  let array2 = colaboradores.filter(function (a) {
    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true)
  }, Object.create(null))
  

//   arrayUsers.filter(arr => arr.idCpf.S === arr.idCpf.S).map(array => console.log(array.faltas.S))
//   console.log('A', array1)

  const { columns, rows } = absenteeismTableData({array1: array1, all: allAtestados})

  useEffect(() => {
    getTableEmpresas(user.email, setColaboradores, setArrayUsers, changeRefresh)
    getTableAtestados(setAllAtestados)
    //meusPedidos()
  }, [refreshCollab])

  const { openModalPayment, handleModalPayment } = useUsersContext()

  return (
    <DashboardLayout>
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
                  Absenteísmo
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
      {/* <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox> */}
      <Footer />
    </DashboardLayout>
  )
}

export default Absenteeism
