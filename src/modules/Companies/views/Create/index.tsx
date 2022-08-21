import React, {useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {CompanyData} from '../../definitions/types';
import {useForm, FormProvider} from 'react-hook-form';
import CompanyWrapper from './CompanyWrapper';
import CompaniesContext from '../../context/companiesContext';

const CompanyForm = () => {
  const {t} = useTranslation();
  const {activeCompany} = useContext(CompaniesContext);

  const form = useForm<CompanyData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: activeCompany?.name || '',
      description: activeCompany?.description || '',
      address: activeCompany?.address || '',
      tags: activeCompany?.tags || [],
      industryType: activeCompany?.industryType || 'Software',
      location: activeCompany?.location || {
        country: 'Egypt',
        city: 'Cairo',
      },
      isActive: activeCompany?.isActive || true,
    },
  });
  const {register} = form;

  useEffect(() => {
    register('tags');
    register('isActive');
  }, []);

  return (
    <FormProvider {...form}>
      <CompanyWrapper />
    </FormProvider>
  );
};

export default CompanyForm;
