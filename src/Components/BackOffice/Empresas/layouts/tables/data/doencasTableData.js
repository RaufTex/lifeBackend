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

// Material Dashboard 2 React components
import MDBox from '../../../components/MDBox'
import MDTypography from '../../../components/MDTypography'
import MDAvatar from '../../../components/MDAvatar'
import MDBadge from '../../../components/MDBadge'

// Images
import team2 from '../../../assets/images/team-2.jpg'
import team3 from '../../../assets/images/team-3.jpg'
import team4 from '../../../assets/images/team-4.jpg'

import TextField from "@mui/material/TextField";


export default function data (props) {
  console.log('props', props)

  let rowsTeste =[];
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

  // console.log(props.filter((prop, i) => prop.doenca === 'Tromboembolismo venoso (TEV)'))

  let rows = [{
    doenca: (
      <MDTypography
        component='a'
        href='#'
        variant='caption'
        color='text'
        fontWeight='medium'
      >
        Tromboembolismo venoso (TEV)
      </MDTypography>
      
    ),
    alto: (
      <MDTypography
        component='p'
        href='#'
        variant='caption'
        //color='#FF5733'
        sx={{color: '#FF5733'}}
        fontWeight='medium'
      >
        
        
        %
      </MDTypography>
    ),
    moderado: (
      <MDTypography
        component='p'
        href='#'
        variant='caption'
        // color='#fdff00'
        fontWeight='medium'
        sx={{color: '#E7E233'}}
      >
        %
      </MDTypography>
    ),
    baixo: (
      <MDTypography
        component='p'
        href='#'
        variant='caption'
        // color='#00fa9a'
        sx={{color: '#00b399'}}
        fontWeight='medium'
      >
        %
      </MDTypography>
    )
  },{
    doenca: (
      <MDTypography
        component='a'
        href='#'
        variant='caption'
        color='text'
        fontWeight='medium'
      >
        Tromboembolismo venos
      </MDTypography>
      
    ),
    alto: (
      <MDTypography
        component='p'
        href='#'
        variant='caption'
        //color='#FF5733'
        sx={{color: '#FF5733'}}
        fontWeight='medium'
      >
        
        
        %
      </MDTypography>
    ),
    moderado: (
      <MDTypography
        component='p'
        href='#'
        variant='caption'
        // color='#fdff00'
        fontWeight='medium'
        sx={{color: '#E7E233'}}
      >
        %
      </MDTypography>
    ),
    baixo: (
      <MDTypography
        component='p'
        href='#'
        variant='caption'
        // color='#00fa9a'
        sx={{color: '#00b399'}}
        fontWeight='medium'
      >
        %
      </MDTypography>
    )
  }]

  props?.map((doenca, index) => {
    return (rowsTeste[index] = {
      doenca: (
        <MDTypography
          component='a'
          href='#'
          variant='caption'
          color='text'
          fontWeight='medium'
        >
          {doenca.doenca}
        </MDTypography>
      ),
      alto: (
        <MDTypography
          component='p'
          href='#'
          variant='caption'
          //color='#FF5733'
          sx={{color: '#FF5733'}}
          fontWeight='medium'
        >
          
          
          {doenca.alto}%
        </MDTypography>
      ),
      moderado: (
        <MDTypography
          component='p'
          href='#'
          variant='caption'
          // color='#fdff00'
          fontWeight='medium'
          sx={{color: '#E7E233'}}
        >
          {doenca.moderado}%
        </MDTypography>
      ),
      baixo: (
        <MDTypography
          component='p'
          href='#'
          variant='caption'
          // color='#00fa9a'
          sx={{color: '#00b399'}}
          fontWeight='medium'
        >
          {doenca.baixo}%
        </MDTypography>
      )
    })
  })

  return {
    columns: [
      { Header: 'doenca', accessor: 'doenca', width: '45%', align: 'left' },
      { Header: 'alto', accessor: 'alto', align: 'left' },
      { Header: 'moderado', accessor: 'moderado', align: 'center' },
      { Header: 'baixo', accessor: 'baixo', align: 'center' }
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows: rowsTeste
    // [
    //   {
    //     doenca: (
    //       <MDTypography
    //         component='a'
    //         href='#'
    //         variant='caption'
    //         color='text'
    //         fontWeight='medium'
    //       >
    //         Doença Hepática Gordurosa Não-Alcoólica
    //       </MDTypography>
    //     ),
    //     alto: (
    //       <MDTypography
    //         component='p'
    //         href='#'
    //         variant='caption'
    //         //color='#FF5733'
    //         sx={{color: '#FF5733'}}
    //         fontWeight='medium'
    //       >
            
    //         50%
    //       </MDTypography>
    //     ),
    //     moderado: (
    //       <MDTypography
    //         component='p'
    //         href='#'
    //         variant='caption'
    //         color='#fdff00'
    //         fontWeight='medium'
    //       >
    //         40%
    //       </MDTypography>
    //     ),
    //     baixo: (
    //       <MDTypography
    //         component='p'
    //         href='#'
    //         variant='caption'
    //         color='#00fa9a'
    //         fontWeight='medium'
    //       >
    //         10%
    //       </MDTypography>
    //     )
    //   }
    // ]
  }
}
