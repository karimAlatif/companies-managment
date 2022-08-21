import React, {useCallback, useContext} from 'react';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {Box, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {useStyles} from './styles';
import Typography from '@material-ui/core/Typography';
import {Controller} from 'react-hook-form';
import useCompanyForm from '../../actions/useCompanyForm';
import {checkNameField} from '../../definitions/validation/nameField';
import {checkAddressField} from '../../definitions/validation/addressField';
import {
  IndustryTypes,
  Countries,
  EgyptCites,
  UKCites,
  FranceCites,
  GermanyCites,
} from '../../definitions/types';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import Chip from 'shared/components/Chip';
import CompaniesContext from '../../context/companiesContext';

const filter = createFilterOptions<string>();

const CompanyDetails = (): React.ReactElement => {
  const {t} = useTranslation();
  const classes = useStyles();
  const {tags: AllTags} = useContext(CompaniesContext);
  const {checkCompanyName, form} = useCompanyForm();

  const {register, errors, setValue, watch, control} = form;
  const {name, description, tags, industryType, location} = watch();
  const {country, city} = location;

  const getSelectedCitiesList = useCallback((country: string) => {
    switch (country) {
      default:
      case Countries.Egypt:
        return Object.values(EgyptCites);
      case Countries.UnitedKingdom:
        return Object.values(UKCites);
      case Countries.France:
        return Object.values(FranceCites);
      case Countries.Germany:
        return Object.values(GermanyCites);
    }
  }, []);

  return (
    <React.Fragment>
      <Typography variant={'h6'} className={clsx(classes.subTitle)}>
        {`${t('companies.form.subTitle')}`}
      </Typography>
      <Box mt={1}>
        <TextField
          fullWidth
          label={`${t('companies.form.name')}`}
          name="name"
          inputRef={register(checkNameField({checkCompanyName: checkCompanyName}))}
          placeholder="Name"
          error={Boolean(errors.name)}
          onChange={event => {
            const {value} = event.target;
            setValue('name', value.trimStart().replace(/  +/g, ' '), {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          defaultValue={name}
          helperText={errors.name && errors.name?.message}
          className={clsx('left')}
          autoFocus
        />
        <Box width={'100%'} className={classes.formControl}>
          <TextField
            inputRef={register({required: false})}
            name="description"
            fullWidth
            label={`${t('companies.form.description')}`}
            multiline
            rows={2}
            placeholder="Description"
            error={Boolean(errors.description)}
            defaultValue={description}
            helperText={errors.description && errors.description?.message}
            className={clsx('left')}
            variant="outlined"
            autoFocus
          />
        </Box>
        <Box className={classes.formControl}>
          <FormControl fullWidth>
            <InputLabel>{`${t('companies.form.industryType')}`}</InputLabel>
            <Box width={'100%'}>
              <Controller
                render={({ref}) => {
                  return (
                    <Select
                      className={classes.selectControl}
                      ref={ref}
                      displayEmpty={false}
                      onChange={({target}) => {
                        setValue('industryType', target.value as string);
                      }}
                      name="industryType"
                      defaultValue={industryType}
                    >
                      {Object.values(IndustryTypes).map(industry => {
                        return (
                          <MenuItem key={industry} value={industry}>
                            {industry}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  );
                }}
                control={control}
                rules={{required: false}}
                name={'industryType'}
              />
            </Box>
          </FormControl>
        </Box>
        <Box className={classes.formControl}>
          <Autocomplete
            multiple
            filterSelectedOptions
            options={AllTags}
            defaultValue={tags}
            ref={register}
            onChange={(event, values) =>
              setValue(
                'tags',
                values.filter(value => value.trim().length).map(value => value.toUpperCase()),
                {shouldDirty: true},
              )
            }
            filterOptions={(options, params) => {
              const filtered = filter(options, params) as string[];
              if (params.inputValue !== '' && !tags.includes(params.inputValue)) {
                filtered.push(`${params.inputValue.toUpperCase()}`);
              }
              return filtered;
            }}
            renderTags={(value: string[], getTagProps) => {
              return [...new Set(tags)].map((option: string, index: number) => (
                <Chip variant="outlined" key={index} label={option} {...getTagProps({index})} />
              ));
            }}
            renderInput={params => (
              <TextField
                {...params}
                className={classes.mb1}
                name="tags"
                fullWidth
                label={`${t('companies.form.tags')}`}
              />
            )}
          />
        </Box>
        <Box width={'100%'} display={'flex'} className={classes.formControl}>
          <Box width={'40%'}>
            <FormControl fullWidth>
              <InputLabel>{`${t('companies.form.country')}`}</InputLabel>
              <Box width={'100%'}>
                <Controller
                  render={({ref}) => {
                    return (
                      <Select
                        className={classes.selectControl}
                        ref={ref}
                        displayEmpty={false}
                        onChange={({target}) => {
                          setValue('location', {
                            country: target.value as string,
                            city: getSelectedCitiesList(target.value as string)[0],
                          });
                        }}
                        name="location.country"
                        defaultValue={country}
                      >
                        {Object.values(Countries).map(country => {
                          return (
                            <MenuItem key={country} value={country}>
                              {country}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    );
                  }}
                  control={control}
                  rules={{required: false}}
                  name={'location.country'}
                />
              </Box>
            </FormControl>
          </Box>
          <Box ml={4} width={'180px'}>
            <FormControl fullWidth>
              <InputLabel>{`${t('companies.form.city')}`}</InputLabel>
              <Box width={'100%'}>
                <Controller
                  render={({ref}) => {
                    return (
                      <Select
                        key={country}
                        className={classes.selectControl}
                        ref={ref}
                        displayEmpty={false}
                        onChange={({target}) => {
                          setValue('location', {
                            country,
                            city: target.value as string,
                          });
                        }}
                        name="location.city"
                        defaultValue={city}
                      >
                        {getSelectedCitiesList(country).map(city => {
                          return (
                            <MenuItem key={city} value={city}>
                              {city}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    );
                  }}
                  control={control}
                  rules={{required: false}}
                  name={'location.city'}
                />
              </Box>
            </FormControl>
          </Box>
        </Box>
        <Box mt={4} className={classes.formControl}>
          <TextField
            inputRef={register(checkAddressField())}
            name="address"
            fullWidth
            label={`${t('companies.form.address')}`}
            inputProps={{
              maxLength: 32,
            }}
            placeholder="Address"
            error={Boolean(errors.address)}
            defaultValue={description}
            helperText={errors.address && errors.address?.message}
            className={clsx('left')}
            autoFocus
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CompanyDetails;
