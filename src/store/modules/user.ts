// 创建用户相关的 状态管理仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { loginForm, loginResponseData,userInfoResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import {SET_TOKEN,GET_TOKEN,REMOVE_TOKEN} from '/utils/token.ts'
import { constantRoutes, asyncRoutes, anyRoute }from '@/router/routes.ts'
import router from '@/router'
import cloneDeep from 'lodash/cloneDeep'

// 过滤异步路由 获取用户可以访问的路由
const filterAsyncRoutes = (asyncRoute : any, routes : any)=>{
    return asyncRoute.filter(item =>{
        if(routes.includes(item.name)){
            if(item.children && item.children.length > 0){
                item.children = filterAsyncRoutes(item.children,routes)
            }
            return true
        }
    })
}


let useUserStore = defineStore('User',{
    state: ():UserState=>{
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoutes,  //用于生成左侧布局的菜单项
            username: '',
            avatar: '',
            buttons: [],
        }
    },
    actions:{
        // 登录
        async userLogin(data: loginForm){
            let res:loginResponseData = await reqLogin(data)
            if(res.code === 200){
                this.token = res.data as string
                SET_TOKEN(res.data as string)
                return 'ok'
            }else{
                return Promise.reject(new Error(res.data))
            }
        } ,
       async userInfo(){
            let res: userInfoResponseData = await reqUserInfo()
            if(res.code === 200){
                this.username = res.data.name
                this.avatar  = res.data.avatar
                this.buttons = res.data.buttons
                // 获取用户可以访问的动态路由
                // let asyncRoutesDeepCopy = JSON.parse(JSON.stringify(asyncRoutes))
                let asyncRoutesDeepCopy = cloneDeep(asyncRoutes)
                console.log(asyncRoutesDeepCopy,res.data.routes,'deep')
                let userAsyncRoutes = filterAsyncRoutes(asyncRoutesDeepCopy,res.data.routes)
                this.menuRoutes = [...constantRoutes,...userAsyncRoutes,anyRoute]
                // 注册 动态路由 和 任意路由
                let arr = [...userAsyncRoutes,anyRoute]

                console.log('arr',arr,router.getRoutes())
                arr.forEach(item => {
                    router.addRoute(item)
                    console.log(6)
                }) 
                console.log('fasfsjdaklflk;dsaflkjsadkfuserAsyncRoutes',userAsyncRoutes,router.getRoutes())
                return 'ok'
            }else{
                return Promise.reject(new Error('获取用户信息失败'))
            }
       },
       async userLogout(){
            // 向服务器发送请求
            let res:any = await reqLogout()
            if(res.code === 200){
                // 清空仓库数据 和 本地存储数据
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()
                return 'ok'
            }else{
                return Promise.reject(new Error('退出失败'))
            }


       }
    },
    getters:{

    }
})

export default useUserStore