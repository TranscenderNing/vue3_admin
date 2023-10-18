import type { RouteRecordRaw } from "vue-router"
import { CategoryObj } from "@/api/product/attr/type"

export interface UserState{
    token: string|null,
    menuRoutes: RouteRecordRaw[],
    username: string,
    avatar: string,
    buttons: string[]
}

// 分类仓库 state 对象的ts类型
export interface CategoryState{
    c1Arr: CategoryObj[],
    c2Arr: CategoryObj[],
    c3Arr: CategoryObj[],
    c1Id: string | number,
    c2Id: string | number,
    c3Id: string | number,
}