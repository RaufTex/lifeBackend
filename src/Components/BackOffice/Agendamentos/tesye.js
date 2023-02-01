import { useQuery } from '@apollo/react-hooks'
import propTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import {
  View,
  Text,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native'
//import Category from "./components/Category/Category.js";
import { getUserCustomized } from '../../graphql/queriesCustomized'
import Container from '../../layouts/Container'
import { useUser } from '../../providers/UserProvider'
import { usePhoto } from '../../providers/PhotoProvider'
import { useRefresh } from '../../providers/RefreshProvider'
import { maskRemoveService } from '../../services/maskService'
import styles from './styles'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { mapUserService } from '../../services/userService'
import ProfileItem from './components/ProfileItem'
import TelaEspera from '../../screens/TelaEspera'
// import RNZendesk from 'react-native-zendesk-v2'
// import RNZendeskChat from 'react-native-zendesk-v2'
import ZendeskChat from 'react-native-zendesk-chat'
import AWS from 'aws-sdk'
AWS.config.update({
  dynamoDbCrc32: false
})
const Item = ({ item }) => (
  <View style={styles.item}>
    <View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  </View>
)

function getAllTableSchedules (setAllSchedules, cpf) {
  let awsConfig2 = {
    region: 'us-east-1',
    accessKeyId: 'AKIA564XY3QKTTMCA35K',
    secretAccessKey: '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'
  }
  AWS.config.update(awsConfig2)

  var params = {
    //TableName: 'AgendamentosCovid_2022_prd',
    ExpressionAttributeNames: {
      '#ID': 'id'
    },
    ExpressionAttributeValues: {
      ':id': {
        S: cpf
      }
    },
    FilterExpression: '#ID = :id',
    //ProjectionExpression: '#ID',
    TableName: 'AgendamentosCovid_2022_prd'
  }

  var dynamodb = new AWS.DynamoDB()

  dynamodb.scan(params, function (err, data) {
    if (err) {
      console.warn(err, err.stack)
    } else {
      //LOCAL ADICIONADO PARA CAPTURA DOS ITEMS RETORNADOS PELO BANCO DE DADOS
      //CAPTURAR O (DATA.ITEMS) E RENDERIZAR DENTRO DE ROWS!!!!! <===========
      //PARA A CAPTURA UTILIZAR USESTATE( OU QUALQUER FATOR DE SUA PREFERENCIA)
      //NESTA FUNÇAO *ExpressionAttributeNames = RETORNA OS ATRIBUTOS DO BANCO DE DADOS QUE EU QUERO, **ExpressionAttributeValues = RECEBE O "FILTRO/PARAMETRO" UTILIZADO NA BUSCA
      // **FilterExpression = EXPRESSAO DE FILTRO, **ProjectionExpression = EXIBIÇAO DE RETORNO DOS DADOS, **TableName == TABELA DE BUSCA
      // AO CAPTURAR OS DADOS DO RETORNO DE EXPRESSAO, A RENDERIZAÇÃO ESTARA COMPLETA DESDE QUE A VARIAVEL GLOBAL DE RENDERIZAÇÅO SEJA A MESMA QUE ESTEJA RENDERIZANDO
      // REPTIR ESSE MODELO PARA TODOS OS METODOS DE RENDERIZAÇAO
      //console.warn('dataa', data.Items);
      setAllSchedules(data.Items)
      //etLoadingTable(true);
    }
  })
}

function getTableTimeline (setIsDone) {
  let awsConfig2 = {
    region: 'us-east-1',
    accessKeyId: 'AKIA564XY3QKTTMCA35K',
    secretAccessKey: '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'
  }
  AWS.config.update(awsConfig2)

  var params = {
    TableName: 'timelineTypeformApp-prd'
  }

  var dynamodb = new AWS.DynamoDB()

  dynamodb.scan(params, function (err, data) {
    if (err) {
      console.warn(err, err.stack)
    } else {
      //LOCAL ADICIONADO PARA CAPTURA DOS ITEMS RETORNADOS PELO BANCO DE DADOS
      //CAPTURAR O (DATA.ITEMS) E RENDERIZAR DENTRO DE ROWS!!!!! <===========
      //PARA A CAPTURA UTILIZAR USESTATE( OU QUALQUER FATOR DE SUA PREFERENCIA)
      //NESTA FUNÇAO *ExpressionAttributeNames = RETORNA OS ATRIBUTOS DO BANCO DE DADOS QUE EU QUERO, **ExpressionAttributeValues = RECEBE O "FILTRO/PARAMETRO" UTILIZADO NA BUSCA
      // **FilterExpression = EXPRESSAO DE FILTRO, **ProjectionExpression = EXIBIÇAO DE RETORNO DOS DADOS, **TableName == TABELA DE BUSCA
      // AO CAPTURAR OS DADOS DO RETORNO DE EXPRESSAO, A RENDERIZAÇÃO ESTARA COMPLETA DESDE QUE A VARIAVEL GLOBAL DE RENDERIZAÇÅO SEJA A MESMA QUE ESTEJA RENDERIZANDO
      // REPTIR ESSE MODELO PARA TODOS OS METODOS DE RENDERIZAÇAO

      setIsDone(data.Items)
    }
  })
}

function deleteItem () {
  let awsConfig2 = {
    region: 'us-east-1',
    accessKeyId: 'AKIA564XY3QKTTMCA35K',
    secretAccessKey: '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'
  }
  AWS.config.update(awsConfig2)

  var params = {
    Key: {
      id: {
        S: '09965891710'
      }
    },

    TableName: 'timelineTypeformApp-prd'
  }

  var dynamodb = new AWS.DynamoDB()
  dynamodb.deleteItem(params, function (err, data) {
    if (err) console.log(err, err.stack)
    // an error occurred
    else console.log(data) // successful response
  })
}

const StoreView = ({ loading }) => {
  const { user } = useUser()
  //console.warn(user)
  const [mappedUser, setMappedUser] = useState({})

  const [recomended, setRecomended] = useState([])
  const [isDone, setIsDone] = useState([])
  //console.warn(isDone)
  //const [valid, setIsValid] = useState(false);
  const { valid, setIsValid } = usePhoto(false)
  const { refresh, setRefresh } = useRefresh(false)
  //const [refresh, setRefresh]  = useState(false);
  //console.warn(refresh)
  const [allSchedules, setAllSchedules] = useState(null)
  const { width } = Dimensions.get('window')

  //console.warn(mappedUser.name?.split(' ').length)
  //console.warn(isDone?.filter(elem => elem.idCpf.S === user.cpf).filter(el => el.verifyTeste.S === "true").length)

  // console.warn(isDone?.filter(elem => elem.idCpf.S === user.cpf).length)

  ZendeskChat.init('GQI8gM24VbqOc2YqqTBiIQNjXq8TDF63')

  const { data: userData, loading: userLoading } = useQuery(getUserCustomized, {
    variables: { id: maskRemoveService(user.cpf) }
  })
  const { navigate } = useNavigation()

  let str

  //console.warn(mappedUser)
  function setRefreshR () {
    {
      refresh === true ? setRefresh(false) : setRefresh(true)
    }
  }

  function Recomended () {
    let awsConfig2 = {
      region: 'us-east-1',
      accessKeyId: 'AKIA564XY3QKTTMCA35K',
      secretAccessKey: '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'
    }

    AWS.config.update(awsConfig2)

    var params = {
      TableName: 'SubExam-esVix2021marc-dev',
      FilterExpression: 'categoryId = :this_category',
      ExpressionAttributeValues: { ':this_category': 'n-00000' },
      dynamoDbCrc32: false
    }

    var documentClient = new AWS.DynamoDB.DocumentClient()

    documentClient.scan(params, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        setRecomended(data.Items)
        // console.log(data);
      }
    })
  }
  Recomended(Item)

  useEffect(() => {
    getTableTimeline(setIsDone)
    // {refresh === true ? setRefresh(false) : setRefresh(true)}
    // deleteItem()
  }, [isDone])

  useEffect(() => {
    getAllTableSchedules(setAllSchedules, user.cpf)
    // {refresh === true ? setRefresh(false) : setRefresh(true)}
    // deleteItem()
  }, [allSchedules])

  useEffect(() => {
    checkImageURL()
    // deleteItem()
  }, [refresh])

  //console.warn(isDone)

  useEffect(() => {
    if (userData && !userLoading) {
      setMappedUser(mapUserService(userData?.getUser))
    }
  }, [userData, userLoading])

  //console.warn("mapped",mappedUser)

  function checkImageURL () {
    fetch(
      `https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`
    )
      .then(res => {
        if (res.status === 404) {
          setIsValid(false)
        } else {
          setIsValid(true)
        }
      })
      .catch(err => {
        setIsValid(false)
      })
  }

  //   }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        const exam = {
          title: item.title,
          categoryId: item.categoryId,
          id: item.id,
          subtitle: item.subtitle,
          url: item.url,
          description: item.description,
          price: item.price
        }
        navigate('ExamInfo3', { exam: exam })
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 120,
        width: 320
      }}
    >
      <View
        style={{
          backgroundColor: colors.purple,
          width: 'auto',
          height: 90,
          borderRadius: 20,
          marginRight: 5
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            width: 100,
            height: 89,
            margin: 1,
            borderRadius: 20,
            alignItems: 'center',
            flex: 1
          }}
        >
          <Image
            style={{
              height: 80,
              width: 80,
              marginTop: 4,
              resizeMode: 'contain'
            }}
            source={{
              uri: item.url
            }}
          />
        </View>
      </View>
      <View style={{}}>
        <Text
          style={{
            color: colors.green1,
            fontFamily: fonts.family.semiBold,
            fontSize: fonts.size.font18,
            textAlign: 'justify'
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            color: colors.black,
            fontFamily: fonts.family.regular,
            fontSize: fonts.size.font16,
            width: 180
          }}
        >
          {item.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return isDone
    ?.filter(elem => elem.idCpf.S === user.cpf)
    .filter(ele => ele.verifyEspera.S === 'false').length === 1 ? (
    <TelaEspera />
  ) : isDone
      ?.filter(elem => elem.idCpf.S === user.cpf)
      .filter(ele => ele.verifyEspera.S === 'true').length === 1 ? (
    <Container loading={userLoading}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.positionImage}>
            <TouchableOpacity onPress={() => navigate('Profile')}>
              <Image
                style={styles.userImage}
                source={{
                  uri: valid
                    ? `https://udnas3prd-prd.s3.amazonaws.com/public/ProfilePhoto/${user.cpf}/Photo/pic.jpg`
                    : `https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/icone+perfil+mktp+cinza%403x.png`
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.positionNameUser}>
            <ProfileItem
              keyItem=' '
              valueItem={
                mappedUser.name?.split(' ')[0] +
                ' ' +
                mappedUser.name?.split(' ')[
                  mappedUser.name?.split(' ').length - 1
                ]
              }
              style={styles.item}
            />
          </View>
          <View style={styles.positionAction}>
            <TouchableOpacity
              onPress={() => navigate('Shopping')}
              style={styles.borderActions}
            >
              <Image
                style={styles.actions}
                source={{
                  uri:
                    'https://udnas3prd-prd.s3.amazonaws.com/icons/iconPedidos.png'
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // RNZendesk.init({
                // 			key: "GQI8gM24VbqOc2YqqTBiIQNjXq8TDF63",
                // 			appId: "d274e8e4bab9a737f5228ed2c41358eded1ec5f570d2d632",
                // 			url: "https://udnahelp.zendesk.com",
                // 			clientId: "mobile_sdk_client_268cca99eaf6fafa20c2",
                // 		})

                // RNZendesk.showHelpCenter({
                // 	withChat: true // add this if you want to use chat instead of ticket creation

                // })

                ZendeskChat.startChat({
                  name: mappedUser.name,
                  email: mappedUser.email,

                  // The behaviorFlags are optional, and each default to 'true' if omitted
                  behaviorFlags: {
                    showAgentAvailability: false,
                    showChatTranscriptPrompt: false,
                    showPreChatForm: false,
                    showOfflineForm: true,
                    showHelpCenter: true
                  },
                  // The preChatFormOptions are optional & each defaults to "optional" if omitted
                  preChatFormOptions: {
                    name: !mappedUser.name ? 'required' : 'optional'
                  },
                  localizedDismissButtonTitle: 'Fechar',
                  chatOnly: true
                })
              }}
              style={styles.borderActions}
            >
              <Image
                style={styles.actions}
                source={{
                  uri:
                    'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/icone+chat+mktp.png'
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigate('Reports')}
              style={styles.borderActions}
            >
              <Image
                style={styles.actions}
                source={{
                  uri:
                    'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/laudo.png'
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ursula}
          onPress={() =>
            navigate(
              isDone
                ?.filter(elem => elem.idCpf.S === user.cpf)
                .filter(ele => ele.verifyTeste.S === 'true')
                .filter(el => el.verifyScore.S === 'false')
                .filter(e => e.verifyPagamento.S === 'false').length === 1
                ? 'TypeformStandby'
                : isDone
                    ?.filter(elem => elem.idCpf.S === user.cpf)
                    .filter(ele => ele.verifyTeste.S === 'true')
                    .filter(el => el.verifyPagamento.S === 'true')
                    .filter(e => e.verifyScore.S === 'false').length === 1
                ? 'TypeformStandby'
                : isDone
                    ?.filter(elem => elem.idCpf.S === user.cpf)
                    .filter(el => el.verifyTeste.S === 'true')
                    .filter(e => e.verifyPagamento.S === 'false')
                    .filter(e => e.verifyScore.S === 'true').length === 1
                ? 'Fatores'
                : isDone
                    ?.filter(elem => elem.idCpf.S === user.cpf)
                    .filter(el => el.verifyTeste.S === 'true')
                    .filter(e => e.verifyPagamento.S === 'true')
                    .filter(e => e.verifyScore.S === 'true').length === 1
                ? 'Fatores'
                : 'UscoreStandby',
              { name: mappedUser?.name, isDone: isDone, isButton: true }
            )
          }
        >
          {/* onPress={() => navigate((isDone?.filter(elem => elem.idCpf.S === user.cpf).length) === 1 ? 'TypeformStandby' : 'TypeForm')} */}
          <Image
            style={{
              height: 161,
              width: width * 0.85,
              resizeMode: 'contain'
            }}
            source={{
              uri:
                'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/cardUscore.png'
            }}
          />
        </TouchableOpacity>

        {/* {isDone.map(elem => {return <Text>{elem.idCpf.S}</Text>})} */}

        <TouchableOpacity
          style={styles.viewMinhasAvaliacoes}
          onPress={() =>
            navigate(
              isDone
                ?.filter(elem => elem.idCpf.S === user.cpf)
                .filter(ele => ele.verifyTeste.S === 'false')
                .filter(el => el.verifyScore.S === 'false')
                .filter(e => e.verifyPagamento.S === 'false').length === 1
                ? 'PlanoStandby'
                : isDone
                    ?.filter(elem => elem.idCpf.S === user.cpf)
                    .filter(ele => ele.verifyTeste.S === 'true')
                    .filter(el => el.verifyScore.S === 'false')
                    .filter(ee => ee.verifySetores.S === 'false')
                    .filter(e => e.verifyPagamento.S === 'false').length === 1
                ? 'PlanoStandby'
                : isDone
                    ?.filter(elem => elem.idCpf.S === user.cpf)
                    .filter(ele => ele.verifyTeste.S === 'true')
                    .filter(el => el.verifyScore.S === 'true')
                    .filter(ee => ee.verifySetores.S === 'true')
                    .filter(e => e.verifyPagamento.S === 'false').length === 1
                ? 'Setores'
                : isDone
                    ?.filter(elem => elem.idCpf.S === user.cpf)
                    .filter(ele => ele.verifyTeste.S === 'true')
                    .filter(el => el.verifyScore.S === 'true')
                    .filter(ee => ee.verifySetores.S === 'true')
                    .filter(e => e.verifyPagamento.S === 'true').length === 1
                ? 'Setores'
                : 'SetoresStandby'
            )
          }
        >
          <View style={styles.meusPedidos}>
            <Image
              style={{
                height: 48,
                width: 48,
                resizeMode: 'contain',
                borderRadius: 10,
                marginLeft: 5
              }}
              source={{
                uri:
                  'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/background_buttonprev.png'
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                color: colors.purple,
                fontFamily: fonts.family.semiBold,
                fontSize: fonts.size.font18,
                width: width * 0.6
              }}
            >
              Programas de Saúde
            </Text>
            <Image
              style={{
                height: 40,
                width: 10,
                resizeMode: 'contain'
              }}
              source={{
                uri:
                  'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/setaplano.png'
              }}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.viewTitles}>
          <Text style={styles.textServicos}> Nossos serviços</Text>
          <Text style={styles.subTextServicos}> Categorias</Text>
        </View>

        <View style={styles.viewScrollContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {/* <TouchableOpacity
							style={styles.touchableViewScroll}
							onPress={() =>
								navigate('SubCategoryStore', udnudna{
									value: '01',
									title: 'Plano de Prevenção',
								})
							}>
							<View style={styles.ViewScroll}>
								<Image
									style={styles.imageViewScroll}
									source={{
										uri:
											'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/icone+genetica+medica.png',
									}}
								/>
								<Text
									style={{
										marginLeft: 10,
										marginRight: 10,
										marginTop: 5,
										color: '#744CB6',
										fontSize: 16,
										fontFamily: fonts.family.semiBold,
									}}>
									Plano de Prevenção
								</Text>
							</View>
						</TouchableOpacity> */}

            <TouchableOpacity
              style={styles.touchableViewScroll}
              onPress={() =>
                navigate('SubCategoryStore', {
                  value: '02',
                  title: 'Consultas & Assistência',
                  isDone: isDone?.filter(elem => elem.idCpf.S === user.cpf)
                })
              }
            >
              <View style={styles.ViewScroll}>
                <Image
                  style={styles.imageViewScroll}
                  source={{
                    uri:
                      'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/icone+genetica+medica.png'
                  }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    color: '#744CB6',
                    fontsize: 20,
                    fontFamily: fonts.family.semiBold
                  }}
                >
                  Consultas & Assistência
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableViewScroll}
              onPress={() =>
                navigate('SubCategoryStore', {
                  value: '03',
                  title: 'Serviços Adicionais',
                  isDone: isDone?.filter(elem => elem.idCpf.S === user.cpf)
                })
              }
            >
              <View style={styles.ViewScroll}>
                <Image
                  style={styles.imageViewScroll}
                  source={{
                    uri:
                      'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/i%CC%81cone+esporte+e+bem+estar.png'
                  }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    color: '#744CB6',
                    fontsize: 20,
                    fontFamily: fonts.family.semiBold
                  }}
                >
                  Serviços Adicionais
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableViewScroll}
              onPress={() =>
                navigate('SubCategoryStore', {
                  value: '04',
                  title: 'Testes Genéticos',
                  isDone: isDone?.filter(elem => elem.idCpf.S === user.cpf)
                })
              }
            >
              <View style={styles.ViewScroll}>
                <Image
                  style={styles.imageViewScroll}
                  source={{
                    uri:
                      'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/vinculo+genetico.png'
                  }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    color: '#744CB6',
                    fontsize: 20,
                    fontFamily: fonts.family.semiBold
                  }}
                >
                  Testes Genéticos
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableViewScroll}
              onPress={() =>
                navigate('SubCategoryStore', {
                  value: '05',
                  title: 'Outros produtos',
                  isDone: isDone?.filter(elem => elem.idCpf.S === user.cpf)
                })
              }
            >
              <View style={styles.ViewScroll}>
                <Image
                  style={styles.imageViewScroll}
                  source={{
                    uri:
                      'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/i%CC%81cone+outros+produtos.png'
                  }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    color: '#744CB6',
                    fontsize: 20,
                    fontFamily: fonts.family.semiBold
                  }}
                >
                  Outros produtos
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.marcketing}
          onPress={() =>
            navigate(
              isDone?.filter(elem => elem.verifyPagamento.S === 'false')
                .length === 1
                ? 'PagamentoConsulta'
                : isDone?.filter(elem => elem.verifyPagamento.S === 'true')
                    .length === 1
                ? allSchedules?.filter(
                    sche => sche.statusConsulta.S === 'confirmado'
                  ).length === 1
                  ? 'ScheduleConfirmed'
                  : allSchedules?.filter(
                      sche => sche.statusConsulta.S === 'pendente'
                    ).length === 1
                  ? 'ScheduleScreen'
                  : 'PagamentoConsulta'
                : 'PagamentoConsulta',
              {
                name: mappedUser.name,
                telefone: mappedUser.cellphone,
                email: mappedUser.email
              }
            )
          }
        >
          <Image
            style={{
              height: 161,
              width: width * 0.85,
              resizeMode: 'contain'
            }}
            source={{
              uri:
                'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/cardteleconsulta.png'
            }}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
					style={styles.viewMinhasAvaliacoes}
					onPress={() => navigate('Assessments')}>
					<View style={styles.meusPedidos}>
						<Text
							style={{
								marginLeft: 10,
								color: colors.purple,
								fontFamily: fonts.family.semiBold,
								fontSize: fonts.size.font16,
								width: '90%',
							}}>
							Minhas avaliações
						</Text>
						<Image
							style={{
								height: 40,
								width: 10,
								resizeMode: 'contain',
							}}
							source={{
								uri:
									'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/seta.png',
							}}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.viewMeusPedidos}
					onPress={() => navigate('Shopping')}>
					<View style={styles.meusPedidos}>
						<Text
							style={{
								marginLeft: 10,
								color: colors.purple,
								fontFamily: fonts.family.semiBold,
								fontSize: fonts.size.font16,
								width: '90%',
							}}>
							Meus pedidos
						</Text>
						<Image
							style={{
								height: 40,
								width: 10,
								resizeMode: 'contain',
							}}
							source={{
								uri:
									'https://udnas3prd-prd.s3.amazonaws.com/icons/appUrsulav6/seta.png',
							}}
						/>
					</View>
				</TouchableOpacity> */}

        {/* <Text style={styles.recommendedForYour}>Recomendados para você</Text>
				<View style={styles.viwRecommendedForYour}>
					<View>
						<FlatList
							data={recomended}
							renderItem={renderItem}
							keyExtractor={item => item.id}
						/>
					</View>
				</View> */}
      </View>
    </Container>
  ) : null
}

StoreView.propTypes = {
  headerTitle: propTypes.string.isRequired,
  loading: propTypes.bool,
  categories: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      exams: propTypes.arrayOf(
        propTypes.shape({
          id: propTypes.string,
          categoryId: propTypes.string,
          title: propTypes.string,
          description: propTypes.string,
          price: propTypes.string,
          icon: propTypes.node
        }).isRequired
      )
    }).isRequired
  ).isRequired,
  onChoiceItem: propTypes.func.isRequired,
  onSeeShopping: propTypes.func.isRequired
}

StoreView.defaultProps = {
  loading: false
}

export default StoreView

/**{categories.map((category) => (
        <View key={category.id} style={styles.categoryView}>
          <Text style={styles.title}>{category.name}</Text>
         
        </View>
      ))} */
