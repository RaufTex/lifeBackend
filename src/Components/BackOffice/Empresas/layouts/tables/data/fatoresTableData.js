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

// @mui material components
import Icon from '@mui/material/Icon'

// Material Dashboard 2 React components
import MDBox from '../../../components/MDBox'
import MDTypography from '../../../components/MDTypography'
import MDAvatar from '../../../components/MDAvatar'
import MDProgress from '../../../components/MDProgress'

// Images
import LogoAsana from '../../../assets/images/small-logos/logo-asana.svg'
import logoGithub from '../../../assets/images/small-logos/github.svg'
import logoAtlassian from '../../../assets/images/small-logos/logo-atlassian.svg'
import logoSlack from '../../../assets/images/small-logos/logo-slack.svg'
import logoSpotify from '../../../assets/images/small-logos/logo-spotify.svg'
import logoInvesion from '../../../assets/images/small-logos/logo-invision.svg'

export default function data (props) {
  // console.log('PROPSSS', props)
  const Project = ({ image, name }) => (
    <MDBox display='flex' alignItems='center' lineHeight={1}>
      <MDAvatar src={image} name={name} size='sm' variant='rounded' />
      <MDTypography
        display='block'
        variant='button'
        fontWeight='medium'
        ml={1}
        lineHeight={1}
      >
        {name}
      </MDTypography>
    </MDBox>
  )

  const Progress = ({ color, value }) => (
    <MDBox display='flex' alignItems='center'>
      <MDTypography variant='caption' color='text' fontWeight='medium'>
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width='9rem'>
        <MDProgress variant='gradient' color={color} value={value} />
      </MDBox>
    </MDBox>
  )

  let rowsTeste = []

  props?.map((fator, index) => {
    return (rowsTeste[index] = {
      fatores: (
        <MDTypography
          component='a'
          href='#'
          variant='button'
          color='text'
          fontWeight='medium'
        >
          {fator?.fator}
        </MDTypography>
      ),
      porcentagem: <Progress color='info' value={parseInt(fator?.porcentagem)} />
    })
  })


  console.log('ROOOO', rowsTeste)

  return {
    columns: [
      { Header: 'fatores', accessor: 'fatores', width: '30%', align: 'left' },
      { Header: 'porcentagem', accessor: 'porcentagem', align: 'left' }
      // { Header: "status", accessor: "status", align: "center" },
      // { Header: "completion", accessor: "completion", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows: rowsTeste

    // rows: [
    //   {
    //     fatores: (
    //       <MDTypography
    //         component='a'
    //         href='#'
    //         variant='button'
    //         color='text'
    //         fontWeight='medium'
    //       >
    //         Fator 1
    //       </MDTypography>
    //     ),
    //     porcentagem: <Progress color='info' value={60} />
    //   },
    //   {
    //     fatores: (
    //       <MDTypography
    //         component='a'
    //         href='#'
    //         variant='button'
    //         color='text'
    //         fontWeight='medium'
    //       >
    //         Fator 2
    //       </MDTypography>
    //     ),
    //     porcentagem: <Progress color='info' value={10} />
    //   }
    // ]
  }
}
