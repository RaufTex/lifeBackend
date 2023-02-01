// import SignIn from "./Login/Login";
// import RightScreen from "./Login/RightScreen";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import RightScreen from "../LoginB2B/RightScreen";
import SignIn from "../LoginB2B/Login";

const useStyles = makeStyles((theme) => ({
  loginHome: {
    // backgroundColor: '#FFFEFE',
    background: 'linear-gradient(157.67deg, #FFFFFF 14.37%, #E2CCFD 80.31%)',
    padding: 0,
    height: '100vh'
    
  }
}));



function ClientB2B() {
  const classes = useStyles();
  return (
    <Container maxW="container.xl" className={classes.loginHome}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
          
        }}
      >
        <SignIn />
        {/* <RightScreen /> */}
      </Box>
    </Container>
  );
}

export default ClientB2B;
