export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface RoleData{
    id?:number,    
    roleName:string,
    createTime?:string,
    updateTime?:string
    remark?:null
}

export type RoleDataArr = RoleData[]

export interface RoleResponseData extends ResponseData{
    data: {
        records: RoleDataArr[],
        total: number,
    }
}

export interface MenuData{
    id: number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: string,
    toCode: string,
    type: number,
    status: null,
    level: number,
    children?: MenuData[],
    select: boolean
}

export interface MenuResponseData extends ResponseData{
    data:MenuData
}