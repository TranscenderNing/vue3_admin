// 路由鉴权
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import pinia from './store'
import useUserStore from '@/store/modules/user.ts'


let userStore = useUserStore(pinia)


// 全局前置守卫
// 用户登录成功不能访问 登录界面
// 用户没有登录 只能访问 登录界面 
router.beforeEach(async (to:any,from:any,next:any)=>{
    document.title = '后台管理系统-'+to.meta.title 
    nprogress.start()
    let token  = userStore.token
    let username = userStore.username
    // 用户登录成功
    if(token){
        if(to.path === '/login'){
            next({path: '/'})
        }else{
            if(username){
                next()
            }else{
                try{
                    await userStore.userInfo()  
                    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',to.path,router.getRoutes())
                    next({...to})
                    // next()
                }catch(error){
                    // 根据token获取不到用户信息 所以token失效
                    await userStore.userLogout()
                    next({ path:'/login',query: {redirect: to.path} })
                }
            }
        }
    }else{
        // 用户未登录
        if(to.path === '/login'){
            next()
        }else{
            next({ path: '/login', query: {redirect: to.path} })
        } 
    }
})


router.afterEach((to:any,from:any,next:any) =>{
    nprogress.done()

})

export default router 