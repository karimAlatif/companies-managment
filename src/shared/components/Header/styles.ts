import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
    height: '70px',
    position: 'fixed',
    width: '100%',
    zIndex: 2,
  },
  header: {
    backgroundColor: '#0B6CB9',
    borderRadius: '0 0 10px 10px',
    padding: theme.spacing(0, 5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 3),
    },
  },
}));
