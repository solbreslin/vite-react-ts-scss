import React from 'react';
import { OverviewStyled } from './Overview.styled';
import {
  Armchair,
  Bathtub,
  Bed,
  CalendarCheck,
  User,
  Users,
  UsersThree,
} from 'phosphor-react';

const ICON_SIZE = 21;

enum PropertyType {
  'House',
  'Flat',
}

type PropertyOverview = {
  type: number;
  bedrooms: number;
  bathrooms: number;
  max_tenants: number;
  furnished: boolean;
};

type Duration = 'week' | 'month' | 'year';

type Availability = {
  start_date: string;
  min_tenancy: number;
  min_tenancy_unit: Duration;
};

type Props = {
  availability: Availability;
  property: PropertyOverview;
};

const formatISODateStringToString = (dateString: string) => {
  const dateParts = dateString.split('-');
  const date = new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[2])
  );

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // @ts-ignore
  return date.toLocaleDateString('en-GB', options);
};

export const Overview: React.FC<Props> = ({ availability, property }) => {
  const availableDate = formatISODateStringToString(availability.start_date);

  const maxTenants = property.max_tenants;

  return (
    <OverviewStyled>
      <div>
        <span>
          <Bed size={ICON_SIZE} />
          {property.bedrooms} bed
        </span>

        <span>
          <Bathtub size={ICON_SIZE} />
          {property.bathrooms} bath
        </span>

        <span>
          {maxTenants === 1 ? (
            <>
              <User size={ICON_SIZE} />
              {maxTenants} tenant
            </>
          ) : maxTenants === 2 ? (
            <>
              <Users size={ICON_SIZE} />
              {maxTenants} tenants max
            </>
          ) : (
            <>
              <UsersThree size={ICON_SIZE} />
              {maxTenants} tenants max
            </>
          )}
        </span>

        <span>
          <Armchair size={ICON_SIZE} />
          Furnished
        </span>
      </div>

      <div>
        <span>
          <CalendarCheck size={ICON_SIZE} />
          Available from {availableDate}
        </span>
      </div>
    </OverviewStyled>
  );
};
