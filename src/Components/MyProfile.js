import {Button, Form, Input, InputNumber, message} from 'antd';
import {useState} from "react";
import ProfileUpload from "./Commom/ProfileUpload";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */


const MyProfile = () => {
    const [object, setObject] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values) => {
        console.log(values);
        setObject(JSON.stringify(values));
        messageApi.success(JSON.stringify(values));
    };


    return (
        <>
            {contextHolder}
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <ProfileUpload/>
                </div>
                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    initialValue={'Kartikey Gupta'}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    initialValue={'kartikey@anubudh.com'}
                    rules={[
                        {
                            type: 'email',
                            required: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item name={['user', 'phone']}
                           rules={[
                               {
                                   required: true,
                               },
                           ]}
                           initialValue={7566437956} label="Phone">
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['user', 'age']}
                    label="Age"
                    initialValue={23}
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            max: 99,
                        },
                    ]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item name={['user', 'address']}
                           rules={[
                               {
                                   required: true,
                               },
                           ]}
                           initialValue={'01, Housing board colony, Vijay Nagar, Indore, M.P - 452010'} label="Address">
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>

        </>
    );
}
export default MyProfile;