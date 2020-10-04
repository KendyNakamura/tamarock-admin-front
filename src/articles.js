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
  Create,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const ArticleFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const ArticleList = (props) => {
  return (
    <List {...props} filters={<ArticleFilter />}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="text" />
        <NumberField source="category" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const ArticleTitle = ({ record }) => {
  return <span>Article {record ? `"${record.title}"` : ""}</span>;
};

export const ArticleEdit = (props) => (
  <Edit title={<ArticleTitle />} {...props}>
    <SimpleForm>
      {/* <TextInput disabled source="id" /> */}
      <TextInput source="title" fullWidth />
      <RichTextInput source="text" />
      <NumberInput source="category" />
    </SimpleForm>
  </Edit>
);

export const ArticleCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <RichTextInput source="text" />
      <NumberInput source="category" initialValue="1" />
    </SimpleForm>
  </Create>
);
