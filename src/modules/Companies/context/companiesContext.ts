import React from 'react';
import {Company, CompanyData} from '../definitions/types/Companies';

type State = {
  companies: Company[];
  activeCompany: Company | undefined;
  newCompanyId?: string;
  tags: string[];
  isAlertOpen: boolean;
  alertMsg: string;
  searchingValue: string;
  setCompanies: (companies: Company[]) => void;
  setTags: (tags: string[]) => void;
  setActiveCompany: (company: Company | undefined) => void;
  setNewCompanyId: (companyId: string) => void;
  deleteCompanies: (companiesIds: string[]) => void;
  setIsAlertOpen: (state: boolean) => void;
  setAlertMsg: (alertMsg: string) => void;
  setSearchValue: (value: string) => void;
};

const CompaniesContext = React.createContext<State>({
  companies: [],
  activeCompany: undefined,
  newCompanyId: '',
  tags: [],
  isAlertOpen: false,
  alertMsg: '',
  searchingValue: '',
  setCompanies: (companies: Company[]) => {},
  setTags: (tags: string[]) => {},
  setActiveCompany: (company: Company | undefined) => {},
  setNewCompanyId: (companyId: string) => {},
  deleteCompanies: (companiesIds: string[]) => {},
  setIsAlertOpen: (state: boolean) => {},
  setAlertMsg: (alertMsg: string) => {},
  setSearchValue: (value: string) => {},
});
export default CompaniesContext;
