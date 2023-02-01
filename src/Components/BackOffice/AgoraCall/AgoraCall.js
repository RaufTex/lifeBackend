import React, { useState, useEffect, useRef } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import useAgora from './hooks/useAgora'
import MediaPlayer from './components/MediaPlayer'
import MediaPlayerHost from './components/MediaPlayerHost'
import axios from 'axios'
import * as AWS from 'aws-sdk'
// import JoditEditor from 'jodit-react'
import './CallC.css'
import { useUsersContext } from '../../../Context/UserContext'
import MDInput from '../Empresas/components/MDInput'
import MDBox from '../Empresas/components/MDBox'
import MDButton from '../Empresas/components/MDButton'
import { useNavigate } from 'react-router-dom'
const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' })

function createTableToken (cpf, token) {
  /* console.log(props)
            console.log(props.id) */
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      '#VC': 'verifyCall',
      '#TC': 'tokenCall'
    },
    ExpressionAttributeValues: {
      ':vc': {
        S: 'true'
      },
      ':tc': {
        S: token
      }
    },
    Key: {
      id: {
        S: cpf
      }
    },
    ReturnValues: 'ALL_NEW',
    TableName: 'AgendamentosCovid_2022_prd',
    UpdateExpression: 'SET #VC = :vc, #TC = :tc'
  }

  var dynamodb = new AWS.DynamoDB()
  dynamodb.updateItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else {
      console.log('datatable', data)
    } // successful response
  })
}

function createTableLeave (cpf) {
  /* console.log(props)
            console.log(props.id) */
  let awsConfig2 = {
    region: process.env.REACT_APP_LOCATION_KEY,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  }
  AWS.config.update(awsConfig2)

  var params = {
    ExpressionAttributeNames: {
      '#VC': 'verifyCall',
      '#SC': 'statusConsulta'
    },
    ExpressionAttributeValues: {
      ':vc': {
        S: 'false'
      },
      ':sc': {
        S: 'pendente'
      }
    },
    Key: {
      id: {
        S: cpf
      }
    },
    ReturnValues: 'ALL_NEW',
    TableName: 'AgendamentosCovid_2022_prd',
    UpdateExpression: 'SET #VC = :vc, #SC = :sc'
  }

  var dynamodb = new AWS.DynamoDB()
  dynamodb.updateItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else {
      console.log('datatable', data)
    } // successful response
  })
}

function getRtmToken (setToken) {
  const api =
    'https://fbvjt6tiaa.execute-api.us-east-1.amazonaws.com/default/getRtmToken'
  // const dados = JSON.stringify({
  //     token: formValues.tokenDevice,
  //     title: formValues.titulo,
  //     body: formValues.mensagem
  // });

  /*  console.log(dados); */

  axios
    .get(
      api,
      { params: { data: '' } },
      {
        headers: {
          Authorization:
            'Bearer tfp_DYbd83AQS6EE12BR97kcvPeC8jdPAsPkcfyW3vDYJEes_3pZ6sRwQ4LDS5M',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    .then(response => {
      //console.warn("res",response.data.fatores.L);
      console.log('res', response)
      setToken(response.data)
    })
    .catch(error => {
      console.log('erro', error)
      //getActiveData('erropagamento')
    })
}

async function sendNotification (tokenDevice) {
  const api =
    'https://fbvjt6tiaa.execute-api.us-east-1.amazonaws.com/default/triggerNotification'
  const dados = JSON.stringify({
    token: tokenDevice,
    title: 'Sua consulta já vai começar!',
    body: 'Entre no aplicativo e vá para a teleconsulta.'
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

export default function AgoraCall () {
  const [appid, setAppid] = useState('edbe3d237e9c49e2a5d2c1cae10c0fc7')
  const [token, setToken] = useState('')
  const [uid, setUid] = useState(Math.floor(Math.random() * 10000))
  const [channel, setChannel] = useState('')
  const editor = useRef(null)
  const [content, setContent] = useState('')
  

  let navigate = useNavigate()

  
  // console.log('content', content)
  const config = {
    readonly: false,
    height: 'auto'
    // placeholder: "Digite as orientações..."
  }
  const handleUpdate = event => {
    const editorContent = event?.target?.value
    console.log(editorContent)
    setContent(editorContent)
  }

  const {
    changeActive,
    getRow,
    users,
    getUsers,
    getAddress,
    row,
    tokenDevice
  } = useUsersContext()
  console.log('row', row)

  function createTable (email) {
    console.log('AHHHHH entro')
    const api = 'https://q7amrtd8t8.execute-api.us-east-1.amazonaws.com/dev/duty?finish_operational=True'
    const dados = JSON.stringify({
      user: email
    })
  
    /*  console.log(dados); */
  
    axios
      .post(
        api,
         {  user: email } ,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
      .then(response => {
        //console.warn("res",response.data.fatores.L);
        console.log('res', response)
        // getRow(response.data)
        // getAgendamentos(response.data)
        // setIndicadores(response.data)
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
        console.log('errrro', error)
        //getActiveData('erropagamento')
      })
  }

  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers
  } = useAgora(client)

  useEffect(() => {
    setChannel(row.channel_id)
    setToken(row.token_id)
  }, [])

  function handleJoin (appid, channel, token, uid) {
    console.log('handle', appid, channel, token, uid)
    {
      join(appid, channel, token, uid)
    }
    // createTableToken(row.cpf, token)
    // sendNotification(tokenDevice)
  }

  function handleLeave () {
    console.log('handle')
    {
      leave()
    }
    createTable (row.user)
    // createTableLeave(row.cpf)
    // if(row.tipoProfissional === 'Ginecologista'){
    //    navigate('/teleconsultas/inicio')

    // }
  }

  return (
    <div className='call'>
      {/* <form className='call-form'>
        <label>
          AppID:
          <input type='text' name='appid' onChange={(event) => { setAppid(event.target.value) }}/>
        </label>
        <label>
          Token:
          <input type='text' name='token' onChange={(event) => { setToken(event.target.value) }} />
        </label>
        <label>
          Channel: 
          <input type='text' name='channel' onChange={(event) => { setChannel(event.target.value) }} />
        </label>
        
      </form> */}
      <div className='button-group'>
        <button
          id='join'
          type='button'
          className='btn btn-primary btn-sm'
          disabled={joinState}
          onClick={() => handleJoin(appid, channel, token, uid)}
        >
          Join
        </button>
        <button
          id='leave'
          type='button'
          className='btn btn-primary btn-sm'
          disabled={!joinState}
          onClick={() => handleLeave()}
        >
          Leave
        </button>
      </div>
      <div className='player-container'>
        <div className='local-player-wrapper'>
          <p className='local-player-text'>
            {localVideoTrack && `Host`}
            {joinState && localVideoTrack ? `(${client.uid})` : ''}
          </p>
          <MediaPlayerHost
            videoTrack={localVideoTrack}
            audioTrack={undefined}
          ></MediaPlayerHost>
        </div>
        {remoteUsers.map(user => (
          <div className='remote-player-wrapper' key={user.uid}>
            <p className='remote-player-text'>{`Convidado(${user.uid})`}</p>
            <MediaPlayer
              videoTrack={user.videoTrack}
              audioTrack={user.audioTrack}
            ></MediaPlayer>
          </div>
        ))}
      </div>
      {/* <MDBox component='form' role='form'>
        <MDBox mb={2}>
          
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={handleUpdate}
            onChange={newContent => {}}
          />
        </MDBox>

        <MDBox mt={4} mb={1}>
          <MDButton variant='gradient' color='info' type='submit' fullWidth>
            enviar orientações
          </MDButton>
        </MDBox>
      </MDBox> */}
    </div>
  )
}
