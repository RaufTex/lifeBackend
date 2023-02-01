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

// Images
import team2 from '../../../assets/images/team-2.jpg'
import team3 from '../../../assets/images/team-3.jpg'
import team4 from '../../../assets/images/team-4.jpg'

import TextField from '@mui/material/TextField'

function getTableSchedule (cpf) {
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
    FilterExpression: 'cpf = :a',
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
      console.log('ITEMSUSER', data)
      return data.Count
      // setArrayUser(data?.Items[0])
      
      //setColaboradores(data?.Items[0]?.colaboradores?.L)

      //setUscore(data.Items)
    }
  })
}

function getAllSchedules (setSchedules) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    //
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
      setSchedules(data.Items)
      
    }
  })
}

export default function Data (props) {
  const [arrayUser, setArrayUser] = useState(null)
  const [schedules, setSchedules] = useState(null)
  console.log('POOIOP', props.userinfo)
  console.log('sche', schedules)
  
  let cpfs = []

  schedules?.map((sche,i) => cpfs[i] = sche?.cpf?.S)

  console.log('cpfs', cpfs)
  useEffect(() => {
    getAllSchedules(setSchedules)
  }, [])

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

  props
    ?.arrayUsers?.filter(row => row?.nome?.S !== 'nome')
    .filter(row => {
      if (props.userinfo.languages.includes('Score')) {
        return row?.verifyScore?.S === 'true'
      }
      else
        return row
      
    })
    .filter(row => {
      if (props.userinfo.languages.includes('Premium')) {
        return row?.verifyPremium?.S === 'true'
      }
      else
        return row
      
    })
    .filter(row => {
      if (props.userinfo.languages.includes('Consultas')) {
        return cpfs.includes(row?.idCpf?.S)
      }
      else
        return row
      
    })
    .map((user, index) => {
      return (rowsTeste[index] = {
        colaborador: <Author name={user?.nome?.S} email={user?.cpf?.S} />,
        score: (
          <MDBox ml={-1}>
            
            {user?.verifyScore?.S === 'true' ? (
              <MDBadge
                badgeContent='feito'
                color='success'
                variant='gradient'
                size='sm'
              />
            ) : (
              <MDBadge
                badgeContent='aguardando'
                color='error'
                variant='gradient'
                size='sm'
              />
            )}
          </MDBox>
        ),
        consultas: (
          <MDBox ml={-1}>
            
            {schedules.filter(sche => sche?.cpf?.S === user?.idCpf?.S).length === 1 ? (
              <MDBadge
                badgeContent='feito'
                color='success'
                variant='gradient'
                size='sm'
              />
            ) : (
              <MDBadge
                badgeContent='aguardando'
                color='error'
                variant='gradient'
                size='sm'
              />
            )}
          </MDBox>
        ),
        premium: (
          <MDBox ml={-1}>
            {user?.verifyPremium?.S === 'true' ? (
              <MDBadge
                badgeContent='feito'
                color='success'
                variant='gradient'
                size='sm'
              />
            ) : (
              <MDBadge
                badgeContent='aguardando'
                color='error'
                variant='gradient'
                size='sm'
              />
            )}
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
        Header: 'usuário',
        accessor: 'colaborador',
        width: '45%',
        align: 'left'
      },
      //   { Header: 'function', accessor: 'function', align: 'left' },
      { Header: 'score', accessor: 'score', align: 'center' },
      { Header: 'consultas', accessor: 'consultas', align: 'center' },
      { Header: 'premium', accessor: 'premium', align: 'center' }
    ],

    rows: rowsTeste
  }
}
