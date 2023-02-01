import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { makeStyles } from '@mui/styles'
import { useUsersContext } from '../../../Context/UserContext'
import AWS from 'aws-sdk'
import { Box, Typography } from '@mui/material'
AWS.config.update({
  dynamoDbCrc32: false
})

const useStyles = makeStyles(theme => ({
  menuItens: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    /* identical to box height */
    flexGrow: 1,
    color: '#744CB6',
    
  },
  numbers: { 
    fontWeight: 'bold'

  }
}))

function getTableTimeline (setTotalUsers, setUscoreUnico) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'timelineTypeformApp-prd'
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
      setTotalUsers(data.Count)
      setUscoreUnico(data.Items)
      console.log(data.Items)
    }
  })
}

function getTableScoreHistory (setTotalScore) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'Score_History_User-prd'
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
      setTotalScore(data.Count)
      console.log(data.Items)
    }
  })
}

function getTableScore (setActiveScore) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'Score_BI_UDNA_2022'
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
      setActiveScore(data.Count)
      console.log(data.Items)
    }
  })
}

function getTableConsultas (setConsultas) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'Horarios_Agendamento_2022_prd'
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
      setConsultas(data.Count)
      console.log(data.Items)
    }
  })
}

export default function IconMenu () {
  const classes = useStyles()
  const { changeActive, getAuthenticated } = useUsersContext()
  const [totalUsers, setTotalUsers] = useState(null)
  const [totalScore, setTotalScore] = useState(null)
  const [activeScore, setActiveScore] = useState(null)
  const [consultas, setConsultas] = useState(null)
  const [uscoreUnico, setUscoreUnico] = useState(null)

  // console.log('unico', uscoreUnico?.filter(uscore => uscore.actualScore?.S !== '0').length)

  useEffect(() => {
    getTableTimeline(setTotalUsers, setUscoreUnico)
    getTableScoreHistory(setTotalScore)
    getTableScore(setActiveScore)
    getTableConsultas(setConsultas)
  }, [])

  function handleClickUser () {
    changeActive('usuarios')
    /* getAddress(''); */
  }

  function handleClickJornada () {
    changeActive('jornada')
  }
  return (
    <Paper
      sx={{
        width: 320,
        maxWidth: '100%',
        boxShadow: 0,
        marginTop: '34px',
        marginLeft: '13px'
      }}
    >
      <MenuList>
        <Box sx={{marginLeft: 2}}>
          <Typography>
            {/* <ListItemIcon>
            <img src='/images/imgUsuario.svg' alt='usuariosAtivos' />
          </ListItemIcon> */}
            <ListItemText>
              <span className={classes.menuItens}>
                Total de usuários ativos : <span className={classes.numbers}>{totalUsers}</span>
              </span>
            </ListItemText>
            {/* <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography> */}
          </Typography>

          <Typography>
            <ListItemText>
              <span className={classes.menuItens}>
                Total de uScore: <span className={classes.numbers}>{totalScore}</span>
              </span>
            </ListItemText>
          </Typography>
          <Typography>
            {/* <ListItemIcon>
            <img src='/images/imgUsuario.svg' alt='usuariosAtivos' />
          </ListItemIcon> */}
            <ListItemText>
              <span className={classes.menuItens}>
                Total de uScore único : <span className={classes.numbers}>{uscoreUnico?.filter(uscore => parseInt(uscore.actualScore?.S) > 0).length}</span>
              </span>
            </ListItemText>
            {/* <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography> */}
          </Typography>

          <Typography>
            <ListItemText>
              <span className={classes.menuItens}>
                Total de uScore ativos: <span className={classes.numbers}>{activeScore}</span>
              </span>
            </ListItemText>
          </Typography>
          <Typography>
            <ListItemText>
              <span className={classes.menuItens}>
                Total de consultas: <span className={classes.numbers}>{consultas}</span>
              </span>
            </ListItemText>
          </Typography>
        </Box>
        <MenuItem sx={{marginTop: 6}} onClick={handleClickUser}>
          <ListItemIcon>
            <img src='/images/imgUsuario.svg' alt='usuario' />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.menuItens}>Usuários</span>
          </ListItemText>
          {/* <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography> */}
        </MenuItem>
        <MenuItem onClick={() => changeActive('laudos')}>
          <ListItemIcon>
            <img src='/images/imgCupom.svg' />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.menuItens}>Laudos</span>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClickJornada}>
          <ListItemIcon>
            <img src='/images/imgJornada.svg' />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.menuItens}>Empresas</span>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => changeActive('vendas')}>
          <ListItemIcon>
            <img src='/images/imgCupom.svg' />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.menuItens}>Vendas</span>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => changeActive('menuavaliacoes')}>
          <ListItemIcon>
            <img src='/images/imgFormulario.svg' alt='avaliacoes' />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.menuItens}>Avaliações</span>
          </ListItemText>
          {/* <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography> */}
        </MenuItem>
        <MenuItem onClick={() => changeActive('menusetores')}>
          <ListItemIcon>
            <img src='/images/imgSetores.svg' alt='setores' />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.menuItens}>Setores</span>
          </ListItemText>
          {/* <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography> */}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <img src='/images/imgAtendimento.svg' alt='atendimentos' />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.menuItens}>Atendimentos</span>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => changeActive('menuagendamentos')}>
          <ListItemIcon>
            <img src='/images/imgAgendamentos.svg' alt='avaliacoes' />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.menuItens}>Agendamentos</span>
          </ListItemText>
          {/* <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography> */}
        </MenuItem>
        <MenuItem onClick={() => getAuthenticated(false)}>
          <ListItemIcon>
            <img src='/images/imgLogout.svg' alt='logout' />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.menuItens}>Sair da conta</span>
          </ListItemText>
          {/* <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography> */}
        </MenuItem>
      </MenuList>
    </Paper>
  )
}
