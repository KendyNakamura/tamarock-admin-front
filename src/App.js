import * as React from "react";
import { fetchUtils, Admin, Resource } from "react-admin";
import Dashboard from "./Dashboard";
import { ArtistList, ArtistEdit, ArtistCreate } from "./artists";
import { UserList } from "./users";
import jsonServerProvider from "ra-data-json-server";
import ArtistIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import authProvider from "./authProvider";

const fetchJson = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  options.headers.set("Access-Control-Allow-Origin", "*");

  return fetchUtils.fetchJson(url, options);
};
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const dataProvider = jsonServerProvider(
  "http://localhost:5010/admin",
  fetchJson
);
const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="artists"
      list={ArtistList}
      // edit={ArtistEdit}
      // create={ArtistCreate}
      icon={UserIcon}
    />
    {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
  </Admin>
);

export default App;
