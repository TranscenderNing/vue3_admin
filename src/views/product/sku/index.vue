
<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { reqSkuList, reqSaleSku, reqCancelSaleSku, reqSkuInfo, reqDeleteSku} from '@/api/product/sku'
import { ElMessage } from 'element-plus'


// 控制抽屉组件 显示 和 隐藏的数据
let drawer = ref<boolean>(false)
// 分页相关的数据
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(100)
let skuArr = ref<any>([])
let skuInfo = ref<any>({})

onMounted(() => {
  getSkuList()
})

// 获取分页数据  改变页码的回调
const getSkuList = async (page = 1) => {
  pageNo.value = page
  let res = await reqSkuList(pageNo.value, limit.value)
  if (res.code === 200) {
    skuArr.value = res.data.records
    total.value = res.data.total
  }
}

// 改变页容量的回调
const handleSizeChange = (pageSize) => {
  limit.value = pageSize
}

// 上架 下架 按钮的回调
const updateSale = async (row) => {
  if (row.isSale === 1) {
    let res = await reqCancelSaleSku(row.id)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '下架成功'
      })
      getSkuList()
    } else {
      ElMessage({
        type: 'success',
        message: '下架失败'
      })
    }
  } else {
    let res = await reqSaleSku(row.id)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '上架成功'
      })
      getSkuList()
    } else {
      ElMessage({
        type: 'success',
        message: '上架失败'
      })
    }
  }
}

// 查看SKU详情 按钮的回调
const lookUpSkuDetail = async (row) => {
  drawer.value = true
  let res = await reqSkuInfo(row.id)
  if(res.code === 200){
    skuInfo.value = res.data
  }
}

// 删除SKU 按钮的回调
const deleteSku = async (row, $index) => {
    let res = await reqDeleteSku(row.id)
    if(res.code === 200){
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getSkuList(skuArr.value.length > 1? pageNo.value : pageNo.value-1)
    }else{
      ElMessage({
        type: 'success',
        message: '删除失败'
      })
    }
}

</script>  

<template>
  <el-card>
    <el-table :data="skuArr" style="width: 100%; margin: 10px 0px;" border>
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" show-overflow-tooltip label="名称" width="150">
      </el-table-column>
      <el-table-column prop="skuDesc" show-overflow-tooltip label="描述" width="150">
      </el-table-column>
      <el-table-column prop="skuDefaultImg" label="默认图片" width="150">
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="width">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" fixed="right">
        <template #="{ row, $index }">
          <el-button type="primary" :icon="row.isSale === 1 ? 'Bottom' : 'Top'" size="small"
            @click="updateSale(row)"></el-button>
          <el-button type="primary" icon="InfoFilled" size="small" @click="lookUpSkuDetail(row)"></el-button>
          <el-button type="primary" icon="Delete" size="small" @click="deleteSku(row, $index)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="getSkuList" :current-page="pageNo"
      :page-sizes="[3, 5, 7]" :page-size="limit" layout="prev, pager, next, jumper, ->, sizes, total" :total="total">
    </el-pagination>

    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row :gutter="10" style="margin: 10px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{skuInfo.skuName}}</el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{skuInfo.price }}</el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag type="success" style="margin-right: 5px;" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{ item.valueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag type="success" style="margin-right: 5px;" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">{{ item.saleAttrValueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" style="height: 100%; width: 100%;">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>

  </el-card>
</template>


<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>