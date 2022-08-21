import {withStyles} from '@material-ui/core/styles';
import {Chip} from '@material-ui/core';

export default withStyles(theme => ({
  root: {
    padding: '7px 10px',
    height: 'auto',

    '&.MuiChip-outlined': {
      color: '#1662c4',
      borderColor: 'rgba(0, 0, 0, .15)',
    },

    '&.secondaryContained': {
      color: '#1662c4',
      border: `1px solid ${'#1662c4'}`,
      background: '#e3f2fe',
    },

    '&.MuiChip-sizeSmall': {
      padding: 3,
    },

    '& + $root': {
      marginLeft: theme.spacing(2),
    },
  },
}))(Chip);
