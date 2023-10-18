import { createRouter,createWebHashHistory } from "vue-router"
import { constantRoutes } from "./routes"

let router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior(){
        return {
            top: 0,
            left: 0
        }
    }
})


export function resetRouter (router:any) {
    const newRouter:any = createRouter({
        history: createWebHashHistory(),
        routes: constantRoutes,
        scrollBehavior(){
            return {
                top: 0,
                left: 0
            }
        }
    })
    router.matcher = newRouter.matcher // the relevant part
    return router
}

export default router