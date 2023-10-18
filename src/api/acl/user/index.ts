import request from '/utils/request'
import { UserResponseData,AllRoleResponseData,AssignRoleParam } from './type'

enum API{
    ALLUSER_URL = '/admin/acl/user/',
    ADDUSER_URL = '/admin/acl/user/save',
    UPDATEUSER_URL = '/admin/acl/user/update',
    ALLROLE_URL = '/admin/acl/user/toAssign/',
    ASIGNROLE_URL = '/admin/acl/user/doAssignRole/',
    DELETEUSER_URL = '/admin/acl/user/remove/',
    BATCHDELETEUSER_URL = '/admin/acl/user/batchRemove',
}

// 获取已有用户数据
export const reqUserInfo  = (page: number, limit: number, username: string)=>{
    return request.get<any,UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)
}



// 添加或者修改用户
export const reqAddOrUpdateUser  = (data: any)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEUSER_URL,data)
    }else{
        return request.post<any,any>(API.ADDUSER_URL,data)
    }
}


// 获取全部职位 当前账号拥有的职位
export const reqAllRole = (userId: number)=>{
    return request.get<any,AllRoleResponseData>(API.ALLROLE_URL + userId)
}


// 给用户分配角色
export const reqAsignRole = (data: AssignRoleParam)=>{
    return request.post<any,AllRoleResponseData>(API.ASIGNROLE_URL,data)
}


// 删除用户信息
export const reqDeleteUser = (userId: number)=>{
    return request.delete<any,any>(API.DELETEUSER_URL+userId)
}


// 批量删除用户信息
export const reqBatchDeleteUser = (idList: number[])=>{
    return request.delete<any,any>(API.BATCHDELETEUSER_URL,{data: idList})
}