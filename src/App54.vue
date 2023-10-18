<script setup lang="ts">
  import {Plus} from '@element-plus/icons-vue'
  import Test from '@/components/Test.vue'
  import request from '/utils/request'
  import { onMounted } from 'vue';
  import TableComponent from '@/components/TableComponent.vue'
  import ModelTable from '@/components/ModelTable.vue'
  import { reqLogin } from './api/user';

  onMounted(() => {
    reqLogin({username: 'admin',password:'111111'})
  })

</script>

<template>
  <div>

    <TableComponent v-show="false" />
    <ModelTable v-show="true" />

  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: yellowgreen;
  }
}

</style>
