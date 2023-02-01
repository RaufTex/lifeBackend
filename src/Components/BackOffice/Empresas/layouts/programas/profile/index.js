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

import react, { useState, useEffect } from 'react'
// @mui material components
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

// Material Dashboard 2 React components
import MDBox from '../../components/MDBox'
import MDTypography from '../../components/MDTypography'

// Material Dashboard 2 React example components
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import Footer from '../../examples/Footer'
import ProfileInfoCard from '../../examples/Cards/InfoCards/ProfileInfoCard'
import ProfilesList from '../../examples/Lists/ProfilesList'
import DefaultProjectCard from '../../examples/Cards/ProjectCards/DefaultProjectCard'
import * as AWS from 'aws-sdk'

// Overview page components
import Header from '../../layouts/profile/components/Header'
import PlatformSettings from '../../layouts/profile/components/PlatformSettings'

// Data
import profilesListData from '../../layouts/profile/data/profilesListData'

// Images
import homeDecor1 from '../../assets/images/home-decor-1.jpg'
import homeDecor2 from '../../assets/images/home-decor-2.jpg'
import homeDecor3 from '../../assets/images/home-decor-3.jpg'
import homeDecor4 from '../../assets/images/home-decor-4.jpeg'
import team1 from '../../assets/images/team-1.jpg'
import team2 from '../../assets/images/team-2.jpg'
import team3 from '../../assets/images/team-3.jpg'
import team4 from '../../assets/images/team-4.jpg'

import collaboratorsTableData from '../tables/data/collaboratorsTableData'

import DataTable from '../../examples/Tables/DataTable'
import { useUsersContext } from '../../../../../Context/UserContext'
import { Card } from '@mui/material'
import PaymentMethod from '../billing/components/PaymentMethod'
import InputCollaborators from './components/InputCollaborators'

import axios from 'axios'
import FormLoadingComponent from '../../../utils/FormLoading'


function getTableUser (cpf) {
  let dados = []

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
      //console.log('ITEMSUSER',data?.Items[0])
      dados = data?.Items[0]

      console.log(dados)

      //setArrayUser(data?.Items[0])
      //setColaboradores(data?.Items[0]?.colaboradores?.L)

      //setUscore(data.Items)
    }
  })

  return dados
  //return dados;
}

function getTableEmpresas (email, setColaboradores, setArrayUsers, changeRefresh) {
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
      console.log('ITEMS', data?.Items[0]?.colaboradores?.L)
      data?.Items[0]?.colaboradores?.L.map(dado =>
        getTableTeste(dado.S, setArrayUsers, changeRefresh)
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

      if(response.data !== ''){
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

function Overview () {
  const user = { email: localStorage.getItem('email') }

  let teste = []

  const [colaboradores, setColaboradores] = useState([])
  const [arrayUsers, setArrayUsers] = useState([])

  const {refreshCollab, changeRefresh} = useUsersContext()

  console.log(arrayUsers)

  console.log('colab', colaboradores)

  console.log(refreshCollab)

  let array1 = arrayUsers.filter(function (a) {
    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
  }, Object.create(null))

  console.log('A', array1)

  const { columns, rows } = collaboratorsTableData(
    array1
  )

  function handleData (dado) {
    console.log('daddd', dado)
    setArrayUsers([...arrayUsers, dado])
  }

  // colaboradores?.map(colaborador => getTableTeste(colaborador.S, setArrayUsers, arrayUsers))

  console.log('teste', teste)

  //console.log(user)

  useEffect(() => {
    getTableEmpresas(user.email, setColaboradores, setArrayUsers, changeRefresh)
    //meusPedidos()
  }, [refreshCollab])
  return (
    <DashboardLayout>
      <InputCollaborators />
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
                  Ciclo de prevenção uDNA
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {refreshCollab ? (
                    <FormLoadingComponent/>
                ) : (<DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />)}
                
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: "Alec M. Thompson",
                  mobile: "(44) 123 1234 123",
                  email: "alecthompson@mail.com",
                  location: "USA",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header> */}
      <Footer />
    </DashboardLayout>
  )
}

export default Overview
