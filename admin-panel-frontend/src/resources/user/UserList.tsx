import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin';


export const UserList = () => {
    return (
        <List>
            <Datagrid rowClick='edit'>
                <TextField source="username" />
                <BooleanField source="isActive" />
                <DateField source="createdAt"  label="Creadet At" />
                <DateField source="updatedAt"  label="Updated At" />
            </Datagrid>
        </List>
    );
}