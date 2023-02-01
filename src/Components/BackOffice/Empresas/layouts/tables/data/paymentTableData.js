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
import MDButton from '../../../components/MDButton'
import MDBadge from '../../../components/MDBadge'
import axios from 'axios'

import Alert from '@mui/material/Alert'
// Images
import team2 from '../../../assets/images/team-2.jpg'
import team3 from '../../../assets/images/team-3.jpg'
import team4 from '../../../assets/images/team-4.jpg'
import { useUsersContext } from '../../../../../../Context/UserContext'

export default function Data () {
  const { openModalPayment, handleModalPayment } = useUsersContext()

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

  function openCheckout (handleModalPayment, amount, id) {
    let checkout = new window.PagarMeCheckout.Checkout({
      encryption_key: process.env.REACT_APP_PAGARME,
      success: function (data) {
        console.log('customer', data)
        /* console.log(data);
        console.log(data.card_hash);
        console.log(data.amount);
        console.log(data.customer);
        console.log(data.customer.email);
        console.log(typeof data.card_hash); */
        const api =
          'https://fbvjt6tiaa.execute-api.us-east-1.amazonaws.com/default/lambdaPayment'
        const dados = JSON.stringify({
          amount: data.amount,
          card_hash: data.card_hash,
          customer: data.customer,
          email: data.customer.email,
          planId: id
        })

        /*  console.log(dados); */

        axios
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
            console.log(response)
            if (response.status === 200) {
              handleModalPayment('confirmado')
              // getActiveData('pagconfirmado')
              // createTableSchedule(props)
              // createTableAllSchedules(userData, props)
            }
          })
          .catch(error => {
            console.log(error)
            handleModalPayment('negado')
            // getActiveData('erropagamento')
          })
      },
      error: function (err) {
        /* console.log(JSON.stringify(err)); */
        alert(JSON.stringify(err))
      },
      close: function () {
        alert('The modal has been closed.')
      }
    })

    checkout.open({
      amount: amount,
      buttonText: 'Pagar',
      customerData: 'true',
      createToken: 'false',
      paymentMethods: 'credit_card'
    })

    /* alert(JSON.stringify(data)); */
  }

  return {
    columns: [
      {
        Header: 'quantidade de usuários',
        accessor: 'quantidade',
        width: '45%',
        align: 'left'
      },
      { Header: 'valor', accessor: 'valor', align: 'left' },
      // { Header: 'status', accessor: 'status', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' }
    ],

    rows: [
      {
        quantidade: '3 usuários',
        valor: 'R$ 59,70',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() => openCheckout(handleModalPayment, '5970', '2499300')}
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      },
      {
        quantidade: '5 usuários',
        valor: 'R$ 99,50',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() => openCheckout(handleModalPayment, '9950', '2499269')}
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      },
      {
        quantidade: '10 usuários',
        valor: 'R$ 199,00',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() => openCheckout(handleModalPayment, '19900', '2499285')}
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      },
      {
        quantidade: '15 usuários',
        valor: 'R$ 298,50',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() => openCheckout(handleModalPayment, '29850', '2499286')}
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      },
      {
        quantidade: '20 usuários',
        valor: 'R$ 398,00',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() => openCheckout(handleModalPayment, '39800', '2499290')}
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      },
      {
        quantidade: '25 usuários',
        valor: 'R$ 497,50',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() => openCheckout(handleModalPayment, '49750', '2499292')}
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      },
      {
        quantidade: '30 usuários',
        valor: 'R$ 597,00',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() => openCheckout(handleModalPayment, '59700', '2499293')}
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      },
      {
        quantidade: '40 usuários',
        valor: 'R$ 796,00',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() => openCheckout(handleModalPayment, '79600', '2499294')}
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      },
      {
        quantidade: '50 usuários',
        valor: 'R$ 995,00',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() => openCheckout(handleModalPayment, '99500', '2499296')}
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      },
      {
        quantidade: '100 usuários',
        valor: 'R$ 1990,00',
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge
        //       badgeContent='assinar'
        //       color='dark'
        //       variant='gradient'
        //       size='sm'
        //     />
        //   </MDBox>
        // ),
        action: (
          <MDButton
            onClick={() =>
              openCheckout(handleModalPayment, '199000', '2499298')
            }
            variant='text'
            color='text'
            fontWeight='medium'
          >
            <MDBadge
              badgeContent='Pagar'
              color='dark'
              variant='gradient'
              size='sm'
            />
          </MDButton>
        )
      }
      //   {
      //     author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      //     function: <Job title="Programator" description="Developer" />,
      //     status: (
      //       <MDBox ml={-1}>
      //         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
      //       </MDBox>
      //     ),
      //     employed: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         11/01/19
      //       </MDTypography>
      //     ),
      //     action: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         Edit
      //       </MDTypography>
      //     ),
      //   },
      //   {
      //     author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      //     function: <Job title="Executive" description="Projects" />,
      //     status: (
      //       <MDBox ml={-1}>
      //         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      //       </MDBox>
      //     ),
      //     employed: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         19/09/17
      //       </MDTypography>
      //     ),
      //     action: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         Edit
      //       </MDTypography>
      //     ),
      //   },
      //   {
      //     author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      //     function: <Job title="Programator" description="Developer" />,
      //     status: (
      //       <MDBox ml={-1}>
      //         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      //       </MDBox>
      //     ),
      //     employed: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         24/12/08
      //       </MDTypography>
      //     ),
      //     action: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         Edit
      //       </MDTypography>
      //     ),
      //   },
      //   {
      //     author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
      //     function: <Job title="Manager" description="Executive" />,
      //     status: (
      //       <MDBox ml={-1}>
      //         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
      //       </MDBox>
      //     ),
      //     employed: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         04/10/21
      //       </MDTypography>
      //     ),
      //     action: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         Edit
      //       </MDTypography>
      //     ),
      //   },
      //   {
      //     author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      //     function: <Job title="Programator" description="Developer" />,
      //     status: (
      //       <MDBox ml={-1}>
      //         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
      //       </MDBox>
      //     ),
      //     employed: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         14/09/20
      //       </MDTypography>
      //     ),
      //     action: (
      //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //         Edit
      //       </MDTypography>
      //     ),
      //   },
    ]
  }
}
