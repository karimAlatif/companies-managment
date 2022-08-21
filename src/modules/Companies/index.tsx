import React, {lazy} from 'react';
import Routes from './routes';
import languages from './definitions/translations/en.json';
import {BrowserRouter, Router} from 'react-router-dom';
import i18n from 'i18n';
import useCompanyList from './actions/useCompanyList';
import CompaniesContext from './context/companiesContext';

i18n.addResourceBundle('en', 'translation', languages, true);

function Companies() {
  const {
    companies,
    tags,
    activeCompany,
    newCompanyId,
    isAlertOpen,
    alertMsg,
    searchingValue,
    setAlertMsg,
    setIsAlertOpen,
    setCompanies,
    setAllTags,
    setActiveCompany,
    setNewCompanyId,
    deleteCompanies,
    handleSearch,
  } = useCompanyList();

  return (
    <>
      <CompaniesContext.Provider
        value={{
          companies,
          activeCompany,
          newCompanyId,
          tags,
          isAlertOpen,
          alertMsg,
          searchingValue,
          setAlertMsg,
          setCompanies,
          setTags: setAllTags,
          setActiveCompany,
          setNewCompanyId,
          deleteCompanies,
          setIsAlertOpen,
          setSearchValue: handleSearch,
        }}
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CompaniesContext.Provider>
    </>
  );
}

export default Companies;
