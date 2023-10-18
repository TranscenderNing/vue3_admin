// 统一管理用户相关的参数
import type { loginForm,loginResponseData,userResponseData } from './type'
import request from '/utils/request'

// 统一接口管理
enum API{
    LOGIN_URL='/user/login',
    USERINFO_URL='/user/info'
}

//暴露请求函数
export const reqLogin = (data:loginForm)=> request.post<any,loginResponseData>(API.LOGIN_URL,data)
export const reqUserInfo = () => request.get<any,userResponseData>(API.USERINFO_URL)



