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
  DateInput,
  SingleFieldList,
  ChipField,
  ReferenceManyField,
  BooleanField,
} from 'admin-on-rest';
export UserIcon from 'material-ui/svg-icons/action/book';
import BooleanInput from '../adminonrestfix1045/BooleanInput';

export const UserList = (props) => (
  <List {...props} sort={{ field: 'id', order: 'ASC' }}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="middleName" />
      <TextField source="email" type="email" />
      <TextField source="mobile" />
      <DateField source="lastModifiedDate" />
      <ReferenceManyField label="Roles" reference="roles" target="userId">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceManyField>
      <BooleanField source="deleted" />
      <EditButton basePath="/managers" />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.username}"` : ''}</span>;
};

export const UserEdit = (props) => {
  return (
    <Edit title={<UserTitle />} {...props}>
      <SimpleForm>
        <DisabledInput source="id" />
        <TextInput source="username" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="middleName" />
        <TextInput source="email" type="email" />
        <TextInput source="mobile" />
        <TextInput source="password" type="password" />
        <TextInput label="Confirm password" source="password" type="password" />
        <DateInput label="Created date" source="createdDate" />
        <BooleanInput source="deleted" />

      </SimpleForm>
    </Edit>
  );
}

export const UserCreate = (props) => (
  <Create title="Create a User" {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="middleName" />
      <TextInput source="email" type="email" />
      <TextInput source="mobile" />
      <TextInput source="password" type="password" />
      <TextInput label="Confirm password" source="password" type="password" />
      <BooleanInput source="deleted" />
    </SimpleForm>
  </Create>
);
