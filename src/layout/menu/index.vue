<script setup lang="ts">
import { useRouter } from 'vue-router'

let $router = useRouter()
console.log('router:',$router)

defineProps(['menuList'])

const goRoute = (vc:any) => {
    console.log(vc)
    $router.push(vc.index)
}

</script>


<script lang="ts">
    export default{
        name: 'Menu'
    }
</script>


<template>
    <div>

        <template v-for="item in menuList" >
                <el-menu-item :key="item.path"  v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRoute">
                    <el-icon>
                            <component :is="item.meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span>{{ item.meta.title  }}</span>
                    </template>
                </el-menu-item>
                
                <el-menu-item :key="item.path"  v-if="item.children && item.children.length === 1 && !item.children[0].meta.hidden " :index="item.children[0].path" @click="goRoute">
                    <el-icon>
                            <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span>{{ item.children[0].meta.title  }}</span>
                    </template>
                </el-menu-item>

                <el-sub-menu :key="item.path"  v-if="item.children && item.children.length > 1 && !item.meta.hidden" :index="item.path">
                    <template #title>
                        <el-icon>
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    <Menu :menuList="item.children"></Menu>
                </el-sub-menu>
        </template> 
        
        
    </div> 




</template>



<style scoped>

</style>