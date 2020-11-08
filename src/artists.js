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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  richText: {
    maxWidth: "900px",
  },
});

const ArtistFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const ArtistList = (props) => {
  return (
    <List
      {...props}
      filters={<ArtistFilter />}
      sort={{ field: "name", order: "ASC" }}
    >
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

const ArtistForm = (props) => {
  const classes = useStyles();
  return (
    <SimpleForm className={classes.richText} {...props}>
      <TextInput disabled source="id" />
      <TextInput source="artist_id" label="ArtistID" />
      <TextInput source="name" fullWidth />
      <TextInput source="url" fullWidth />
      <TextInput source="twitter_id" label="TwitterID" fullWidth />
    </SimpleForm>
  );
};

export const ArtistEdit = (props) => (
  <Edit title={<ArtistTitle />} {...props}>
    <ArtistForm />
  </Edit>
);

export const ArtistCreate = (props) => (
  <Create {...props}>
    <ArtistForm />
  </Create>
);
