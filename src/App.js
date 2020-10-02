import * as React from "react";
import { fetchUtils, Admin, Resource } from "react-admin";
import Dashboard from "./Dashboard";
import { ArtistList, ArtistEdit, ArtistCreate } from "./artists";
import { ArticleList, ArticleEdit, ArticleCreate } from "./articles";
import jsonServerProvider from "ra-data-json-server";
import UserIcon from "@material-ui/icons/Group";
import authProvider from "./authProvider";
import MyLoginPage from "./MyLoginPage";
import MyLogoutButton from "./MyLogoutButton";
import { createBrowserHistory as createHistory } from "history";

const history = createHistory({ basename: "admin" });

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider("/api/admin", httpClient);

const App = () => (
  <Admin
    dashboard={Dashboard}
    loginPage={MyLoginPage}
    logoutButton={MyLogoutButton}
    authProvider={authProvider}
    dataProvider={dataProvider}
    history={history}
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
  </Admin>
);

export default App;
