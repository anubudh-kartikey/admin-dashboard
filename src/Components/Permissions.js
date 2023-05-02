import {Form, Input, InputNumber, message, Popconfirm, Space, Table, Typography} from 'antd';
import {useState} from 'react';
import '../css/Table.css';
import PermissionForm from "./PermissionForm";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import Search from "antd/es/input/Search";


export const GET_ALL_PERMISSIONS = gql`
    query Permissions {
        permissions {
            id
            permissionCode
            permissionName
            createdAt
        }
    }

`

const DELETE_PERMISSION = gql`
    query Query($deletePermissionId: ID!) {
        deletePermission(id: $deletePermissionId)
    }
`

const UPDATE_PERMISSION = gql`
    mutation UpdatePermission($permission: PermissionInput) {
        updatePermission(permission: $permission)
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

function filterIt(arr, searchKey) {
    return arr.filter(function (obj) {
        return Object.keys(obj).some(function (key) {
            return obj[key].includes(searchKey);
        })
    });
}

const Permissions = () => {
    const [messageApi, contextHolder] = message.useMessage();
    let {data, refetch} = useQuery(
        GET_ALL_PERMISSIONS,
        {
            onError(error) {
                console.log(error)
            },
        }
    );

    const [deletePermissionById] = useLazyQuery(DELETE_PERMISSION)
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [updatePermissionById] = useMutation(UPDATE_PERMISSION, {
        refetchQueries: [GET_ALL_PERMISSIONS]
    });
    const onSearch = (value: string) => {
        // setData(filterIt(data, value))
    }


    const isEditing = (record) => record.id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            permissionName: '',
            permissionCode: '',
            ...record,
        });
        setEditingKey(record.id);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (id) => {
        try {
            const row = await form.validateFields();
            await updatePermissionById({
                variables: {
                    permission: {id: id, permissionCode: row.permissionCode, permissionName: row.permissionName}
                },
                onCompleted() {
                    messageApi.success("Permission updated successfully")
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
        await deletePermissionById({
            variables: {
                deletePermissionId: key
            },
            onCompleted() {
                messageApi.success("Permission deleted successfully")
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
            title: 'Permission Name',
            dataIndex: 'permissionName',
            width: '25%',
            editable: true,
        },
        {
            title: 'Permission Code',
            dataIndex: 'permissionCode',
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
                        onClick={() => save(record.id)}
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
                        onConfirm={() => deleteRecord(record.id)}
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
                <Space>
                    <Search placeholder="search permission" allowClear onSearch={onSearch}/>
                    <PermissionForm/>
                </Space>
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
                    dataSource={data?.permissions}
                    rowKey={(record) => record.id}
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
export default Permissions;