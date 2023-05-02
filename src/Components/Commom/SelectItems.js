import {Button, Form, message, Select} from 'antd';
import React, {useState} from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";
import {GET_ALL_PERMISSIONS} from "../Permissions";
import {GET_ALL_ROLES_WITH_ALL_PERMISSION} from "../AssignPermission";

const CREATE_ROLE_PERMISSION = gql`
    mutation CreateRolePermissions($rolePermissions: RolePermissionInput) {
        createRolePermissions(rolePermissions: $rolePermissions)
    }
`

const SelectItems: React.FC = (props) => {
    const presentPermissions = props?.allPermission?.map((permission) => permission.permissionCode);
    const {data, refetch} = useQuery(
        GET_ALL_PERMISSIONS,
        {
            onError(error) {
                console.log(error)
            },
        }
    );
    const [createRolePermission] = useMutation(CREATE_ROLE_PERMISSION, {
        refetchQueries: [GET_ALL_ROLES_WITH_ALL_PERMISSION]
    });
    const plainOptions = data?.permissions?.map((permission) => permission.permissionCode);
    const [hideOrDisable, setHideOrDisable] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const formSubmit = async (values: any) => {
        setSelectedItems(values);
        await createRolePermission({
            variables: {
                rolePermissions: {
                    permissionCodes: values,
                    roleCode: props?.roleCode
                }
            },
            onCompleted() {
                messageApi.success("Permissions updated successfully")
                refetch();
            },
            onError(error) {
                console.log(error)
            }
        });
    }

    const changeHideOrDisable = () => {
        setHideOrDisable(!hideOrDisable)
    }

    const [selectedItems, setSelectedItems] = useState(presentPermissions);
    const filteredOptions = plainOptions?.filter((o) => !selectedItems.includes(o));

    return (
        <>
            {contextHolder}
            <Form onFinish={formSubmit}>
                <Form.Item label="Permissions">
                    <Select
                        mode="multiple"
                        placeholder="Add or Remove Permissions"
                        value={selectedItems}
                        onChange={formSubmit}
                        disabled={hideOrDisable}
                        style={{
                            width: '100%',
                        }}
                        options={filteredOptions?.map((item) => ({
                            value: item,
                            label: item,
                        }))}
                    />
                </Form.Item>
                {hideOrDisable ? <Button type={"primary"} onClick={changeHideOrDisable}>Edit</Button> :
                    <Button type={"primary"} onClick={changeHideOrDisable}>Done</Button>}
            </Form>
        </>
    );
}

export default SelectItems;