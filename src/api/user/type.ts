// 登录接口需要携带的参数ts类型
export interface loginForm{
    username: string,
    password: string,
}

// 全部接口都拥有的类型
export interface ResponseData{
    code: number,
    message: string,
    ok: boolean
}

// 登录接口返回的类型
export interface loginResponseData extends ResponseData{
    data: string
}

// 获取用户信息接口返回的类型
export interface userInfoResponseData extends ResponseData{
    data:{
        routes: string[],
        buttons: string[],
        roles: string[],
        name: string,
        avatar: string
    }
}









interface userInfo{
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string
}


interface user{
    checkUser: userInfo,
}

export interface userResponseData{
    code: number,
    data: user
}