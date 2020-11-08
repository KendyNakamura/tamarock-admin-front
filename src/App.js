import * as React from "react";
import { fetchUtils, Admin, Resource } from "react-admin";
import Dashboard from "./Dashboard";
import { ArtistList, ArtistEdit, ArtistCreate } from "./artists";
import { ArticleList, ArticleEdit, ArticleCreate } from "./articles";
import { CategoryList, CategoryEdit, CategoryCreate } from "./categories";
import jsonServerProvider from "ra-data-json-server";
import UserIcon from "@material-ui/icons/Group";
import authProvider from "./authProvider";
import MyLoginPage from "./MyLoginPage";
import MyLogoutButton from "./MyLogoutButton";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

var endpoint = `${process.env.REACT_APP_API_ENDPOINT}/api/admin`;
const dataProvider = jsonServerProvider(endpoint, httpClient);

const App = () => (
  <Admin
    dashboard={Dashboard}
    loginPage={MyLoginPage}
    logoutButton={MyLogoutButton}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="artists"
      list={ArtistList}
      edit={ArtistEdit}
      create={ArtistCreate}
      icon={UserIcon}
    />
    <Resource
      name="articles"
      list={ArticleList}
      edit={ArticleEdit}
      create={ArticleCreate}
    />
    <Resource
      name="categories"
      list={CategoryList}
      edit={CategoryEdit}
      create={CategoryCreate}
    />
  </Admin>
);

export default App;
