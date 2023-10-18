import { createApp } from 'vue'
import App from '@/App.vue'

// 引入elment-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg需要的配置文件
import 'virtual:svg-icons-register'
// 引入全局组件并注册
import gloablComponent from './components/index';
//引入样式
import '@/styles/index.scss'
//引入路由
import router from './router'
//引入仓库
import pinia from './store'

import {isHasButton} from '@/directives/has'


const app = createApp(App)

//自定义指令
isHasButton(app)

app.use(ElementPlus, {
    locale: zhCn
})
app.use(gloablComponent)
app.use(router)
import './permission'
app.use(pinia)

console.log(import.meta.env)

app.mount('#app')
