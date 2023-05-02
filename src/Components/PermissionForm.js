import {Button, Form, Input, message, Modal, Space} from 'antd';
import React, {useState} from 'react';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {gql, useMutation} from "@apollo/client";
import {GET_ALL_PERMISSIONS} from "./Permissions";

const CREATE_PERMISSIONS = gql`
    mutation CreatePermissions($permissions: [PermissionInput]) {
        createPermissions(permissions: $permissions)
    }
`

const CollectionCreateForm = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Add Permissions"
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
                <Form.List name="permissions">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'permissionName']}
                                        rules={[{required: true, message: 'Missing Permission name'}]}
                                    >
                                        <Input placeholder="Permission Name"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'permissionCode']}
                                        rules={[{required: true, message: 'Missing Permission code'}]}
                                    >
                                        <Input placeholder="Permission Code"/>
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
const PermissionForm = () => {
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [createPermission] = useMutation(CREATE_PERMISSIONS, {
        refetchQueries: [GET_ALL_PERMISSIONS],
    })

    const onCreate = async (values) => {
        await createPermission({
            variables: {
                permissions: values.permissions
            },
            onCompleted() {
                messageApi.success("Permissions created successfully")
            },
            onError(error) {
                console.log(error)
            }
        });

        setOpen(false);

    };
    return (
        <>
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
        </>
    );
};
export default PermissionForm;
