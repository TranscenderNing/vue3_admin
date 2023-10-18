<script setup lang="ts">
import { useRouter } from 'vue-router'

let $router = useRouter()
const toHomePage = ()=>{

    $router.push('/home')
}

</script>

<template>
<div class="box">
    <img src="../../assets/images/error_images/404.png">
    <el-button type="primary" @click="toHomePage">首页</el-button>
</div>
</template>

<style scoped lang="scss">
.box{
    width: 100vw;
    height: 100vh;
    background: yellowgreen;
    display: flex;
    justify-content: center;
    img{
        width: 800px;
        height: 400px;
    }
}
</style>
