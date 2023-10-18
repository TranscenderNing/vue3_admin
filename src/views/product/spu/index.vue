
<script setup lang="ts">

import { ref, watch, onBeforeUnmount } from "vue";
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu, reqSKuInfo, deleteSPU } from '@/api/product/spu'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'
import { ElMessage } from "element-plus";



let categoryStore = useCategoryStore()

// 控制切换场景  分类组件中 下拉框是否能够使用 
let scene = ref(0)
// 控制对话框显示和隐藏
let dialogVisible = ref(false)
// 分页相关数据
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(100)
let spuList = ref<any>([])

// 存储SKU数据
let skuArr = ref<any>([])

// 获取子组件spuForm 和 skuForm 的实例
let spuVc = ref()
let skuVc = ref()

// 监听仓库中的 category3Id
watch(() => categoryStore.c3Id, () => {
  getSpuData()
})

// 分页相关回调
const handleSizeChange = (pageSize) => {
  limit.value = pageSize
  getSpuData()
}

// 向服务器发送请求获取数据 分页器改变页码的回调
const getSpuData = async (page = 1) => {
  pageNo.value = page
  let res = await reqHasSpu(pageNo.value, limit.value, categoryStore.c3Id)
  if (res.code === 200) {
    spuList.value = res.data.records
    total.value = res.data.total
  }
}

// 添加SPU回调
const addApu = () => {
  scene.value = 1
  spuVc.value.initAddSpuData(categoryStore.c3Id)
}

// 更新SPU回调
const updateSpu = (row) => {
  console.log(spuVc.value.initHasSpuData)
  spuVc.value.initHasSpuData(row)
  scene.value = 1
}

// 删除SPU回调
const deleteSpu = async (row) => {
  let res = await deleteSPU(row.id)
  if(res.code === 200){
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getSpuData(spuList.value.length > 1? pageNo.value : pageNo.value - 1)
  }else{
    ElMessage({
      type: 'success',
      message: '删除失败'
    })
  }
}

// 添加SKU回调
const addSku = (row) => {
  scene.value = 2
  skuVc.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
// 查看SKU回调
const lookUpSku = async (row) => {

  let res = await reqSKuInfo(row.id)
  if (res.code === 200) {
    skuArr.value = res.data
    dialogVisible.value = true
  }
}

// 触发子组件自定义事件 执行的回调
const chageScene = ({ scene1, updateOrAdd }) => {
  scene.value = scene1
  getSpuData(updateOrAdd == 'update' ? pageNo.value : 1)
}


// 路由跳转 清除仓库中分类数据
onBeforeUnmount(() => {
   categoryStore.$reset()
})


</script>

<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px;">
      <!-- 三个场景切换： 展示SPU（0）；添加修改SPU（1）；添加SKU（2） -->
      <!-- 展示SPU（0）； -->
      <div v-show="scene === 0">
        <el-button type="primary" icon="Plus" size="default" @click="addApu">添加SPU</el-button>

        <el-table :data="spuList" style="width: 100%; margin: 10px 0px" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width" align="center">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width" align="center">
            <template #="{ row, $index }">
              <el-button type="primary" icon="Plus" size="small" title="添加SKU" @click="addSku(row)"></el-button>
              <el-button type="warning" icon="Edit" size="small" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="info" icon="View" size="small" title="查看SKU" @click="lookUpSku(row)"></el-button>
              <el-button type="danger" icon="Delete" size="small" title="删除SPU" @click="deleteSpu(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="getSpuData" :current-page="pageNo"
          :page-sizes="[3, 5, 7]" :page-size="limit" layout="prev, pager, next, jumper, -> , sizes, total" :total="total">
        </el-pagination>

      </div>
      <!-- 添加修改SPU（1） -->
      <SpuForm ref="spuVc" v-show="scene === 1" @chageScene="chageScene" />
      <!-- 添加SKU（2） -->
      <SkuForm ref="skuVc" v-show="scene === 2" @chageScene="chageScene" />

      <!-- 对话框用于展示SKU数据 -->
      <el-dialog title="SKU数据" v-model="dialogVisible" :before-close="dialogBeforeClose">
        <el-table :data="skuArr" style="width: 100%">
          <el-table-column prop="skuName" label="SKU名称" width="width" align="center">
          </el-table-column>
          <el-table-column prop="price" label="SKU价格" width="width" align="center">
          </el-table-column>
          <el-table-column prop="weight" label="SKU重量" width="width" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width" align="center">
            <template #="{row,$index}">
                <img :src="row.skuDefaultImg" style="height: 20px; width: 20px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

    </el-card>

  </div>
</template>


<style></style>