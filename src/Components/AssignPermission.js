import React from 'react';
import {Collapse} from 'antd';
import SelectItems from "./Commom/SelectItems";
import {gql, useQuery} from "@apollo/client";

const {Panel} = Collapse;

export const GET_ALL_ROLES_WITH_ALL_PERMISSION = gql`
    query GetAllRolesWithAllPermission {
        getAllRolesWithAllPermission {
            _id
            roleCode
            roleName
            createdAt
            permission {
                id
                permissionCode
                permissionName
                createdAt
            }
        }
    }
`

const AssignPermission: React.FC = () => {
    const {data} = useQuery(
        GET_ALL_ROLES_WITH_ALL_PERMISSION,
        {
            onError(error) {
                console.log(error)
            }
        }
    );
    return (

        <Collapse accordion>
            {data?.getAllRolesWithAllPermission?.map(value => (
                <Panel header={value.roleName} key={value.roleCode}>
                    <SelectItems allPermission={value?.permission} roleCode={value.roleCode}/>
                </Panel>
            ))}
        </Collapse>
    );
}

export default AssignPermission;