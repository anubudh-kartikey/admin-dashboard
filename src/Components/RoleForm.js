import {Button, Form, Input, message, Modal, Space} from 'antd';
import React, {useState} from 'react';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";


const CollectionCreateForm = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Add Roles"
            okText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                name="dynamic_form_nest_item"
                onFinish={onCreate}
                style={{maxWidth: 600}}
                autoComplete="off"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.List name="roleList">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'key']}
                                        initialValue={'P_' + key}
                                    >
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'roleName']}
                                        rules={[{required: true, message: 'Missing Role name'}]}
                                    >
                                        <Input placeholder="Role Name"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'roleCode']}
                                        rules={[{required: true, message: 'Missing Role code'}]}
                                    >
                                        <Input placeholder="Role Code"/>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Add Row
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

            </Form>
        </Modal>
    );
};
const RoleForm = () => {
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();


    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        messageApi.success(JSON.stringify(values));
        setOpen(false);

    };
    return (
        <div>
            {contextHolder}
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                + Add
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default RoleForm;
