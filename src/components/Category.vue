
<script setup lang="ts">
import { onMounted,ref, defineProps} from 'vue'
import useCategoryStore from '@/store/modules/category'

let categoryStore = useCategoryStore()

defineProps(['scene'])

onMounted(()=>{
  getC1()
})

// 向仓库发送请求获取一级分类数据
const getC1 = ()=>{
  categoryStore.getC1()
}

// 一级分类select组件发生变化的回调 保证一级分类id已经存在
const handler = () =>{
  // 清空二，三级分类数据id
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  // 向仓库发送请求 获取二级分类数据
  categoryStore.getC2()
}

// 二级分类select组件发生变化的回调 保证二级分类id已经存在
const handler1 = () =>{
  // 清空三级分类数据id
  categoryStore.c3Id = ''
  // 向仓库发送请求 获取三级分类数据
  categoryStore.getC3()
}


</script>

<template>
  <div>
    <el-card>

      <el-form ref="form" :model="form" label-width="80px" :inline="true">

        <el-form-item label="一级分类">
          <el-select v-model="categoryStore.c1Id" placeholder="" @change="handler" :disabled="scene===1">
            <el-option v-for="item in categoryStore.c1Arr" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="categoryStore.c2Id" placeholder="" @change="handler1" :disabled="scene===1">
            <el-option v-for="item in categoryStore.c2Arr" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.c3Id" placeholder="" :disabled="scene===1">
            <el-option v-for="item in categoryStore.c3Arr" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>


<style></style>