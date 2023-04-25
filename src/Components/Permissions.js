import {Form, Input, InputNumber, Popconfirm, Table, Typography} from 'antd';
import {useState} from 'react';
import '../css/Table.css';
import PermissionForm from "./PermissionForm";
import {PermissionList} from "../Utils/Constants";
import {useQuery} from "@apollo/client";
import {GET_ALL_PERMISSIONS} from "../GraphQL/Query/Query";

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


const Permissions = () => {
    let originData = PermissionList();
    const { response, loading } = useQuery(
        GET_ALL_PERMISSIONS,
        {
            onError(error) {
                console.log(error)
            },
        }
    )
    console.log('data coming from the network: ',response)
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            permissionName: '',
            permissionCode: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteRecord = async (key) => {
        originData = originData.filter(record => record.key !== key);
        setData(originData);
        setEditingKey('');
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
                        onClick={() => save(record.key)}
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
                        onConfirm={() => deleteRecord(record.key)}
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
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <PermissionForm/>
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
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
};
export default Permissions;