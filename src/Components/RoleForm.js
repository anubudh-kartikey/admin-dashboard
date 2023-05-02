import {Button, Form, Input, message, Modal} from 'antd';
import React, {useState} from 'react';
import {gql, useMutation} from "@apollo/client";
import {GET_ALL_ROLES} from "./Roles";

const CREATE_ROLE = gql`
    mutation CreateRole($role: RoleInput) {
        createRole(role: $role)
    }
`

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
                <Form.Item
                    name={'roleName'}
                    rules={[{required: true, message: 'Missing Role name'}]}
                >
                    <Input placeholder="Role Name"/>
                </Form.Item>
                <Form.Item
                    name={'roleCode'}
                    rules={[{required: true, message: 'Missing Role code'}]}
                >
                    <Input placeholder="Role Code"/>
                </Form.Item>

            </Form>
        </Modal>
    );
};
const RoleForm = () => {
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [createRole] = useMutation(CREATE_ROLE, {
        refetchQueries: [GET_ALL_ROLES],
    })

    const onCreate = async (values) => {
        await createRole({
            variables: {
                role: values
            },
            onCompleted() {
                messageApi.success("Role created successfully")
            },
            onError(error) {
                messageApi.error(error.message)
                console.log(error)
            }
        });
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
