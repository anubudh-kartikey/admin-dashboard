import { gql } from '@apollo/client'

const GET_ALL_PERMISSIONS = gql `
    query Permissions {
        permissions {
            id
            permissionCode
            permissionName
            createdAt
        }
    }

`
export { GET_ALL_PERMISSIONS }