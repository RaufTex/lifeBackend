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

import axios from 'axios'
import { Button } from '@mui/material'

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
      //NESTA FUN??AO *ExpressionAttributeNames = RETORNA OS ATRIBUTOS DO BANCO DE DADOS QUE EU QUERO, **ExpressionAttributeValues = RECEBE O "FILTRO/PARAMETRO" UTILIZADO NA BUSCA
      // **FilterExpression = EXPRESSAO DE FILTRO, **ProjectionExpression = EXIBI??AO DE RETORNO DOS DADOS, **TableName == TABELA DE BUSCA
      // AO CAPTURAR OS DADOS DO RETORNO DE EXPRESSAO, A RENDERIZA????O ESTARA COMPLETA DESDE QUE A VARIAVEL GLOBAL DE RENDERIZA????O SEJA A MESMA QUE ESTEJA RENDERIZANDO
      // REPTIR ESSE MODELO PARA TODOS OS METODOS DE RENDERIZA??AO
      console.log('ITEMSUSER', data?.Items[0])
      // setArrayUser(data?.Items[0])
      dados[i] = data?.Items[0]
      //setColaboradores(data?.Items[0]?.colaboradores?.L)

      //setUscore(data.Items)
    }
  })
}

export default function Data (props) {
  const [arrayUser, setArrayUser] = useState(null)
  const [search, setSearch] = useState('')
  const [searchName, setSearchName] = useState('')
  console.log(props.search)

  const {
    getRow,
    getRowStatus,
    handleModal,
    agendamentos,
    getAgendamentos,
    changeActive,
    getTokenDevice,
    activeLaudo,
    getRowAvaliacao
  } = useUsersContext()
  let navigate = useNavigate()
  // function createData (
  //   nome,
  //   cpf,
  //   statusConsulta,
  //   tipoProfissional,
  //   dataAgendada,
  //   horarioEscolhido
  // ) {
  //   return {
  //     nome,
  //     cpf,
  //     statusConsulta,
  //     tipoProfissional,
  //     dataAgendada,
  //     horarioEscolhido
  //   }
  // }
  function createData (name, data, cpf, status, incluir) {
    return {
      name,
      data,
      cpf,
      status,
      incluir
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

  // const rows = props?.agendamentos?.map(result => {
  //   return createData(
  //     result.nome.S,
  //     result.cpf.S,
  //     result.statusConsulta?.S,
  //     result.tipoProfissional?.S,
  //     result.dataAgendada.S,
  //     result.horarioEscolhido.S
  //   )
  // })

  const rows = props?.score?.map(result => {
    return createData(
      result.nome.S,
      result.dataCriacao.S,
      result.cpf.S,
      result.statusSetores.S,
      'info'
    )
  })

  function handleClickRow (row) {
    console.log(row)
    getRowAvaliacao(row)
    navigate('/backoffice/programas/incluir', {state:{id:1,row: row}})
    //changeActive('incluirsetores')
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
    ?.filter(row => {
      if (props.search === '') {
        return row
      } else if (row?.cpf.includes(props.search)) {
        return row
      }
    })
    .filter(row => {
      if (props.searchName === '') {
        return row
      } else if (
        row?.name.toLowerCase().includes(props.searchName.toLowerCase())
      ) {
        return row
      }
    })
    .filter(row => row.status !== 'Conclu??do')
    .map((user, index) => {
      // console.log(user?.createdAt)
      return (rowsTeste[index] = {
        nome: (
          <Author
            // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
            name={user?.name}
            // email={`${DataFormatter(user?.dataAgendada)} / ${
            //   user?.horarioEscolhido
            // }`}
          />
        ),
        data: (
          <Author
            // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
            name={DataFormatter(user?.data)}
            // email={`${DataFormatter(user?.dataAgendada)} / ${
            //   user?.horarioEscolhido
            // }`}
          />
        ),
        cpf: (
          <Author
            // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
            name={user?.cpf}
            // email={`${DataFormatter(user?.dataAgendada)} / ${
            //   user?.horarioEscolhido
            // }`}
          />
        ),
        status: (
          <Author
            // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
            name={user?.status}
            // email={`${DataFormatter(user?.dataAgendada)} / ${
            //   user?.horarioEscolhido
            // }`}
          />
        ),
        incluir: (
          <MDBox ml={-1}>
            {/* <MDBox mt={4} mb={1}> */}
            <Button
              variant='gradient'
              // color='info'
              sx={{
                width: '74px',
                height: '27px',
                background: 'rgba(116, 76, 182, 0.19)',
                borderRadius: '5px',
                fontSize: '12px',
                color: '#744CB6',
                fontStyle: 'normal',
                fontWeight: 'normal',
                lineHeight: '19px'
              }}
              onClick={() => handleClickRow(user)}
              fullWidth
            >
              incluir
            </Button>
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
        Header: 'nome',
        accessor: 'nome',
        width: '45%',
        align: 'left'
      },
      //   { Header: 'function', accessor: 'function', align: 'left' },
      { Header: 'data', accessor: 'data', align: 'center' },
      { Header: 'cpf', accessor: 'cpf', align: 'center' },
      { Header: 'status', accessor: 'status', align: 'center' },
      { Header: 'incluir', accessor: 'incluir', align: 'center' }
    ],

    rows: rowsTeste
  }
}
