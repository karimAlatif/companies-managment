import {makeStyles} from '@material-ui/core/styles';

// @ts-ignore
export const useStyles = makeStyles(theme => ({
  mb1: {
    marginBottom: theme.spacing(1),
  },
  mb: {
    marginBottom: '4px',
  },
  hintFont: {
    fontSize: '0.605rem',
  },
  numberInput: {
    height: '30px',
  },
  mt: {
    marginTop: theme.spacing(1.5),
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  mb4: {
    marginBottom: theme.spacing(4),
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
  icon: {
    color: theme.palette.error.main,
    fontSize: 16,
    marginRight: 7,
  },
  error: {
    color: '#be262e',
  },
  createButton: {
    width: theme.spacing(18),
    height: theme.spacing(5),
    padding: '9px 12px',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.spacing(4),
    color: 'white',
  },
  nextButton: {
    width: theme.spacing(12),
    height: theme.spacing(5),
    padding: '9px 12px',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.spacing(4),
    color: 'rgba(0, 0, 0, 0.3)',
    '&.active': {
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
    },
  },
  drawerBody: {
    height: 'calc(100vh - 223px)',
    padding: '5px 25px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  defualtButton: {
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'rgb(241, 243, 244)',
    borderRadius: theme.spacing(4),
    marginRight: theme.spacing(2),
  },
  autoComplete: {
    '& [class*=MuiFormControl-root]': {
      maxHeight: '65px',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  },
  formControl: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
  selectControl: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  labelsInput: {
    marginBottom: theme.spacing(2),
  },
  title: {
    color: '#0B6CB9',
    fontWeight: 700,
    fontFamily: `"Roboto", sans-serif`,
    fontSize: '21px',
  },
  subTitle: {
    color: '#1034a6',
    fontWeight: 500,
    fontFamily: `"Roboto", sans-serif`,
    fontSize: '18px',
  },
  chipWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
}));
