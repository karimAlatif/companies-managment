import React, {lazy} from 'react';
import {renderRoutes, RouteConfig, RouteConfigComponentProps} from 'react-router-config';
import {AppPaths} from '../../types';
import WithLayout from 'shared/components/WithLayout';
import Layout from 'shared/components/layout';

const CompaniesTab = lazy(() => import('../views/index'));
const CompanyForm = lazy(() => import('../views/Create'));
const ErrorPage404 = lazy(() => import('shared/components/ErrorPages/404'));

const wrapper =
  (
    Component: React.LazyExoticComponent<(props: RouteConfigComponentProps) => JSX.Element | null>,
  ) =>
  (props: RouteConfigComponentProps) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };

const routes: RouteConfig[] = [
  {
    path: AppPaths.HOME,
    component: WithLayout,
    sideMenu: true,
    routes: [
      {
        path: [AppPaths.HOME, AppPaths.LIST],
        exact: true,
        name: 'companies',
        redirectTo: AppPaths.CREATE,
        component: wrapper(CompaniesTab),
      },
      {
        path: AppPaths.CREATE,
        name: 'Visualization',
        component: wrapper(CompanyForm),
      },
      {
        path: '*',
        component: wrapper(ErrorPage404),
      },
    ],
  },
];

const Routes = () => {
  const renderedRoutes = renderRoutes(routes);

  return renderedRoutes;
};

export default Routes;
