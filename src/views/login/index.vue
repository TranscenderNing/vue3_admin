<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus'

import { reactive, ref, toValue } from 'vue';
import { useRouter,useRoute } from 'vue-router';

import useUserStore from '@/store/modules/user.ts'

import { getTime } from '/utils/time.ts'

let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()

let loginFormElem = ref()


let loginForm = reactive({username: 'admin',password: 'atguigu123'})
let loading = ref(false)


const validatUsername = (rule:any,value:any,callback:any)=>{
    if(value.length >= 5){
        callback()
    }else{
        callback(new Error('账号长度至少5位'))
    }
}

const validatePassword =  (rule: any, value: any, callback: any)=>{
    if(value.length >= 6){
        callback()
    }else{
        callback(new Error('密码长度至少6位'))
    }
}


const rules = {
    username: [
        // {required: true, min: 5, max: 10, message: '账号长度不能小于5,不能超过10', trigger: 'change'}
        {validator: validatUsername, trigger: 'change'}
    ],
    password: [
        // {required: true, min: 5, max: 10, message: '密码长度不能小于5,不能超过10', trigger: 'change'}
        {validator: validatePassword, trigger: 'change'}
    ]
}


const login = async () => {

    // 校验通过发请求
    await loginFormElem.value.validate()

    loading.value = true
    try{
        loading.value = false
        // 像服务器发送请求 数据保存在 pinia仓库中
        let res = await userStore.userLogin(loginForm)
        let redirect:any = $route.query.redirect
        if(redirect){
            $router.push({path: redirect})
        }else{
            $router.push('/')
        }
        ElNotification({
            type: 'success',
            message: '登录成功',
            title: `Hi, ${getTime()}好`
        })

    }catch(error){
        loading.value = false
        ElNotification({
            type: 'error',
            message: '登录失败'
        })
    }

}





</script>

<template>
    <div class="login_container">

        <el-row :gutter="10">
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginFormElem"> 
                    <h1>Hello</h1>
                    <h2>欢迎来到后台管理系统</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" >
                        <el-input type="password" :prefix-icon="Lock" show-password v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
        
    </div>
</template>

<style scoped lang="scss">
.login_container{
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form{
        position: relative;
        top: 30vh;
        width: 80%;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;
        padding: 40px;

        h1{
            color: white;
            font-size: 40px;
        }
        h2{
            font-size: 20px;
            color: white;
            margin: 20px 0px
        }
        .login_btn{
            width: 100%;
        }
    }
    

}
</style>
