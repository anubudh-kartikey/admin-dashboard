import {Button, Form, Input, InputNumber, message, Modal, Select, Space} from 'antd';
import React, {useState} from 'react';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";


const CollectionCreateForm = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            width={650}
            title="Add Users"
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
                style={{maxWidth: 800}}
                autoComplete="off"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.List name="userList">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 6}} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'key']}
                                        initialValue={'P_' + key}
                                    >
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'userName']}
                                        rules={[{required: true, message: 'Missing User name'}]}
                                    >
                                        <Input placeholder="User Name"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'email']}
                                        rules={[{required: true, message: 'Missing Email', type: "email"}]}
                                    >
                                        <Input placeholder="Email"/>
                                    </Form.Item>
                                    {/*<Form.Item*/}
                                    {/*    {...restField}*/}
                                    {/*    name={[name, 'number']}*/}
                                    {/*    rules={[{required: true, message: 'Missing Number', type: "number"}]}*/}
                                    {/*>*/}
                                    {/*    <InputNumber placeholder="Number"/>*/}
                                    {/*</Form.Item>*/}
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'role']}
                                        rules={[{required: true, message: 'Missing Role'}]}>
                                        <Select placeholder='Select Role' style={{
                                            width: 180,
                                        }}>
                                            <Select.Option value="role1">Role 1</Select.Option>
                                            <Select.Option value="role2">Role 2</Select.Option>
                                            <Select.Option value="role3">Role 3</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Add Row
                                </Button>
                            </Form.Item>
                            {/*<Form.Item>*/}
                            {/*    <SelectItems/>*/}
                            {/*</Form.Item>*/}
                        </>
                    )}
                </Form.List>

            </Form>
        </Modal>
    );
};
const UserForm = () => {
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
export default UserForm;
