import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Company, CompanyData, CompanyName} from '../definitions/types/index';
import {useFormContext} from 'react-hook-form';
import CompaniesContext from '../context/companiesContext';
import {injectParamsIntoUrl} from 'shared/utils';
import {v4 as uuidv4} from 'uuid';

const useCompanyForm = () => {
  const {t} = useTranslation();
  const {
    companies,
    tags,
    setTags,
    activeCompany,
    newCompanyId,
    isAlertOpen,
    alertMsg,
    setIsAlertOpen,
    setAlertMsg,
    setCompanies,
  } = useContext(CompaniesContext);

  const form = useFormContext<CompanyData>();
  const {setValue, watch, handleSubmit, reset} = form;
  const {name} = watch();
  //
  const history = useHistory();

  const createCompany = useCallback(
    handleSubmit((companyData: CompanyData) => {
      console.log('companyData  ', companyData);
      const newCompany: Company = {
        id: uuidv4(),
        ...companyData,
      };
      setTags([...new Set([...tags, ...companyData.tags])]); //add new Tags
      setCompanies([...companies, {...newCompany}]); //set new Companies
      setAlertMsg('Company has been created successfully.');
      setIsAlertOpen(true);
      history.push(injectParamsIntoUrl('/', {}));
    }),
    [companies],
  );

  const editCompany = useCallback(
    handleSubmit((companyData: CompanyData) => {
      console.log('companyData  ', companyData);
      const selectedCompanyIndex = companies.findIndex(company => company.id === activeCompany?.id);
      if (!activeCompany || selectedCompanyIndex === -1) {
        // throw Error("company Not Found !!");
        return;
      }
      companies[selectedCompanyIndex] = {id: activeCompany.id, ...companyData};
      setCompanies(companies);
      setTags([...new Set([...tags, ...companyData.tags])]); //add new Tags
      setAlertMsg('Company has been Edited successfully.');
      setIsAlertOpen(true);
      history.push(injectParamsIntoUrl('/', {}));
    }),
    [],
  );

  const checkCompanyName = useCallback(
    (data: CompanyName) => {
      if (activeCompany && data.name.toLowerCase() === activeCompany?.name.toLowerCase()) {
        return true;
      } else if (
        companies.some(company => company.name.toLowerCase() === data.name.toLowerCase())
      ) {
        return false;
      }
      return true;
    },
    [activeCompany, companies],
  );

  return {
    form,
    checkCompanyName,
    createCompany,
    editCompany,
  };
};

export default useCompanyForm;
