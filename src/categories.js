import * as React from "react";
import {
  Filter,
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ImageInput,
  ImageField,
  Create,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  required,
  number,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  richText: {
    maxWidth: "900px",
  },
});

const CategoryFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

const validateCategory = [number(), required()];

export const CategoryList = (props) => {
  return (
    <List {...props} filters={<CategoryFilter />}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const CategoryTitle = ({ record }) => {
  return <span>Category {record ? `"${record.name}"` : ""}</span>;
};

const CategoryForm = (props) => {
  const classes = useStyles();
  return (
    <SimpleForm className={classes.richText} {...props}>
      <TextInput disabled source="id" />
      <TextInput source="name" fullWidth />
    </SimpleForm>
  );
};

export const CategoryEdit = (props) => {
  return (
    <Edit title={<CategoryTitle />} {...props}>
      <CategoryForm />
    </Edit>
  );
};

export const CategoryCreate = (props) => {
  return (
    <Create {...props}>
      <CategoryForm />
    </Create>
  );
};
