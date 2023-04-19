import React, {useState} from 'react';
import {Button, Card, Checkbox, Form, Input, Alert, message} from 'antd';
import '../css/SignIn.css';

const SignIn: React.FC = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [object, setObject] = useState();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setIsSuccess(true);
        setObject(JSON.stringify(values));
        messageApi.success(JSON.stringify(values));

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        messageApi.error(JSON.stringify(errorInfo));
    };


    return (
        <div className="d-flex justify-content-center align-items-center alignCenter">
            {contextHolder}
            <Card title="Sign In" bordered={true} style={{width: 500}}>
                {/*{isSuccess ? <Alert message={object} banner={true} type="success" showIcon/> : ''}*/}
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    size={'large'}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}


export default SignIn;