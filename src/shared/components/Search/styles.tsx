import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 500,
    marginBottom: 3,
  },
  searchWrapper: {
    display: 'flex',
    width: 227,
  },
  searchControl: {
    background: theme.palette.grey[100],
    paddingLeft: theme.spacing(2.5),
    borderRadius: 25,
    border: '1px solid transparent',
    paddingRight: '10px',
    transformOrigin: 'right',
    width: '100%',
    transition: 'all 0.2s',
    height: 35,
    '&.opened': {
      visibility: 'visible',
      opacity: 1,
      transform: 'scaleX(1)',
    },
    '&.closed': {
      visibility: 'hidden',
      opacity: 0,
      transform: 'scaleX(0)',
    },
  },
  inputSearchIcon: {
    position: 'absolute',
    left: '0',
    padding: 5,
    marginLeft: 6,
    color: theme.palette.grey[700],
    opacity: 0.8,
  },
  input: {
    WebkitBoxShadow: `0 0 0 40px ${theme.palette.grey[100]} inset`,
  },
  searchField: {
    '&:before , &:after': {
      display: 'none',
    },
    '& [class*=MuiInputBase-input]': {
      textAlign: 'left',
      padding: '7px 7px 7px 7px',
      marginLeft: '14px',
    },

    '& input[type="search" i]:enabled:read-write:-webkit-any(:focus)::-webkit-search-cancel-button, input[type="search" i]:enabled:read-write:-webkit-any(:hover)::-webkit-search-cancel-button':
      {
        opacity: 0,
      },
  },
  closeIcon: {
    position: 'absolute',
    padding: 7,
    right: 0,
  },
  searchIcon: {
    transition: 'all 0.1s',

    '&.hidden': {
      visibility: 'hidden',
      opacity: 0,
      width: 0,
    },
    '&.visible': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  ml2: {
    marginLeft: theme.spacing(2),
  },
  actionList: {
    marginRight: 15,
  },
}));
