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
  ReferenceArrayField,
  ReferenceArrayInput,
  SelectArrayInput,
  BooleanField,
  Filter,
} from 'admin-on-rest';
export UserIcon from 'material-ui/svg-icons/action/supervisor-account';
import BooleanInput from '../adminonrestfix1045/BooleanInput';

const UserFilter = (props) => (
  <Filter {...props}>
    {[
      <TextInput key="id" label="Id" source="id" alwaysOn />,
      <TextInput key="username" label="Username" source="username" defaultValue="Big" alwaysOn />,
      <TextInput key="firstName" label="First Name" source="firstName" defaultValue="Dimitri" alwaysOn />,
      <TextInput key="lastName" label="Last Name" source="lastName" defaultValue="Kop" alwaysOn />,
      <TextInput key="middleName" label="Middle Name" source="middleName" defaultValue="Alexander" alwaysOn />,
      <TextInput key="email" label="Email" source="email" defaultValue="user@domain.com" alwaysOn />,
    ].reverse()}
  </Filter>
);

export const UserList = (props) => (
  <List
    {...props}
    filter={{ deleted: false }}
    sort={{ field: 'id', order: 'ASC' }}
    filters={<UserFilter />}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="middleName" />
      <TextField source="email" type="email" />
      <TextField source="mobile" />
      <DateField source="lastModifiedDate" />
      <ReferenceArrayField label="Roles test1" reference="roles" source="roleIdList">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceManyField label="Roles test2" reference="roles" target="userId">
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
