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
  BooleanInput,
  BooleanField,
} from 'admin-on-rest';
export ManagerIcon from 'material-ui/svg-icons/action/book';

export const ManagerList = (props) => (
  <List {...props} filter={{ active: true }}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <DateField source="createdDate" />


      <ReferenceManyField label="Roles" reference="roles" target="userId">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceManyField>


      <BooleanField source="active" />
      <EditButton basePath="/managers" />
    </Datagrid>
  </List>
);

const ManagerTitle = ({ record }) => {
  return <span>Manager {record ? `"${record.username}"` : ''}</span>;
};

export const ManagerEdit = (props) => {
  return (
    <Edit title={<ManagerTitle />} {...props}>
      <SimpleForm>
        <DisabledInput source="id" />
        <TextInput source="username" />
        <DateInput label="Created date" source="createdDate" />
        <BooleanInput source="active" defaultValue={false} />

      </SimpleForm>
    </Edit>
  );
}

export const ManagerCreate = (props) => (
  <Create title="Create a Manager" {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="password" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);
