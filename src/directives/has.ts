import pinia from "@/store"
import useUserStore from "@/store/modules/user"

let userStore = useUserStore(pinia)

export const isHasButton = (app:any)=>{


    console.log(app)
    app.directive('has',{
        mounted(el:any,options:any){
            if(!userStore.buttons.includes(options.value)){
                el.parentNode.removeChild(el)
            }
        },
    })


}