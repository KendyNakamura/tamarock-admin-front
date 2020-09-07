import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import {
  Filter,
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  SimpleForm,
  SimpleList,
  TextInput,
  ReferenceInput,
  SelectInput,
  Create,
} from "react-admin";

const ArtistFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const ArtistList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props} filters={<ArtistFilter />}>
      {/* {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.views} views`}
          tertiaryText={(record) =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      ) : ( */}
      <Datagrid>
        <TextField source="id" />
        <ReferenceField label="User" source="userId" reference="users">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="title" />
        <TextField source="body" />
        <EditButton />
      </Datagrid>
      {/* )} */}
    </List>
  );
};

const ArtistTitle = ({ record }) => {
  return <span>Artist {record ? `"${record.title}"` : ""}</span>;
};

// export const ArtistEdit = (props) => (
//   <Edit title={<ArtistTitle />} {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" />
//       <ReferenceInput source="userId" reference="users">
//         <SelectInput optionText="name" />
//       </ReferenceInput>
//       <TextInput source="title" />
//       <TextInput multiline source="body" />
//     </SimpleForm>
//   </Edit>
// );

// export const ArtistCreate = (props) => (
//   <Create {...props}>
//     <SimpleForm>
//       <ReferenceInput source="userId" reference="users">
//         <SelectInput optionText="name" />
//       </ReferenceInput>
//       <TextInput source="title" />
//       <TextInput multiline source="body" />
//     </SimpleForm>
//   </Create>
// );
