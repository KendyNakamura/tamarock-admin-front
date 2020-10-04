import * as React from "react";
import {
  Filter,
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
  Create,
} from "react-admin";

const ArtistFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const ArtistList = (props) => {
  return (
    <List {...props} filters={<ArtistFilter />}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="artist_id" label="ArtistID" />
        <TextField source="name" />
        <TextField source="url" />
        <TextField source="twitter_id" label="TwitterID" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const ArtistTitle = ({ record }) => {
  return <span>Artist {record ? `"${record.title}"` : ""}</span>;
};

export const ArtistEdit = (props) => (
  <Edit title={<ArtistTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="artist_id" label="ArtistID" />
      <TextInput source="name" fullWidth />
      <TextInput source="url" fullWidth />
      <TextInput source="twitter_id" label="TwitterID" fullWidth />
    </SimpleForm>
  </Edit>
);

export const ArtistCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="artist_id" label="ArtistID" />
      <TextInput source="name" fullWidth />
      <TextInput source="url" fullWidth />
      <TextInput source="twitter_id" label="TwitterID" fullWidth />
    </SimpleForm>
  </Create>
);
