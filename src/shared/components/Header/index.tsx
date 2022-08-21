import React from 'react';
import {Box, Paper} from '@material-ui/core';
import HeaderLogo from './HeaderLogo/';
import {useStyles} from './styles';

export default function Header() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} square={true}>
      <Box
        display="flex"
        className={classes.header}
        justifyContent={'space-between'}
        alignItems="center"
        height="100%"
      >
        <HeaderLogo />
      </Box>
    </Paper>
  );
}
