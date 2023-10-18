<script setup lang="ts">

</script>

<template>
    <div class="logo">
        <img src="../../../public/logo.png" >
        <p>后台管理平台</p>
    </div>
</template>

<style scoped lang="scss">
.logo{
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;
    img{
        width: 40px;
        height: 40px;
    }
    p{
        font-size: $base-logo-title-fontSize;
        margin-left: 20px;
    }
}

</style>
