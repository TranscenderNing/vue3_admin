import request from '/utils/request'
// import { RoleResponseData,MenuResponseData } from './type'

enum API{
    ALLPERMISSION_URL = '/admin/acl/permission', 
    ADDPERMISSION_URL = '/admin/acl/permission/save',
    UPDATEPERMISSION_URL = '/admin/acl/permission/update',
    DELETEPERMISSION_URL = '/admin/acl/permission/remove/',
}

// 获取已有角色数据
export const reqAllPermission  = ()=>{
    return request.get<any,any>(API.ALLPERMISSION_URL)
}

// 添加 或者 修改 权限
export const reqAddOrUpdatePermission = (data: any)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEPERMISSION_URL,data)
    }else{
        return request.post<any,any>(API.ADDPERMISSION_URL,data)
    }
}

// 删除菜单
export const reqDeletePermission = (menuId: number)=>{
    return request.delete<any,any>(API.DELETEPERMISSION_URL+menuId)
}