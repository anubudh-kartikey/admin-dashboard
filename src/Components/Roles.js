import {Form, Input, InputNumber, Popconfirm, Table, Typography} from 'antd';
import {useState} from 'react';
import '../css/Table.css';
import RoleForm from "./RoleForm";

let originData = [];
for (let i = 0; i < 5; i++) {
    originData.push({
        key: i.toString(),
        roleName: `ROOT ADMIN ${i}`,
        roleCode: `ROOT_ADMIN_${i}`,
    });
}
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
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            roleName: '',
            roleCode: '',
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
        <>
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
                    dataSource={data}
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