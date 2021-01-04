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
  ImageInput,
  ImageField,
  Create,
  ReferenceArrayInput,
  ReferenceInput,
  AutocompleteArrayInput,
  SelectInput,
  required,
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

const validateRequired = [required()];

export const ArticleList = (props) => {
  return (
    <List
      {...props}
      filters={<ArticleFilter />}
      sort={{ field: "id", order: "DESC" }}
    >
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
    <SimpleForm className={classes.richText} {...props} redirect="edit">
      <TextInput disabled source="id" />
      <TextInput source="title" validate={validateRequired} fullWidth />
      <ImageField source="pictures" src="src" title="title" />
      <ImageInput
        source="pictures"
        label="Related pictures"
        accept="image/*"
        multiple={true}
      >
        <ImageField src="src" title="title" />
      </ImageInput>
      <TextInput multiline source="text" fullWidth />
      <RichTextInput source="text" validate={validateRequired} disable />
      <ReferenceArrayInput
        label="関連アーティスト"
        source="artist_ids"
        reference="artists"
        sort={{ field: "name", order: "ASC" }}
        fullWidth
      >
        <AutocompleteArrayInput />
      </ReferenceArrayInput>
      <ReferenceInput
        label="カテゴリ"
        source="category"
        reference="categories"
        sort={{ field: "name", order: "ASC" }}
        validate={validateRequired}
        fullWidth
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
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
  return (
    <Create {...props}>
      <ArticleForm />
    </Create>
  );
};
