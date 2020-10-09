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
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  richText: {
    maxWidth: "900px",
  },
});

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
        <NumberField source="category" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const ArticleTitle = ({ record }) => {
  return <span>Article {record ? `"${record.title}"` : ""}</span>;
};

const ArticleForm = (props) => {
  const classes = useStyles();
  return (
    <SimpleForm className={classes.richText} {...props}>
      <TextInput disabled source="id" />
      <TextInput source="title" fullWidth />
      <ImageInput source="pictures" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <RichTextInput source="text" />
      <NumberInput source="category" />
    </SimpleForm>
  );
};

export const ArticleEdit = (props) => {
  return (
    <Edit title={<ArticleTitle />} {...props}>
      <ArticleForm />
    </Edit>
  );
};

export const ArticleCreate = (props) => {
  const classes = useStyles();
  return (
    <Create {...props}>
      <ArticleForm />
    </Create>
  );
};
