import {
  Edit,
  Button,
  TextField,
  TextInput,
  SimpleForm,
  ReferenceManyField,
  useEditContext,
  Datagrid,
  useNotify,
  useRefresh,
} from "react-admin";
import { useHttpClient } from "../../hooks";

const RecomendationsGrid = () => {
  const { record } = useEditContext();
  return (
    <ReferenceManyField
      label="Reccomendations"
      reference={`user/${record?.id}/recommendation`}
      target="userId"
    >
      <Datagrid>
        <TextField source="description" />
      </Datagrid>
    </ReferenceManyField>
  );
};

const ReccomendButton = () => {
  const { httpClient, baseUrl } = useHttpClient();
  const { record } = useEditContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleClick = async () => {
    try {
      const response = await httpClient(
        `${baseUrl}/user/${record?.id}/recommendation`,
        {
          method: "POST",
          body: JSON.stringify({
            description: "test",
          }),
        }
      );
      if (response.status !== 201) throw new Error();

      notify("Recommendation set", { type: "success" });
      refresh();
    } catch (e) {
      notify("Something went wrong set", { type: "error" });
    }
  };

  return <Button label="Reccomend" onClick={handleClick} />;
};

export const UserEdit = () => {
  return (
    <Edit
      actions={
        <>
          <ReccomendButton />
        </>
      }
    >
      <SimpleForm>
        <TextInput source="username" />
      </SimpleForm>
      <RecomendationsGrid />
    </Edit>
  );
};
