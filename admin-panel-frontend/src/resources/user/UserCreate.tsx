import { Create, SimpleForm, TextInput } from "react-admin";

export const UserCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="username" />
        <TextInput source="password" />
      </SimpleForm>
    </Create>
  );
};
