export const PermissionList = (data) => {
    let permissionListData = [];
    for (let i = 0; i < 5; i++) {
        permissionListData.push({
            key: i.toString(),
            permissionName: `View user ${i}`,
            permissionCode: `view_user_permission_${i}`,
        });
    }

    if (data) {
        console.log('Data added: ', data);
        permissionListData = [...permissionListData, ...data]
    }
    console.log(permissionListData)
    return permissionListData;
}