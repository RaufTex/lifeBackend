import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { useUsersContext } from '../../Context/UserContext'
import { makeStyles } from '@mui/styles'
import { TextField } from '@mui/material'
import * as AWS from 'aws-sdk'
import DataFormatter from '../BackOffice/utils/DataFormatter'
import axios from 'axios'
require('dotenv').config({ path: require('find-config')('.env') })
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

const useStyles = makeStyles(theme => ({
  headerTable: {
    color: '#5A3D8A',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px'
  },
  rowTable: {
    fontSize: '16px'
  }
}))

//09965891710

// function getDataM() {
//   let awsConfig2 = {
//     region: process.env.REACT_APP_LOCATION_KEY,
//     accessKeyId: process.env.REACT_APP_ACCESS_KEY,
//     secretAccessKey: process.env.REACT_APP_SECRET_KEY,
//   };
//   AWS.config.update(awsConfig2);

//   var params = {
//     ExpressionAttributeNames: {
//       "#TD": "tokenDevice",

//     },
//     ExpressionAttributeValues: {
//       ":a": {
//         BOOL: false,
//       },
//     },
//     FilterExpression: " = :a",
//     ProjectionExpression: "#ST, #AT, #CPF, #email, #fone",
//     TableName: "User-3tn77dv2gbag7ibwijizdpc7sa-prd",
//   };

//   var dynamodb = new AWS.DynamoDB();

//   dynamodb.scan(params, function (err, data) {
//     if (err) {
//       console.log(err, err.stack);
//     } else {
//       //LOCAL ADICIONADO PARA CAPTURA DOS ITEMS RETORNADOS PELO BANCO DE DADOS
//       //CAPTURAR O (DATA.ITEMS) E RENDERIZAR DENTRO DE ROWS!!!!! <===========
//       //PARA A CAPTURA UTILIZAR USESTATE( OU QUALQUER FATOR DE SUA PREFERENCIA)
//       //NESTA FUNÇAO *ExpressionAttributeNames = RETORNA OS ATRIBUTOS DO BANCO DE DADOS QUE EU QUERO, **ExpressionAttributeValues = RECEBE O "FILTRO/PARAMETRO" UTILIZADO NA BUSCA
//       // **FilterExpression = EXPRESSAO DE FILTRO, **ProjectionExpression = EXIBIÇAO DE RETORNO DOS DADOS, **TableName == TABELA DE BUSCA
//       // AO CAPTURAR OS DADOS DO RETORNO DE EXPRESSAO, A RENDERIZAÇÃO ESTARA COMPLETA DESDE QUE A VARIAVEL GLOBAL DE RENDERIZAÇÅO SEJA A MESMA QUE ESTEJA RENDERIZANDO
//       // REPTIR ESSE MODELO PARA TODOS OS METODOS DE RENDERIZAÇAO
//       getUsers(data.Items);
//     }
//   });
// }

async function sendNotification (tokenDevice) {
  const api =
    'https://fbvjt6tiaa.execute-api.us-east-1.amazonaws.com/default/triggerNotification'
  const dados = JSON.stringify({
    token: tokenDevice,
    title: 'Teleconsultas ilimitadas',
    body: 'É só R$1,33 por dia para ter teleconsultas liberadas. Assine agora!'
  })

  /*  console.log(dados); */

  await axios
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
    })
    .catch(error => {
      console.log(error)
      //getActiveData('erropagamento')
    })
}

function getData (getUsers) {
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      '#AT': 'name',
      '#ST': 'createdAt',
      '#CPF': 'cpf',
      '#email': 'email',
      '#fone': 'cellphone',
      '#tokenDevice': 'tokenDevice'
    },
    ExpressionAttributeValues: {
      ':a': {
        BOOL: false
      }
    },
    FilterExpression: 'nutritionalProfile = :a',
    ProjectionExpression: '#ST, #AT, #CPF, #email, #fone, #tokenDevice',
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
      getUsers(data.Items)
      //console.log(data.Items)
    }
  })
}

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort (array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis?.map(el => el[0])
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nome'
  },
  {
    id: 'data',
    numeric: false,
    disablePadding: true,
    label: 'Data'
  },
  {
    id: 'cpf',
    numeric: false,
    disablePadding: true,
    label: 'CPF'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'E-mail'
  },
  {
    id: 'perfil',
    numeric: false,
    disablePadding: false,
    label: 'Perfil'
  }
]

function EnhancedTableHead (props) {
  const classes = useStyles()
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead sx={{ display: 'contents' }}>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={classes.headerTable}
              sx={{ color: '#5A3D8A' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const EnhancedTableToolbar = props => {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            flex: '1 1 100%',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: ''
          }}
          variant='h6'
          id='tableTitle'
          component='div'
        ></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

export default function UserTable () {
  const [search, setSearch] = useState('')
  const [searchName, setSearchName] = useState('')
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  // const [tokens, setTokens] = React.useState()
  const [page, setPage] = React.useState(0)
  let tokens = []
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const {
    changeActive,
    getRow,
    users,
    getUsers,
    getAddress
  } = useUsersContext()
  

  // users.map(user => user?.tokenDevice?.S !== undefined ? tokens.push(user?.tokenDevice?.S) : null)

  let values = tokens.filter(function (a) {
    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true)
  }, Object.create(null))

  console.log('TOKEN', values)
  // values.map(user =>  sendNotification(user))

  // users.map(user => user?.tokenDevice?.S !== undefined ? sendNotification(user?.tokenDevice?.S) : console.log('err'))

  useEffect(() => {
    getData(getUsers)
  }, [])

  const rows = users.map(result => {
    return createData(
      result.name.S,
      result.createdAt.S,
      result.cpf.S,
      result.email.S,
      'info',
      result.cellphone.S,
      result.tokenDevice?.S
    )
  })

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  function handleInfoClick (row) {
    getRow(row)

    getAddress([])
    /* getUserPayment(row.cpf, getPayment); */
    changeActive('perfil')
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '2%' }}>
          <Typography
            sx={{
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '',
              marginLeft: '5%'
            }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            Usuário
          </Typography>
          <Box sx={{ marginLeft: '10%' }}>
            <TextField
              sx={{ width: '274px' }}
              id='outlined-search'
              label='Pesquise pelo cpf'
              type='search'
              size='small'
              onChange={event => {
                setSearch(event.target.value)
              }}
            />
            <TextField
              sx={{
                width: '220px',
                marginLeft: '10px',
                '@media screen and (max-width: 1240px)': {
                  width: '180px'
                }
              }}
              id='outlined-search'
              label='Pesquise pelo nome'
              type='search'
              size='small'
              onChange={event => {
                setSearchName(event.target.value)
              }}
            />
          </Box>
        </Box>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <EnhancedTableHead
              key={rows.cpf}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .filter(row => {
                  if (search === '') {
                    return row
                  } else if (row.cpf.includes(search)) {
                    return row
                  }
                })
                .filter(row => {
                  if (setSearchName === '') {
                    return row
                  } else if (
                    row.name.toLowerCase().includes(searchName.toLowerCase())
                  ) {
                    return row
                  }
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <>
                      <TableRow
                        hover
                        /* onClick={(event) => handleClick(event, row.name)} */
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            onClick={event => handleClick(event, row.name)}
                            color='primary'
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          padding='none'
                          sx={{
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '19px',
                            color: '#535354'
                          }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '19px',
                            color: '#535354'
                          }}
                          align='left'
                        >
                          {DataFormatter(row.data)}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '19px',
                            color: '#535354'
                          }}
                          align='left'
                        >
                          {row.cpf}
                        </TableCell>
                        {/* <TableCell
                          sx={{
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "19px",
                            color: "#535354",
                          }}
                          align="left"
                        >
                          {row.so}
                        </TableCell> */}
                        <TableCell
                          sx={{
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '19px',
                            color: '#535354'
                          }}
                          align='left'
                        >
                          {row.email}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '19px',
                            color: '#535354'
                          }}
                          align='left'
                        >
                          <Button
                            sx={{
                              width: '74px',
                              height: '27px',
                              background: 'rgba(116, 76, 182, 0.19)',
                              borderRadius: '5px',
                              fontSize: '16px',
                              color: '#744CB6',
                              fontStyle: 'normal',
                              fontWeight: 'normal',
                              lineHeight: '19px'
                            }}
                            variant='contained'
                            onClick={() => handleInfoClick(row)}
                          >
                            Infos
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Páginas'
        />
      </Paper>
    </Box>
  )
}
