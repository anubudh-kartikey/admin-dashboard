import {Form, Input, InputNumber, message, Popconfirm, Table, Typography} from 'antd';
import {useState} from 'react';
import '../css/Table.css';
import RoleForm from "./RoleForm";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";

export const GET_ALL_ROLES = gql`
    query Roles {
        roles {
            _id
            roleCode
            roleName
            createdAt
        }
    }
`

const DELETE_ROLE = gql`
    query Query($deleteRoleId: ID!) {
        deleteRole(id: $deleteRoleId)
    }
`

const UPDATE_ROLE = gql`
    mutation UpdateRole($role: RoleInput) {
        updateRole(role: $role)
    }
`

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const Roles = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    let {data, refetch} = useQuery(
        GET_ALL_ROLES,
        {
            onError(error) {
                console.log(error)
            },
        }
    )

    const [deleteRoleById] = useLazyQuery(DELETE_ROLE);
    const [editingKey, setEditingKey] = useState('');
    const [updateRoleById] = useMutation(UPDATE_ROLE, {
        refetchQueries: [GET_ALL_ROLES]
    });

    const isEditing = (record) => record._id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            roleName: '',
            roleCode: '',
            ...record,
        });
        setEditingKey(record._id);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (id) => {
        try {
            const row = await form.validateFields();
            await updateRoleById({
                variables: {
                    role: {id: id, roleCode: row.roleCode, roleName: row.roleName}
                },
                onCompleted() {
                    messageApi.success("Role updated successfully")
                    setEditingKey('');
                },
                onError(error) {
                    messageApi.error(error.message)
                    console.log(error)
                }
            });
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteRecord = async (key) => {
        await deleteRoleById({
            variables: {
                deleteRoleId: key
            },
            onCompleted() {
                messageApi.success("Role deleted successfully")
                refetch();
            },
            onError(error) {
                messageApi.error(error.message)
                console.log(error)
            }
        });
    }

    const columns = [
        {
            title: 'Role Name',
            dataIndex: 'roleName',
            width: '25%',
            editable: true,
        },
        {
            title: 'Role Code',
            dataIndex: 'roleCode',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);

                return (
                    <div>
                        {editable ? (
                            <span>
                    <Typography.Link
                        onClick={() => save(record._id)}
                        style={{marginRight: 8}}
                    >
                        Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <a>Cancel</a>
                    </Popconfirm>
                </span>
                        ) : (
                            <span>
                    <Typography.Link
                        disabled={editingKey !== ''}
                        onClick={() => edit(record)}
                        style={{marginRight: 8}}
                    >
                        Edit
                    </Typography.Link>
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => deleteRecord(record._id)}
                    >
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                </span>
                        )}
                    </div>
                );
            }

        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            {contextHolder}
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <RoleForm/>
            </div>
            <br/>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    rowKey={(record) => record._id}
                    dataSource={data?.roles}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </>

    );
};
export default Roles;