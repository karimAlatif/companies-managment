import React from 'react';
import {useTranslation} from 'react-i18next';
import {Box, FormControl, Switch, FormControlLabel} from '@material-ui/core';
import {useStyles} from './styles';
import Typography from '@material-ui/core/Typography';
import {useFormContext} from 'react-hook-form';
import {CompanyData} from '../../definitions/types/index';
import ActiveSVG from '../../assets/active.svg';
import InActiveSVG from '../../assets/inActive.svg';
import {Info} from '@material-ui/icons';

const CompanyState = (): React.ReactElement => {
  const {t} = useTranslation();
  const classes = useStyles();

  const form = useFormContext<CompanyData>();
  const {setValue, watch} = form;
  const {isActive} = watch();

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" flexDirection="column" width="25vw">
        <Box height="40vh">
          <img src={isActive ? ActiveSVG : InActiveSVG} width="100%" height="100%" />
        </Box>
        <Box mt={1} style={{textAlign: 'center'}}>
          <Box className={classes.formControl}>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    defaultChecked={isActive}
                    onChange={event => {
                      setValue('isActive', event.target.checked);
                    }}
                  />
                }
                label={`${t('companies.form.isActive')}`}
              />
            </FormControl>
            {!isActive && (
              <Box className={classes.formControl} display={'flex'}>
                <Box mr={2}>
                  <Info />
                </Box>
                <Typography variant={'body2'} className={'semiBold'}>
                  {`${t('companies.form.infoText')}`}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CompanyState;
