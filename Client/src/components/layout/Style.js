import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    whiteBackground: {
      background:'white',
    },
    button: {
      margin: theme.spacing(1),
    },
    media: {
      height: 170
  },
  cardContent:{
    overflow: 'hidden',
    overflowY: 'scroll',
  }  
  }));

  export const  useNoUnderLineStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
    }
  });

  export const LoginStyle = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    margin:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    image: {
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));