<script setup lang="ts">

  import { onMounted } from 'vue';

  import {reqLogin} from './api/user'

  onMounted(() => {
    reqLogin({username: 'admin',password:'111111'})
  })

</script>

<template>
  <div>
    <router-view></router-view>

  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: yellowgreen;
  }
}

</style>
