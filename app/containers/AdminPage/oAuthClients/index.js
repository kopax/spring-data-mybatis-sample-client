/* eslint-disable */

import React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  DisabledInput,
  TextInput,
  ReferenceManyField,
  SingleFieldList,
  ChipField,
} from 'admin-on-rest';
export ClientIcon from 'material-ui/svg-icons/action/book';

export const ClientList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="clientId" />
      <DateField source="createdDate" />
      <ReferenceManyField label="Roles" reference="roles" target="role.id">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceManyField>
      <EditButton basePath="/oAuthClients" />
    </Datagrid>
  </List>
);

const ClientTitle = ({ record }) => {
  return <span>Client {record ? `"${record.username}"` : ''}</span>;
};

export const ClientEdit = (props) => {
  return (
    <Edit title={<ClientTitle />} {...props}>
      <SimpleForm>
        <TextInput source="clientId" />
        <TextInput source="clientSecret" />
        <TextInput source="clientSecret" />
        <DisabledInput source="createdDate" />
      </SimpleForm>
    </Edit>
  );
}

export const ClientCreate = (props) => (
  <Create title="Create a Client" {...props}>
    <SimpleForm>
      <TextInput source="clientId" />
      <TextInput source="clientSecret" />
      <TextInput source="clientSecret" />
    </SimpleForm>
  </Create>
);
