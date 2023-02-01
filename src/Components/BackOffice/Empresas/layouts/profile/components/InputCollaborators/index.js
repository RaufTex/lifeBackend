// /**
// =========================================================
// * Material Dashboard 2 React - v2.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2022 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */
// import React, { useState, useEffect } from 'react'
// // @mui material components
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Icon from '@mui/material/Icon'
// import Tooltip from '@mui/material/Tooltip'

// // Material Dashboard 2 React components
// // import MDBox from "components/MDBox";
// import MDTypography from '../../../../components/MDTypography'
// import MDButton from '../../../../components/MDButton'
// // Images
// import masterCardLogo from '../../../../assets/images/logos/mastercard.png'
// import visaLogo from '../../../../assets/images/logos/visa.png'

// // Material Dashboard 2 React context
// import { useMaterialUIController } from '../../../../context'
// import MDBox from '../../../../components/MDBox'
// import MDInput from '../../../../components/MDInput'
// import MaskedInput from '../../../../../CadastroB2B/MaskedInput'



// import * as AWS from 'aws-sdk'
// import { useUsersContext } from '../../../../../../../Context/UserContext'
// const defaultValues = {
//   cpf: ''
// }

// function getTableCnpj (email, setCnpj) {
//   let awsConfig2 = {
//     region: process.env.REACT_APP_LOCATION_KEY,
//     accessKeyId: process.env.REACT_APP_ACCESS_KEY,
//     secretAccessKey: process.env.REACT_APP_SECRET_KEY
//   }
//   AWS.config.update(awsConfig2)

//   var params = {
//     ExpressionAttributeValues: {
//       ':a': {
//         S: email
//       }
//     },
//     FilterExpression: 'email = :a',
//     TableName: 'Empresas_B2B-prd'
//   }

//   var dynamodb = new AWS.DynamoDB()

//   dynamodb.scan(params, function (err, data) {
//     if (err) {
//       console.log(err, err.stack)
//     } else {
//       //LOCAL ADICIONADO PARA CAPTURA DOS ITEMS RETORNADOS PELO BANCO DE DADOS
//       //CAPTURAR O (DATA.ITEMS) E RENDERIZAR DENTRO DE ROWS!!!!! <===========
//       //PARA A CAPTURA UTILIZAR USESTATE( OU QUALQUER FATOR DE SUA PREFERENCIA)
//       //NESTA FUNÇAO *ExpressionAttributeNames = RETORNA OS ATRIBUTOS DO BANCO DE DADOS QUE EU QUERO, **ExpressionAttributeValues = RECEBE O "FILTRO/PARAMETRO" UTILIZADO NA BUSCA
//       // **FilterExpression = EXPRESSAO DE FILTRO, **ProjectionExpression = EXIBIÇAO DE RETORNO DOS DADOS, **TableName == TABELA DE BUSCA
//       // AO CAPTURAR OS DADOS DO RETORNO DE EXPRESSAO, A RENDERIZAÇÃO ESTARA COMPLETA DESDE QUE A VARIAVEL GLOBAL DE RENDERIZAÇÅO SEJA A MESMA QUE ESTEJA RENDERIZANDO
//       // REPTIR ESSE MODELO PARA TODOS OS METODOS DE RENDERIZAÇAO
//       console.log(data?.Items[0]?.cnpj?.S)
//       setCnpj(data?.Items[0]?.cnpj?.S)
//       //setUscore(data.Items)
//     }
//   })
// }

// function createTableCollaborators (cnpj, colaborador, changeRefresh) {
//   let awsConfig2 = {
//     region: process.env.REACT_APP_LOCATION_KEY,
//     accessKeyId: process.env.REACT_APP_ACCESS_KEY,
//     secretAccessKey: process.env.REACT_APP_SECRET_KEY
//   }
//   AWS.config.update(awsConfig2)

//   var params = {
//     ExpressionAttributeNames: {
//       '#C': 'colaboradores',
      
//     },
//     ExpressionAttributeValues: {
//       ':c': {
//         L: [{ S: colaborador }]
//       },

//     },
//     Key: {
//       id: {
//         S: cnpj
//       }
//     },
//     ReturnValues: 'UPDATED_NEW',
//     TableName: 'Empresas_B2B-prd',
//     UpdateExpression:
//       'SET #C = list_append(#C, :c)'
//   }

//   var dynamodb = new AWS.DynamoDB()
//   dynamodb.updateItem(params, function (err, data) {
//     if (err) console.log(err, err.stack)
//     // an error occurred
//     else {
//       console.log(data)
//       changeRefresh(true) 
//     }// successful response
//   })
// }

// function InputCollaborators () {
//   const [controller] = useMaterialUIController()
//   const { darkMode } = controller
//   const [cnpj, setCnpj] = useState('');
  
//   const user = { email: localStorage.getItem('email') }

//   const [formValues, setFormValues] = useState(defaultValues)

//   const {changeRefresh} = useUsersContext()

//   useEffect(() => {
//     getTableCnpj(user.email, setCnpj)
//   }, [])

//   const handleSubmit = event => {
//     event.preventDefault()
//     console.log(formValues)
//     createTableCollaborators(cnpj, formValues.cpf, changeRefresh)
//     //Verify(formik.values.email, formCodigo.codigo)
//     //getVerifyB2B(false)
//     //navigate('/')
//   }

//   const handleInputChange = e => {
//     const { name, value } = e.target
//     setFormValues({
//       ...formValues,
//       [name]: value
//     })
//   }

//   return (
//     <Card id='delete-account'>
//       <MDBox
//         pt={2}
//         px={2}
//         display='flex'
//         justifyContent='space-between'
//         alignItems='center'
//       >
//         <MDTypography variant='h6' fontWeight='medium'>
//           Cadastro de colaboradores
//         </MDTypography>
//       </MDBox>
//       <form onSubmit={handleSubmit}>
//         <MDBox p={2}>
//           <MaskedInput
//             id='cpf-input'
//             name='cpf'
//             label='CPF (Colaborador)'
//             mask={'999.999.999-99'}
//             type='text'
//             value={formValues.cpf}
//             inputProps={{ maxLength: 11 }}
//             onChange={handleInputChange}
//             required
//             fullWidth
//           />
//         </MDBox>
//         <MDBox
//           pt={2}
//           px={2}
//           mb={2}
//           display='flex'
//           justifyContent='center'
//           alignItems='center'
//         >
//           <MDButton type='submit' variant='gradient' color='dark'>
//             <Icon sx={{ fontWeight: 'bold' }}>add</Icon>
//             &nbsp;adicionar colaborador
//           </MDButton>
//         </MDBox>
//       </form>
//     </Card>
//   )
// }

// export default InputCollaborators
