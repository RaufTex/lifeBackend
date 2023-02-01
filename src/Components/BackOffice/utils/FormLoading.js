

import { makeStyles, createStyles } from '@mui/styles'

import {
  Button,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  Box,
  CircularProgress
} from '@mui/material'
  
  const useStyles = makeStyles((theme) =>
    createStyles({
      loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
        //margin: theme.spacing(1, 0),
      },
      loadingProgress: {
        marginRight: 10,
      },
    })
  );
  
  export default function FormLoadingComponent() {
    const classes = useStyles();
  
    return (
      <Box className={classes.loading}>
        <CircularProgress
          className={classes.loadingProgress}
          disableShrink
          color="secondary"
          size={20}
        />{' '}
        Aguarde...
      </Box>
    );
  }