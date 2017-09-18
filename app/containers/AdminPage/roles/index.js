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
  SelectArrayInput,
  Show,
  SimpleShowLayout,
} from 'admin-on-rest';

export RoleIcon from 'material-ui/svg-icons/action/book';

export const RoleList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="createdDate" />
      <EditButton basePath="/roles" />
    </Datagrid>
  </List>
);

const RoleTitle = ({ record }) => {
  return <span>Role {record ? `"${record.name}"` : ''}</span>;
};

export const RoleEdit = (props) => {
  return (
    <Edit title={<RoleTitle />} {...props}>
      <SimpleForm>
        <DisabledInput source="id" />
        <TextInput source="name" />
        <DisabledInput label="Created date" source="createdDate" />
      </SimpleForm>
    </Edit>
  );
}

export const RoleCreate = (props) => (
  <Create title="Create a Role" {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const RoleShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <DateField label="Created date" source="createdDate" />
    </SimpleShowLayout>
  </Show>
);
