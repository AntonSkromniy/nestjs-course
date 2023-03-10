import React, { useMemo } from "react";
import { Admin, Resource } from "react-admin";

// @ts-ignore
import crudProvider from "@fusionworks/ra-data-nest-crud";
import { useAuthProvider, useHttpClient } from "./hooks";
import { UsersResource } from "./resources/user";

function App() {
  const { httpClient, baseUrl } = useHttpClient();
  const { authProvider } = useAuthProvider();

  const dataProvider = useMemo(() => {
    console.log("dataProvider");
    return crudProvider(baseUrl, httpClient);
  }, [httpClient, baseUrl]);

  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider} requireAuth>
      <Resource {...UsersResource} />
    </Admin>
  );
}

export default App;
