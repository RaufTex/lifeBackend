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
import Grid from '@mui/material/Grid'
import axios from 'axios'
// Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import Footer from '../../examples/Footer'
import MasterCard from '../../examples/Cards/MasterCard'
import DefaultInfoCard from '../../examples/Cards/InfoCards/DefaultInfoCard'
import Alert from '@mui/material/Alert'

// Billing page components
import PaymentMethod from '../../layouts/billing/components/PaymentMethod'
import Invoices from '../../layouts/billing/components/Invoices'
import BillingInformation from '../../layouts/billing/components/BillingInformation'
import Transactions from '../../layouts/billing/components/Transactions'
import MDBox from '../../components/MDBox'
import MDTypography from '../../components/MDTypography'
import Card from '@mui/material/Card'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'

import paymentTableData from '../tables/data/paymentTableData'

import DataTable from '../../examples/Tables/DataTable'
import { useUsersContext } from '../../../../../Context/UserContext'
function Billing () {
  const { columns, rows } = paymentTableData()

  const { openModalPayment, handleModalPayment } = useUsersContext()

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {openModalPayment === 'confirmado' && (
              <Alert
                sx={{ position: 'fixed', zIndex: 1, width: '60%' }}
                onClose={() => {
                  handleModalPayment('false')
                }}
              >
                Assinatura efetuada com sucesso!
              </Alert>
            )}
            {openModalPayment === 'negado' && (
              <Alert
                severity='error'
                sx={{
                  marginTop: 6,
                  position: 'fixed',
                  zIndex: 1,
                  width: '60%'
                }}
                onClose={() => {
                  handleModalPayment('false')
                }}
              >
                Ocorreu um erro no pagamento!
              </Alert>
            )}
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant='contained'
                bgColor='#EFE9FF'
                borderRadius='lg'
                coloredShadow='info'
              >
                <MDTypography variant='h6' color='#5A3D8A'>
                  Planos
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox> */}
      <Footer />
    </DashboardLayout>
  )
}

export default Billing
