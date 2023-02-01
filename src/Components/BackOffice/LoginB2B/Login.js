import React, { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import MuiLink from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import jwt_decode from 'jwt-decode'
import AWS from 'aws-sdk'
import { useNavigate } from 'react-router-dom'
import { useUsersContext } from '../../../Context/UserContext'
import { Card, Switch } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from '../Empresas/assets/images/logo_purple.png'

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// import MDTypography from "../../../components/MDTypography";
// import MDInput from "../../../components/MDInput";
// import MDButton from "../../../components/MDButton";

// Authentication layout components
// import BasicLayout from "../../../layouts/authentication/components/BasicLayout";

// Images
import bgImage from '../Empresas/assets/images/bg-sign-in-basic.jpeg'
// import MDBox from '../../../components/MDBox'

import MDTypography from '../Empresas/components/MDTypography'
import MDInput from '../Empresas/components/MDInput'
import MDButton from '../Empresas/components/MDButton'
import BasicLayout from '../Empresas/layouts/authentication/components/BasicLayout'
import MDBox from '../Empresas/components/MDBox'
import Empresas from '../Empresas/Empresas'

function Copyright () {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://udna.life/'>
        uDNA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    // background: 'linear-gradient(157.67deg, #FFFFFF 14.37%, #E2CCFD 80.31%)',
    width: 'auto',
    //height: '100vh',
    //maxWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    width: 300,
    height: 300,
    // backgroundColor: '#fff',
    marginTop: '26%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '2%'
  },
  avatar: {
    margin: 1,
    backgroundColor: 'purple'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 10
  },
  submit: {
    margin: 3
  }
}))

export default function SignIn () {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [valuePassword, setValuePassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSetRememberMe = () => setRememberMe(!rememberMe)
  const {
    isAuthenticated,
    getAuthenticated,
    getLoggedUser,
    getEmail,
    loggedUser
  } = useUsersContext()
  let navigate = useNavigate()

  console.log('getLogge', loggedUser, isAuthenticated)

  const getData = e => {
    setValue(e.target.value)
  }

  const getDataPassword = e => {
    setValuePassword(e.target.value)
  }

  const email = value
  const password = valuePassword

  console.log(email, password)

  //awsConfig.js
  let cognitoAttributeList = []

  const poolData = {
    UserPoolId: process.env.REACT_APP_POOL_KEY_B2B,
    ClientId: process.env.REACT_APP_CLIENT_KEY_B2B
  }

  const attributes = (key, value) => {
    return {
      Name: key,
      Value: value
    }
  }

  function setCognitoAttributeList (email, agent) {
    let attributeList = []
    attributeList.push(attributes('email', email))
    attributeList.forEach(element => {
      cognitoAttributeList.push(
        new AmazonCognitoIdentity.CognitoUserAttribute(element)
      )
    })
  }

  function getCognitoAttributeList () {
    return cognitoAttributeList
  }

  function getCognitoUser (email) {
    const userData = {
      Username: email,
      Pool: getUserPool()
    }
    return new AmazonCognitoIdentity.CognitoUser(userData)
  }

  function getUserPool () {
    return new AmazonCognitoIdentity.CognitoUserPool(poolData)
  }

  function getAuthDetails (email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    }
    return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)
  }

  function initAWS (
    region = process.env.AWS_COGNITO_REGION,
    identityPoolId = process.env.AWS_COGNITO_IDENTITY_POOL_ID
  ) {
    AWS.config.region = region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId
    })
  }

  function decodeJWTToken (token) {
    const { email, exp, auth_time, token_use, sub } = jwt_decode(token.idToken)
    return { token, email, exp, uid: sub, auth_time, token_use }
  }
  //Cognito
  function failureCallback (error) {
    console.log('It failed with ' + error)
  }

  function signIn (email, password) {
    return new Promise(resolve => {
      getCognitoUser(email).authenticateUser(getAuthDetails(email, password), {
        onSuccess: result => {
          console.log('result', result.getIdToken().payload.email)
          console.log(result.getAccessToken().getJwtToken())
          getLoggedUser(JSON.stringify(result.getIdToken().payload))
          const token = {
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken()
          }
          localStorage.setItem('email', result.getIdToken().payload.email)
          localStorage.setItem('token', result.getAccessToken().getJwtToken())

          localStorage.setItem(
            'user',
            JSON.stringify(result.getIdToken().payload)
          )

          return resolve({ statusCode: 201, response: decodeJWTToken(token) })
        },

        onFailure: err => {
          return resolve({
            statusCode: 400,
            response: err.message || JSON.stringify(err)
          })
        }
      })
    }).catch(failureCallback)
  }

  const SignInVerify = async e => {
    e.preventDefault()
    const resolve = await signIn(email, password)
    console.log('RESOLVE', resolve)
    if (resolve.statusCode === 400) {
      alert('Usuário/Senha Incorretos')
    } else {
      /* getAuthenticated(true); */
      getEmail(resolve.response.email)
      //alert('sucesso')
      navigate('/backoffice/teleconsultas')
    }
  }

  return (
    // <Empresas>
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant='gradient'
          bgColor='#fff'
          borderRadius='lg'
          coloredShadow='success'
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign='center'
        >
          <img width='40%' src={Logo} />
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component='form' role='form'>
            <MDBox mb={2}>
              <MDInput type='email' label='Email' onChange={getData} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type='password' label='Password' onChange={getDataPassword} fullWidth />
            </MDBox>
            <MDBox display='flex' alignItems='center' ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant='button'
                fontWeight='regular'
                color='text'
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Lembrar
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant='gradient' color='info' onClick={SignInVerify} fullWidth>
                entrar
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign='center'>
              <MDTypography variant='button' color='text'>
                Não possui uma conta?{' '}
                <MDTypography
                  component={Link}
                  to='/cadastro'
                  variant='button'
                  color='info'
                  fontWeight='medium'
                  textGradient
                >
                  Cadastrar
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>

    // <Box sx={{ width: 'auto'}}>
    //   <Container className={classes.root} maxWidth='xs'>
    //     <CssBaseline />
    //     <div className={classes.paper}>
    //       <img
    //         src='/images/uDNA_logo_extenso_roxo.svg'
    //         alt='logo'
    //         className={classes.img}
    //         width='174px'
    //         height='50px'
    //         backgroundColor=' #000'
    //         color=' #fff'
    //         border-radius='100%'
    //       />
    //       {/* <img
    //       src='/images/backofficeTitle.svg'
    //       alt='logo'
    //       className={classes.img}
    //       width='97px'
    //       height='26px'
    //       backgroundColor=' #000'
    //       color=' #fff'
    //       border-radius='100%'
    //     />

    //     <Typography component='h1' variant='h5'>
    //       Login
    //     </Typography> */}
    //       <form className={classes.form} noValidate>
    //         <TextField
    //           variant='outlined'
    //           margin='normal'
    //           required
    //           fullWidth
    //           id='email'
    //           label='Email'
    //           name='email'
    //           type='email'
    //           autoComplete='email'
    //           autoFocus
    //           onChange={getData}
    //         />
    //         <TextField
    //           variant='outlined'
    //           margin='normal'
    //           required
    //           fullWidth
    //           name='password'
    //           label='Senha'
    //           type='password'
    //           id='password'
    //           onChange={getDataPassword}
    //           autoComplete='current-password'
    //         />
    //         <FormControlLabel
    //           control={<Checkbox value='remember' color='primary' />}
    //           label='Remember me'
    //         />
    //         <Button
    //           type='submit'
    //           fullWidth
    //           variant='contained'
    //           color='primary'
    //           className={classes.submit}
    //           onClick={SignInVerify}
    //         >
    //           Entrar
    //         </Button>
    //         <Grid container>
    //           <Grid item xs>
    //             {/* <Link href='#' variant='body2'>
    //             Forgot password?
    //           </Link> */}
    //             <Button
    //               type='submit'
    //               fullWidth
    //               variant='text'
    //               color='primary'
    //               //className={classes.submit}
    //               onClick={() => navigate('/cadastro')}
    //             >
    //               Cadastre-se agora
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </form>
    //     </div>
    //     <Box mt={8}>
    //       <Copyright />
    //     </Box>
    //   </Container>
    // </Box>
  )
}
