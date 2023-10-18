import request from '/utils/request'
import { RoleResponseData,MenuResponseData } from './type'

enum API{
    ALLROLE_URL = '/admin/acl/role/', 
    ADDROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    ALLMENU_URL = '/admin/acl/permission/toAssign/',
    ASSIGN_PERMISSION = '/admin/acl/permission/doAssignAcl',
    DELETE_ROLE_URL = '/admin/acl/permission/remove/'
}

// 获取已有角色数据
export const reqRoleInfo  = (page: number, limit: number, roleName: string)=>{
    return request.get<any,RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)
}

// 添加或者修改角色
export const reqAddOrUpdateRole  = (data: any)=>{
    if(data.id){
        return  request.put<any,any>(API.UPDATEROLE_URL,data)
    }else{
        return  request.post<any,any>(API.ADDROLE_URL,data)
    }
}

// 获取某个用户的权限
export const reqAllMenuByRoleId  = (roleId: number)=>{
    return  request.get<any,MenuResponseData>(API.ALLMENU_URL+roleId)
}

// 确认分配权限 roleId: number, permissionId: number[]
export const reqAssignPermission  = (data:any)=>{
    return  request.post<any,any>(API.ASSIGN_PERMISSION,data)
}


// 删除角色
export const reqDeleteRole  = (roleId:number)=>{
    return  request.delete<any,any>(API.DELETE_ROLE_URL+roleId)
}