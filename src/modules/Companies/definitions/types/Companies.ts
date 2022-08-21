import {EgyptCites, UKCites, FranceCites, GermanyCites} from './locations';

export interface CountriesTypes {
  Egypt: 'Egypt';
  UnitedKingdom: 'United Kingdom';
  France: 'France';
  Germany: 'Germany';
}

export const Countries: CountriesTypes = {
  Egypt: 'Egypt',
  UnitedKingdom: 'United Kingdom',
  France: 'France',
  Germany: 'Germany',
};

export const IndustryTypes = {
  Software: 'Software',
  Sales: 'Sales',
  Development: 'Development',
  RealEstate: 'Real Estate',
  HealthCare: 'HealthCare',
  Construction: 'Construction',
};

interface Egypt {
  country: typeof Countries.Egypt;
  city: keyof typeof EgyptCites;
}

interface UnitedKingdom {
  country: typeof Countries.UnitedKingdom;
  city: keyof typeof UKCites;
}

interface France {
  country: typeof Countries.France;
  city: keyof typeof FranceCites;
}

interface Germany {
  country: typeof Countries.Germany;
  city: keyof typeof GermanyCites;
}

export type Locations = Egypt | UnitedKingdom | France | Germany;

export interface CompanyData {
  name: string;
  description: string;
  address: string;
  tags: string[];
  industryType: keyof typeof IndustryTypes;
  location: Locations;
  isActive: boolean;
}

export interface Company extends CompanyData {
  id: string;
}

export interface CompanyName {
  name: string;
}

export interface NameValidation {
  checkCompanyName: (data: CompanyName) => boolean;
}
