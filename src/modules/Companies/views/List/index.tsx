import React, {useState, useCallback, useContext, useMemo} from 'react';
import clsx from 'clsx';
import {Box, Button, Typography, Snackbar} from '@material-ui/core';
import {useHistory, Link} from 'react-router-dom';
import {Apartment, Delete} from '@material-ui/icons';
import {useStyles} from './styles';
import CompanyCard from './CompanyCard';
import Search from 'shared/components/Search';
import ListActions from 'shared/components/ListActions';
import CompaniesContext from '../../context/companiesContext';
import DeleteDialog from './deleteDialog';
import {useTranslation} from 'react-i18next';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {injectParamsIntoUrl} from 'shared/utils';
import {Company} from '../../definitions/types/Companies';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CompaniesList() {
  const classes = useStyles();
  const {t} = useTranslation();
  const [selectedCompaniesIds, setSelectedCompaniesIds] = useState<string[]>([]);
  const [highlightedCompanyId, sethHighlightedCompanyId] = useState<string>('');
  const [isAlertDialog, setIsAlertDialog] = useState(false);
  const history = useHistory();

  const {
    companies,
    newCompanyId,
    isAlertOpen,
    alertMsg,
    setIsAlertOpen,
    setActiveCompany,
    tags,
    deleteCompanies,
    setSearchValue,
    searchingValue,
  } = useContext(CompaniesContext);
  const ActiveCompanies = useMemo(() => companies.filter(company => company.isActive), [companies]);
  const FilteredCompanies = searchingValue.length
    ? ActiveCompanies.filter(company =>
        company.name.toLocaleLowerCase().includes(searchingValue.toLowerCase()),
      )
    : ActiveCompanies;

  const handleSelectAll = useCallback(
    (value: boolean) => {
      if (value) {
        setSelectedCompaniesIds(FilteredCompanies.map(company => company.id));
      } else {
        setSelectedCompaniesIds([]);
      }
    },
    [FilteredCompanies],
  );

  const handleDeleteConfirmation = useCallback(() => {
    if (highlightedCompanyId) {
      deleteCompanies([highlightedCompanyId]);
    }
    if (selectedCompaniesIds) {
      deleteCompanies([...selectedCompaniesIds]);
    }
    setIsAlertDialog(false);
    setSelectedCompaniesIds([]);
    sethHighlightedCompanyId('');
  }, [FilteredCompanies, highlightedCompanyId, selectedCompaniesIds]);

  const handleOnDelete = useCallback((companyId: string) => {
    sethHighlightedCompanyId(companyId);
    setIsAlertDialog(true);
  }, []);

  const handleOnEdit = useCallback((company: Company) => {
    setActiveCompany(company);
    history.push(injectParamsIntoUrl(`/create/${company.id}`, {}));
  }, []);

  const handleOnCardSelect = useCallback((companyId: string) => {
    setSelectedCompaniesIds(prevIds => {
      return prevIds.find(id => id === companyId)
        ? prevIds.filter(id => id !== companyId)
        : [companyId, ...prevIds];
    });
  }, []);

  return (
    <React.Fragment>
      <Box>
        <Box display="flex" justifyContent="space-between" mb={1} alignItems={'flex-start'}>
          <Box>
            <Box display={'flex'} alignItems={'center'}>
              <Typography className={classes.title}>{'Companies'}</Typography>
            </Box>
            <Box ml={2}>
              <Typography variant="caption">{`All Companies ${FilteredCompanies.length}`}</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems={'center'} mr={5}>
            <Search
              onChange={value => {
                setSearchValue(value as string);
              }}
            />
            {
              <Box display={'flex'} justifyContent={'space-between'}>
                <Link to="/create">
                  <Button
                    className={clsx(classes.createButton, 'medium')}
                    variant="contained"
                    color="primary"
                    startIcon={<Apartment />}
                    onClick={() => {
                      setActiveCompany(undefined);
                    }}
                    disableElevation
                  >
                    Create Company
                  </Button>
                </Link>
              </Box>
            }
          </Box>
        </Box>
        <ListActions
          count={FilteredCompanies.length}
          selected={selectedCompaniesIds.length}
          handleSelectAll={handleSelectAll}
          actions={[
            {
              name: 'DELETE',
              type: 'delete',
              icon: <Delete />,
              handler: () => setIsAlertDialog(true),
              disabled: !selectedCompaniesIds.length,
            },
          ]}
          color={'secondary'}
        />
        <Box mt={4} overflow={'auto'} height="calc(100vh - 300px)">
          <Box className={clsx(classes.listingView)}>
            <Box
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="flex-start"
              width="100%"
              mx="auto"
            >
              {FilteredCompanies.length ? (
                FilteredCompanies.map(company => (
                  <div
                    key={company.id}
                    className={clsx({
                      [classes.focused]: company.id === newCompanyId,
                    })}
                  >
                    <CompanyCard
                      company={company}
                      isSelected={!!selectedCompaniesIds.find(id => id === company.id)}
                      handleSelect={() => handleOnCardSelect(company.id)}
                      handleDelete={handleOnDelete}
                      handleEdit={handleOnEdit}
                    />
                  </div>
                ))
              ) : searchingValue.length ? (
                <Typography variant="body1" className="label">
                  {`${t('companies.list.no_companies_matched')}`}
                </Typography>
              ) : (
                <Typography variant="body1" className="label">
                  {`${t('companies.list.no_companies')}`}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        isOpen={isAlertDialog}
        setModalState={() => {
          sethHighlightedCompanyId('');
          setIsAlertDialog(false);
        }}
        CompanyName={
          FilteredCompanies.find(company => company.id === highlightedCompanyId)?.name as string
        }
        isIndividual={
          (!!selectedCompaniesIds.length && selectedCompaniesIds.length === 1) ||
          !!highlightedCompanyId.length
        }
        onConfirm={handleDeleteConfirmation}
      />
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={1000}
        onClose={() => {
          setIsAlertOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setIsAlertOpen(false);
          }}
          severity="success"
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default CompaniesList;
