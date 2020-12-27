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

const myDataProvider = {
  ...dataProvider,
  update: (resource, params) => {
    if (resource !== "articles" || !params.data.pictures) {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }
    /**
     * For posts update only, convert uploaded image in base 64 and attach it to
     * the `picture` sent property, with `src` and `title` attributes.
     */

    // Freshly dropped pictures are File objects and must be converted to base64 strings
    const newPictures = params.data.pictures.filter(
      (p) => p.rawFile instanceof File
    );
    const formerPictures = params.data.pictures.filter(
      (p) => !(p.rawFile instanceof File)
    );

    // const newPictures = params.data.pictures;

    return Promise.all(newPictures.map(convertFileToBase64))
      .then((base64Pictures) =>
        base64Pictures.map((picture64) => ({
          src: picture64,
          title: `${params.data.title}`,
        }))
      )
      .then((transformedNewPictures) =>
        dataProvider.update(resource, {
          ...params,
          data: {
            ...params.data,
            pictures: [...transformedNewPictures, ...formerPictures],
          },
        })
      );
  },
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });

const App = () => (
  <Admin
    dashboard={Dashboard}
    loginPage={MyLoginPage}
    logoutButton={MyLogoutButton}
    authProvider={authProvider}
    dataProvider={myDataProvider}
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
