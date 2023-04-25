import {Button, Form, message, Select} from 'antd';
import React, {useState} from 'react';


const plainOptions = []

for (let i = 0; i < 20; i++) {
    plainOptions.push('Apple ' + i);
}

const SelectItems: React.FC = () => {
    const [hideOrDisable, setHideOrDisable] = useState(true);
    const [object, setObject] = useState();
    const [messageApi, contextHolder] = message.useMessage();

    const formSubmit = (values: any) => {
        setSelectedItems(values);
        setObject(JSON.stringify(values));
        messageApi.success(JSON.stringify(values));
    }

    const changeHideOrDisable = () => {
        setHideOrDisable(!hideOrDisable)
    }

    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = plainOptions.filter((o) => !selectedItems.includes(o));

    return (
        <>
            {contextHolder}
            <Form onFinish={formSubmit}>
                <Form.Item label="Permissions">
                    <Select
                        mode="multiple"
                        placeholder="Add or Remove Permissions"
                        value={selectedItems}
                        onChange={formSubmit}
                        disabled={hideOrDisable}
                        style={{
                            width: '100%',
                        }}
                        options={filteredOptions.map((item) => ({
                            value: item,
                            label: item,
                        }))}
                    />
                </Form.Item>
                {hideOrDisable ? <Button type={"primary"} onClick={changeHideOrDisable}>Edit</Button> :
                    <Button type={"primary"} onClick={changeHideOrDisable}>Update</Button>}
            </Form>
        </>
    );
}

export default SelectItems;