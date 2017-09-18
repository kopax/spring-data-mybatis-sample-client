/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import authClient from 'rest/authClient';
import restClient from 'rest/restClient';

import { Admin, Resource } from 'admin-on-rest';
import H1 from 'components/H1';

import { RoleList, RoleEdit, RoleCreate, RoleShow, RoleIcon } from './roles';
import { ManagerList, ManagerEdit, ManagerCreate, ManagerIcon } from './managers';
import { ClientList, ClientEdit, ClientCreate, ClientIcon } from './oAuthClients';

import messages from './messages';

export default class FeaturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Admin on Rest Page</title>
          <meta name="description" content="Admin on Rest page of React.js Boilerplate application" />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Admin authClient={authClient} restClient={restClient}>
          <Resource name="managers" list={ManagerList} edit={ManagerEdit} create={ManagerCreate} icon={ManagerIcon} />
          <Resource name="roles" list={RoleList} edit={RoleEdit} create={RoleCreate} show={RoleShow} icon={RoleIcon} />
          <Resource name="oAuthClients" list={ClientList} edit={ClientEdit} create={ClientCreate} icon={ClientIcon} />
        </Admin>,
      </div>
    );
  }
}
