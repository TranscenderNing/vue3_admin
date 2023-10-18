
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { reqAttr } from '@/api/product/attr'
import {reqSpuImgList,reqSpuHasSaleAttr, reqAddSKu} from '@/api/product/spu'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['chageScene'])


// 获取表格实例
let table = ref()

// 存储从服务器获取到的数据
let attrArr = ref<any>([])
let salerArr = ref<any>([])
let imgArr = ref<any>([])

// 收集 表单参数 
let skuParams = reactive<any>({
    // 父组件传递的数据
    category3Id: '',
    spuId: '',
    tmId: '',
    // v-model
    skuName: '',
    weight: '',
    price: '',
    skuDesc: '',
    skuDefaultImg: '',
    // code 回调中
    skuAttrValueList: [
        // {
        //     attrId: '',
        //     valueId: '',
        // }
    ],
    skuSaleAttrValueList: [
        // {
        //     saleAttrId: '',
        //     saleAttrValueId: '',
        // }
    ]
})

// 获取 添加sku表单页面的数据
const initSkuData = async (c1Id,c2Id,row) =>{
  // 收集从父组件获得的数据
  skuParams.category3Id=row.category3Id
  skuParams.spuId= row.id
  skuParams.tmId= row.tmId
  // 向服务器发送请求获取初始数据
  let attrRes = await reqAttr(c1Id,c2Id,row.category3Id)
  if(attrRes.code === 200){
    attrArr.value =  attrRes.data
  }
  let saleAttrRes = await reqSpuHasSaleAttr(row.id)
  if(saleAttrRes.code === 200){
    salerArr.value =  saleAttrRes.data
  }
  let imgListRes = await reqSpuImgList(row.id)
  if(imgListRes.code === 200){
    console.log('fdsasfjadsljfkdjsa;fl',imgListRes.data)
    imgArr.value =  imgListRes.data
  }
}

// 保存按钮的回调  
const save = async () =>{
  // 整理参数 发送请求
  skuParams.skuAttrValueList = attrArr.value.reduce((prev,item)=>{
      if(item.attrIdAndValId){
        let [ attrId , valueId ] = item.attrIdAndValId.split(':')
        console.log(attrId , valueId,'faskfjsadl;fj')
        prev.push({attrId , valueId})
        console.log(prev)
      }
      return prev
  },[])

  skuParams.skuSaleAttrValueList = salerArr.value.reduce((prev,item)=>{
      if(item.saleIdAndValId){
        let [saleAttrId,saleAttrValueId] = item.saleIdAndValId.split(':')
        prev.push({saleAttrId,saleAttrValueId})
      }
      return prev
  },[])

  let res = await reqAddSKu(skuParams)
  if(res.code === 200){
    ElMessage({
      type: 'success',
      message: '添加SKU成功'
    })
    $emit('chageScene',{scene1: 0,updateOrAdd: 'add'})
  }else{
    ElMessage({
      type: 'error',
      message: '添加SKU失败'
    })
    $emit('chageScene',{scene1: 0,updateOrAdd: 'add'})
  }

}

// 取消按钮的回调
const cancel = () =>{
  $emit('chageScene',{scene1: 0,updateOrAdd: 'add'})
}


// 设置默认图片的回调
const setDefalutImg = (row) =>{
   imgArr.value.forEach(item => {
      table.value.toggleRowSelection(item,false)
   });
   table.value.toggleRowSelection(row,true)
   skuParams.skuDefaultImg = row.imgUrl
}



defineExpose({
  initSkuData
})


</script>

<template>
  <div>

      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="SKU名称">
          <el-input v-model="skuParams.skuName" placeholder="SKU名称" > </el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="skuParams.price" placeholder="价格（元）" type="number"> </el-input>
        </el-form-item>
        <el-form-item label="重量">
          <el-input v-model="skuParams.weight" placeholder="重量（克）" type="number"> </el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
          <el-input v-model="skuParams.skuDesc" placeholder="SKU描述" type="textarea" rows="4"> </el-input>
        </el-form-item>
        <el-form-item label="平台属性">
          <el-form ref="form" :model="form" label-width="80px" :inline="true">
            <el-form-item v-for="(attr,index) in attrArr" :key="attr.id" :label="attr.attrName"> 
              <el-select v-model="attr.attrIdAndValId" placeholder="" >
                <el-option v-for="item in attr.attrValueList" :key="item.id" :label="item.valueName" :value="`${attr.id}:${item.id}`">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
          <el-form ref="form" :model="form" label-width="80px" :inline="true">
            <el-form-item v-for="sale in salerArr" :key="sale.id" :label="sale.saleAttrName">
              <el-select v-model="sale.saleIdAndValId" placeholder="">
                <el-option v-for="item in sale.spuSaleAttrValueList" :key="item.id" :label="item.saleAttrValueName" :value="`${sale.id}:${item.id}`">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>

        <el-form-item label="图片名称">
          <el-table :data="imgArr" style="width: 100%" border ref="table"> 
            <el-table-column type="selection" label="label" width="80" align="center">
            </el-table-column>
            <el-table-column prop="prop" label="图片" width="width" align="center">
              <template #="{row,$index}">
                  <img :src="row.imgUrl" style="width:100px;height:100px;">
              </template>
            </el-table-column>
            <el-table-column prop="imgName" label="名称" width="width" align="center">
            </el-table-column>
            <el-table-column  label="操作" width="width" align="center">
                <template #="{row,$index}">
                    <el-button type="warning" icon="" size="default" @click="setDefalutImg(row)">设置默认</el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item >
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>

  </div>
</template>


<style></style>