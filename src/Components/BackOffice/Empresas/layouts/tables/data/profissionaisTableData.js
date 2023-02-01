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

function getTableUser () {
  // console.log(cpf)
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
      console.log('ITEMSUSER', data)
      // setArrayUser(data?.Items[0])
      //dados[i] = data?.Items[0]
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
  
  // useEffect(() => {
  //   getTableUser()

  // }, [])
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
  function createData (name, data, cpf, email, perfil, cellphone, tokenDevice) {
    return {
      name,
      data,
      cpf,
      email,
      perfil,
      cellphone,
      tokenDevice
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

  const rows = props?.users?.map(result => {
    return createData(
      result.name?.S,
      result.createdAt?.S,
      result.cpf?.S,
      result.email?.S,
      'info',
      result.cellphone?.S,
      result.tokenDevice?.S
    )
  })

  function handleInfoClick (row) {
    console.log(row)
    //getRow(row)
    //getTableTokenDevice(row.cpf, getTokenDevice)
    //navigate('/teleconsultas/chamada')
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

  rows?.filter(row => {
    if (props.search === '') {
      return row
    } else if (row?.cpf.includes(props.search)) {
      return row
    }
  }).filter(row => {
    if (props.searchName === '') {
      return row
    } else if (
      row?.name.toLowerCase().includes(props.searchName.toLowerCase())
    ) {
      return row
    }
  }).map((user, index) => {
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
      cpf: (
        <Author
          // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
          name={user?.cpf}
          // email={`${DataFormatter(user?.dataAgendada)} / ${
          //   user?.horarioEscolhido
          // }`}
        />
      ),
      profissional: (
        <Author
          // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
          name={user?.cpf}
          // email={`${DataFormatter(user?.dataAgendada)} / ${
          //   user?.horarioEscolhido
          // }`}
        />
      ),
      dataCriacao: (
        <Author
          // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
          name={DataFormatter(user?.data)}
          // email={`${DataFormatter(user?.dataAgendada)} / ${
          //   user?.horarioEscolhido
          // }`}
        />
      ),
      dataAgendamento: (
        <Author
          // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
          name={DataFormatter(user?.data)}
          // email={`${DataFormatter(user?.dataAgendada)} / ${
          //   user?.horarioEscolhido
          // }`}
        />
      ),
      horario: (
        <Author
          // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
          name={user?.cpf}
          // email={`${DataFormatter(user?.dataAgendada)} / ${
          //   user?.horarioEscolhido
          // }`}
        />
      ),
      profissionalEscolha: (
        <Author
          // image={`https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`}
          name={user?.email}
          // email={`${DataFormatter(user?.dataAgendada)} / ${
          //   user?.horarioEscolhido
          // }`}
        />
      ),
      finalizar: (
        <MDBox ml={-1}>
          {/* <MDBox mt={4} mb={1}> */}
          <MDButton
            variant='gradient'
            color='info'
            onClick={() => handleInfoClick(user)}
            fullWidth
          >
            criar
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
        Header: 'nome',
        accessor: 'nome',
        width: '45%',
        align: 'left'
      },
      //   { Header: 'function', accessor: 'function', align: 'left' },
      { Header: 'cpf', accessor: 'cpf', align: 'center' },
      { Header: 'profissional', accessor: 'profissional', align: 'center' },
      { Header: 'dataCriacao', accessor: 'dataCriacao', align: 'center' },
      { Header: 'dataAgendamento', accessor: 'dataAgendamento', align: 'center' }
    ],

    rows: rowsTeste
  }
}
