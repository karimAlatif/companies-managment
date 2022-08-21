import {Tooltip} from '@material-ui/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Card from 'shared/components/Card';
import {Edit, Delete, Apartment, CheckCircle, HighlightOff} from '@material-ui/icons';
import {Company} from '../../definitions/types/Companies';

interface Props {
  company: Company;
  isSelected: boolean;
  handleSelect: () => void;
  handleDelete: (companyId: string) => void;
  handleEdit: (company: Company) => void;
}

function CompanyCard(props: Props) {
  const {company, isSelected, handleSelect, handleDelete, handleEdit} = props;
  const {t} = useTranslation();

  return (
    <Card
      id={company.id}
      selected={isSelected}
      onSelect={handleSelect}
      header={company.name}
      body={{
        address: company.address,
        location: `${company.location.city}, ${company.location.country}`,
        industry: company.industryType,
        description: company.description,
        tags: company.tags,
      }}
      adornment={<Apartment />}
      footer={{
        text: company.isActive ? 'Active' : 'inactive',
        icon: company.isActive ? (
          <CheckCircle style={{color: 'green'}} />
        ) : (
          <HighlightOff style={{color: 'red'}} />
        ),
      }}
      actions={[
        {
          icon: (
            <Tooltip title="Edit">
              <Edit />
            </Tooltip>
          ),
          onClick: () => {
            handleEdit(company);
          },
        },
        {
          icon: (
            <Tooltip title="Delete">
              <Delete />
            </Tooltip>
          ),
          onClick: () => {
            handleDelete(company.id);
          },
        },
      ]}
    />
  );
}
export default CompanyCard;
