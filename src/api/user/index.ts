// 统一管理用户相关的参数
import request from '/utils/request'

import { loginForm, loginResponseData,userInfoResponseData } from './type'

// 统一接口管理
enum API{
    LOGIN_URL='/admin/acl/index/login',
    USERINFO_URL='/admin/acl/index/info',
    LOGOUT_URL='/admin/acl/index/logout',
}

//暴露请求函数
export const reqLogin = (data:loginForm)=> request.post<any,loginResponseData>(API.LOGIN_URL,data)
export const reqUserInfo = () => request.get<any,userInfoResponseData>(API.USERINFO_URL)
export const reqLogout = () => request.post<any,any>(API.LOGOUT_URL)



