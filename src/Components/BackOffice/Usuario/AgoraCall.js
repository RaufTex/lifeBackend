import React, { useState, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import useAgora from './hooks/useAgora'
import MediaPlayer from './components/MediaPlayer'
import axios from 'axios'
import * as AWS from 'aws-sdk'

import './CallC.css'
import { useUsersContext } from '../../../Context/UserContext'

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' })

function createTableToken (cpf,token) {
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
      
    },
    ExpressionAttributeValues: {
      ':vc': {
        S: 'false'
      }
    },
    Key: {
      id: {
        S: cpf
      }
    },
    ReturnValues: 'ALL_NEW',
    TableName: 'AgendamentosCovid_2022_prd',
    UpdateExpression: 'SET #VC = :vc'
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

export default function AgoraCall () {
  const [appid, setAppid] = useState('c90015364b5643f4b42b4ce5dae71dcd')
  const [token, setToken] = useState('')
  const [uid, setUid] = useState(Math.floor(Math.random() * 10000))
  const [channel, setChannel] = useState('Teste')
  const { changeActive, getRow, users, getUsers, getAddress, row } = useUsersContext();
  console.log("row",row)
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers
  } = useAgora(client)

  useEffect(() => {
    getRtmToken(setToken)
  }, [])

  function handleJoin (appid, channel, token, uid) {
    console.log('handle')
    {
      join(appid, channel, token, uid)
    }
    createTableToken(row.cpf, token)
  }

  function handleLeave () {
    console.log('handle')
    {
      leave()
    }
    createTableLeave(row.cpf)
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
          <MediaPlayer
            videoTrack={localVideoTrack}
            audioTrack={undefined}
          ></MediaPlayer>
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
    </div>
  )
}
