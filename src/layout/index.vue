<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import TabBar from './tabbar/index.vue'

import useUserStore from '@/store/modules/user.ts'
import  useLayOutSettingStore  from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router'
import { watch,ref,nextTick } from 'vue'

let userStore = useUserStore()
let layOutStore = useLayOutSettingStore()
let $route = useRoute()

let flag = ref(true)

watch(()=>layOutStore.refresh,()=>{
    console.log('刷新')
    flag.value = false
    nextTick(()=>{
        flag.value = true
    })
})



</script>

<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{fold: layOutStore.fold? true:false}">
            <Logo />
            <el-scrollbar  class="scrolbar" >
                <el-menu background-color="#001529" text-color="white" :default-active="$route.path" :collapse="layOutStore.fold? true:false">
                    <Menu :menuList="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_top" :class="{fold: layOutStore.fold? true:false}">
            <TabBar />
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{fold: layOutStore.fold? true:false}">
            <router-view v-if="flag"></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;


    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        color: white;
        transition: all .3s;
        &.fold{
            width: $base-menu-min-width;
        }

        .scrolbar{
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_top {
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        position: fixed;
        top: 0px;
        left: $base-menu-width;
        // padding:  20px;
        transition: all .3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
        

    }

    .layout_main {
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        position: absolute;
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all .3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
        
    }
}
</style>
