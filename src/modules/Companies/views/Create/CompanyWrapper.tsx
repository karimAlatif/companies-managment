import React, {useCallback, useMemo, useContext} from 'react';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {Box, Button} from '@material-ui/core';
import {useStyles} from './styles';
import Typography from '@material-ui/core/Typography';
import useCompanyForm from '../../actions/useCompanyForm';
import CompanyDetails from './CompanyDetails';
import CompanyState from './CompanyState';
import CompaniesContext from '../../context/companiesContext';
import {Link} from 'react-router-dom';

const CompanyWrapper = (): React.ReactElement => {
  const {t} = useTranslation();
  const classes = useStyles();
  const {createCompany, editCompany, form} = useCompanyForm();
  const {activeCompany} = useContext(CompaniesContext);

  const {errors, watch} = form;
  const {name, description, address, tags, industryType, location} = watch();

  const isMatchedTags = useMemo(() => {
    if (!activeCompany?.tags) {
      return false;
    }

    if (activeCompany.tags.length !== tags?.length) {
      return false;
    }
    for (let i = 0; i < activeCompany.tags?.length; i++) {
      if (!tags?.includes(activeCompany.tags[i])) {
        return false;
      }
    }
    return true;
  }, [activeCompany, tags]);

  const isDisabledCreating = useCallback(() => {
    //adding cases
    if (!name || !address || Object.keys(errors).length) {
      return true;
    }

    if (activeCompany) {
      if (
        name === activeCompany.name &&
        description === activeCompany.description &&
        industryType === activeCompany.industryType &&
        isMatchedTags &&
        location.country === activeCompany.location.country &&
        location.city === activeCompany.location.city &&
        address === activeCompany.address
      ) {
        return true;
      }
    }
    return false;
  }, [
    activeCompany,
    address,
    description,
    errors,
    industryType,
    isMatchedTags,
    location.city,
    location.country,
    name,
  ]);

  return (
    <React.Fragment>
      <Typography variant={'h4'} className={clsx(classes.title)}>
        {` ${activeCompany ? t('companies.form.editTitle') : t('companies.form.title')}`}
      </Typography>
      <Box width={'100%'} display={'flex'}>
        <Box
          display="flex"
          flexDirection={'column'}
          className={clsx(classes.drawerBody)}
          width={'50%'}
        >
          <CompanyDetails />
        </Box>
        <Box
          display="flex"
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          className={clsx(classes.drawerBody)}
          width={'50%'}
        >
          <CompanyState />
        </Box>
      </Box>

      <Box display={'flex'} justifyContent={'flex-end'} mt={0} className="action-wrapper">
        <Link to="/">
          <Button
            className={clsx(classes.defualtButton, 'fixedWidth', 'small')}
            variant={'contained'}
          >
            Back
          </Button>
        </Link>
        <Button
          disabled={isDisabledCreating()}
          onClick={() => {
            activeCompany ? editCompany() : createCompany();
          }}
          className={clsx(classes.createButton, 'medium')}
          variant={'contained'}
          color="primary"
          disableElevation
        >
          {activeCompany ? 'Edit' : 'Create'}
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default CompanyWrapper;
