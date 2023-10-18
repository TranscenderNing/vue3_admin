
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import  useLayOutSettingStore  from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'


let layOutStore = useLayOutSettingStore()
let userStore = useUserStore()
let $route = useRoute()
let $router = useRouter()


// 颜色选择器组件相关的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const changeTopicColor = ()=>{
    const el = document.documentElement
    // 设置 css 变量
    el.style.setProperty('--el-color-primary', color.value)
}

// 收集开关的数据
let isDark = ref<boolean>(false)

const changeDarkMode = ()=>{
    let html = document.documentElement
    if(isDark.value){
        html.className = 'dark'
    }else{
        html.className = ''
    }
}


console.log('route matched', $route.matched)


// 点击 改变折叠状态 图标 的回调
const changeIcon = () => {
    layOutStore.fold = !layOutStore.fold
}

// 点击 刷新 按钮的回调
const  updateRefresh = ()=>{
    layOutStore.refresh = !layOutStore.refresh
}

// 点击 全屏按钮 的回调
const FullScreen = ()=>{
    // dom对象的属性 可以用来判断当前是否为全屏
    let full = document.fullscreenElement
    if(!full){
        document.documentElement.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
}

// 点击 退出登录按钮的 回调
const logout = async () =>{

    try{
        // 向服务器发送请求 并且 清除仓库中用户数据 本地存储数据
        let res = await userStore.userLogout()
        // 跳转到登录页面
        $router.push({path:'/login',query:{redirect: $route.path}})
    }catch(error){
        alert("退出登录失败")
    }

}

</script>



<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <!-- 图标 -->
            <el-icon style="margin-right: 10px;" @click="changeIcon">
                <component :is=" fold? 'Fold':'Expand' "></component>
            </el-icon>
            <!-- 面包屑 -->
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
                    <el-icon style="margin: 0px 2px;">
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>

        <div class="tabbar_right">
            <el-button  size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
            <el-button  size="small" icon="FullScreen" circle @click="FullScreen"></el-button>
            <el-popover
                placement="bottom"
                title="主题设置"
                :width="300"
                trigger="hover"
            >

                <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="主题颜色">
                            <el-color-picker @change="changeTopicColor" v-model="color" show-alpha :predefine="predefineColors" size="small" />
                        </el-form-item>
                        <el-form-item label="暗黑模式">
                            <el-switch
                                v-model="isDark"
                                size="small"
                                active-icon="Moon"
                                inactive-icon="Sunny"
                                @change="changeDarkMode"
                            />
                        </el-form-item>
                </el-form>
                <template #reference>
                    <el-button  size="small" icon="Setting" circle @click="setTopicColor"></el-button>
                </template>
            </el-popover>

            <img :src="userStore.avatar" alt="" style="width: 24px ; height: 24px; margin: 0px 10px;border-radius: 50%" >

            <el-dropdown :hide-on-click="false" >
                    <span class="el-dropdown-link">
                        {{ userStore.username }}
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
            </el-dropdown>



        </div>

    </div>
</template>

<style lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // background-image: linear-gradient(to right, white, rgb(226, 212, 212), rgb(247, 236, 236));

    .tabbar_left{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar_right{
        display: flex;
        align-items: center;
    }
}
</style>