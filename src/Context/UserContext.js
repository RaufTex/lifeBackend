import { createContext, useState, useContext, useEffect } from 'react'

export const UsersContext = createContext()

export function ListUsersProvider ({ children }) {
  const [active, setActive] = useState('usuarios')
  const [activeSchedule, setActiveSchedule] = useState('inicial')
  const [activeLaudo, setActiveLaudo] = useState('todas')
  const [isLoja, setIsLoja] = useState('loja')
  const [row, setRow] = useState()
  const [rowAvaliacao, setRowAvaliacao] = useState()
  const [users, setUsers] = useState([])
  const [address, setAddress] = useState([])
  const [payment, setPayment] = useState([])
  const [timeline, setTimeline] = useState([])
  const [allTimeline, setAllTimeline] = useState([]) //todas as avaliações
  const [jornada, setJornada] = useState([]) //pegar dados da tabela de jornada
  const [rowStatus, setRowStatus] = useState([]) //salvar linha selecionada
  const [openModal, setOpenModal] = useState(false) //modal de infos gerais
  const [openModalUpload, setOpenModalUpload] = useState(false) //modal de infos gerais
  const [openModalPolitica, setOpenModalPolitica] = useState(false) //modal de política de privacidade
  const [openModalPayment, setOpenModalPayment] = useState('false') //modal de política de privacidade
  const [vendas, setVendas] = useState([]) //pegar dados da tabela de vendas
  const [titleQuestions, setTitleQuestions] = useState([]) //perguntas
  const [answers, setAnswers] = useState([]) //respostas
  /* const [isAuthenticated, setIsAuthenticated] = useState(false); */
  const [loggedUser, setLoggedUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [agendamentos, setAgendamentos] = useState([]) //pegar dados da tabela de agendamento
  const [formTeste, setFormTeste] = useState('')
  const [schedules, setSchedules] = useState([])
  const [activeData, setActiveData] = useState('selectdata')
  const [userData, setUserData] = useState([]) //salva dados inseridos no agendamento
  const [idTesteNoPay, setIdTesteNoPay] = useState(null)
  const [tokenDevice, setTokenDevice] = useState(null)
  const [email, setEmail] = useState('')
  const [verifyB2B, setVerifyB2B] = useState(false);
  const [refreshCollab, setRefreshCollab] = useState(false)
  const [isEspecialista, setIsEspecialista] = useState(false)

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user')

    if (recoveredUser) {
      setLoggedUser(JSON.parse(recoveredUser))
    }

    setLoading(false)
  }, [])

  function changeActive (params) {
    setActive(params)
  }

  function changeActiveSchedule (params) {
    setActiveSchedule(params)
  }

  function getRow (params) {
    setRow(params)
  }

  function getRowAvaliacao (params) {
    setRowAvaliacao(params)
  }

  function getType (params) {
    setIsLoja(params)
  }

  function getUsers (params) {
    setUsers(params)
  }

  function getAddress (params) {
    setAddress(params)
  }

  function getPayment (params) {
    setPayment(params)
  }

  function getTimeline (params) {
    setTimeline(params)
  }

  function getAllTimeline (params) {
    setAllTimeline(params)
  }

  function getJornada (params) {
    setJornada(params)
  }

  function getRowStatus (params) {
    setRowStatus(params)
  }

  function handleModal (params) {
    setOpenModal(params)
  }

  function handleModalUpload (params) {
    setOpenModalUpload(params)
  }

  function handleModalPolitica (params) {
    setOpenModalPolitica(params)
  }

  function handleModalPayment (params) {
    setOpenModalPayment(params)
  }

  function getVendas (params) {
    setVendas(params)
  }

  function getAgendamentos (params) {
    setAgendamentos(params)
  }

  function getQuestions (params) {
    setTitleQuestions(params)
  }

  function getAnswers (params) {
    setAnswers(params)
  }

  function getSchedules (params) {
    setSchedules(params)
  }

  /* function getAuthenticated(params) {
    setIsAuthenticated(params)
  } */

  function getLoggedUser (params) {
    setLoggedUser(params)
  }

  function getTesteName (params) {
    setFormTeste(params)
  }

  function getActiveData (params) {
    setActiveData(params)
  }

  function getUserData (params) {
    setUserData(params)
  }

  function getIdNoPay (params) {
    setIdTesteNoPay(params)
  }

  function getActiveLaudo (params) {
    setActiveLaudo(params)
  }

  function getTokenDevice(params) {
    setTokenDevice(params)
  }

  function getEmail(params) {
    setEmail(params)
  }

  function getVerifyB2B(params) {
    setVerifyB2B(params)
  }

  function changeRefresh (params) {
    setRefreshCollab(params)
  }

  function getEspecialista (params) {
    setIsEspecialista(params)
  }

  return (
    <UsersContext.Provider
      value={{
        isAuthenticated: !!loggedUser,
        active,
        changeActive,
        activeSchedule,
        changeActiveSchedule,
        row,
        rowAvaliacao,
        getRow,
        getRowAvaliacao,
        isLoja,
        getType,
        users,
        getUsers,
        address,
        getAddress,
        payment,
        getPayment,
        timeline,
        getTimeline,
        allTimeline,
        getAllTimeline,
        jornada,
        getJornada,
        rowStatus,
        getRowStatus,
        openModal,
        handleModal,
        vendas,
        getVendas,
        titleQuestions,
        getQuestions,
        answers,
        getAnswers,
        openModalUpload,
        handleModalUpload,
        /* isAuthenticated,
        getAuthenticated, */
        loggedUser,
        getLoggedUser,
        loading,
        agendamentos,
        getAgendamentos,
        formTeste,
        getTesteName,
        schedules,
        getSchedules,
        activeData,
        getActiveData,
        openModalPolitica,
        handleModalPolitica,
        userData,
        getUserData,
        idTesteNoPay,
        getIdNoPay,
        activeLaudo,
        getActiveLaudo,
        tokenDevice,
        getTokenDevice,
        email,
        getEmail,
        verifyB2B,
        getVerifyB2B,
        openModalPayment, 
        handleModalPayment, 
        refreshCollab,
        changeRefresh,
        isEspecialista,
        getEspecialista
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export const useUsersContext = () => {
  return useContext(UsersContext)
}
