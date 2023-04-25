import React from 'react';
import {Collapse, Empty} from 'antd';
import SelectItems from "./Commom/SelectItems";

const {Panel} = Collapse;

const AssignPermission: React.FC = () => {
    return (

        <Collapse accordion>
            <Panel header="ROOT ADMIN" key="1">
                <SelectItems/>
            </Panel>
            <Panel header="BPS ADMIN" key="2">
                <SelectItems/>
            </Panel>
            <Panel header="ACH HIGH ADMIN" key="3">
                <SelectItems/>
            </Panel>
            <Panel header="CUSTOMER" key="4">
                <Empty/>
            </Panel>
        </Collapse>
    );
}

export default AssignPermission;