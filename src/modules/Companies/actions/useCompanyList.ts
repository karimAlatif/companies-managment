import {useCallback, useState} from 'react';
import debounce from 'lodash.debounce';
import {Company, CompanyData} from '../definitions/types/Companies';
import {v4 as uuidv4} from 'uuid';

const InitCompanies: Company[] = [
  {
    id: uuidv4(),
    name: 'Si-Ware Systems',
    description:
      'NeoSpectra by Si-Ware portable FT NIR analyzers deliver accurate on-site materials analysis anywhere.',
    address: 'Sheraton Heliopolis',
    tags: ['ANALYSIS', 'MATERIALS'],
    industryType: 'Software',
    location: {
      country: 'Egypt',
      city: 'Cairo',
    },
    isActive: true,
  },
];

const useCompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>(InitCompanies);
  const [activeCompany, setActiveCompany] = useState<Company | undefined>();
  const [tags, setAllTags] = useState<string[]>(['ANALYSIS', 'MATERIALS']);
  const [newCompanyId, setNewCompanyId] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [searchingValue, setSearchValue] = useState<string>('');

  const deleteCompanies = useCallback((companiesIds: string[]) => {
    console.log('companiesIds', companiesIds);
    setCompanies(prevCompanies => {
      return prevCompanies.filter(company => !companiesIds.includes(company.id));
    });
    setAlertMsg('Delete has been done successfully.');
    setIsAlertOpen(true);
  }, []);

  const debounceSearch = useCallback(
    debounce((searchValue: string) => {
      setSearchValue(searchValue);
    }, 500),
    [],
  );

  const handleSearch = useCallback(
    (searchValue: string) => {
      debounceSearch(searchValue);
    },
    [debounceSearch],
  );

  return {
    companies,
    activeCompany,
    tags,
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
  };
};

export default useCompanyList;
