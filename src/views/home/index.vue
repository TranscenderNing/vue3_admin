<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { getTime } from '/utils/time'

let userStore = useUserStore()


</script>

<template>
    <div>
        <el-card>
            <div class="box">
                <img :src="userStore.avatar" class="avatar">
                <div class="bottom">
                    <h3 class="title">{{ getTime() }}好！{{ userStore.username }}</h3>
                    <p class="subTitle">后台管理系统</p>
                </div>
            </div>
        </el-card>
        <div class="box1">
            <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .bottom{
        margin-left: 20px;
        margin-top: 20px;

        .title{
            font-size: 20px;
            margin-bottom: 20px;
        }
    }
}

.box1{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
</style>
