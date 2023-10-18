
<script setup lang="ts">
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import { ref, watch, reactive, nextTick, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { AttrResponseData, Attr } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()

// 保存已有的属性和属性值
let attrArr = ref<Attr[]>([])
// 控制下方表格展示组件0 和 编辑组件的切换1
let scene = ref<number>(0)
// 收集 表单中 的数据
let attrParams = reactive<Attr>({
  attrName: "", //属性名称
  attrValueList: [], //该属性下的所有属性值
  categoryId: '', // 三级分类id
  categoryLevel: 3, //属于三级分类
})

let inputArr = ref([])

watch(() => categoryStore.c3Id, () => {
  // 清空上一次的属性和属性值

  attrArr.value = []
  if (!categoryStore.c3Id) return;
  getAttr()
})



onBeforeUnmount(() => {
  console.log("路由切换时清空分类仓库数据")
  categoryStore.$reset()
})

// 获取已有的属性和属性值
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  console.log(res)
  if (res.code === 200) {
    attrArr.value = res.data
  }
}

// 点击添加按钮的回调
const addAttr = () => {
  scene.value = 1
  // 清除上次内容
  Object.assign(attrParams,{
      attrName: "", //属性名称
      attrValueList: [], //该属性下的所有属性值
      categoryId: categoryStore.c3Id, // 三级分类id
      categoryLevel: 3, //属于三级分类
  })

}

// 修改按钮的回调
const updateAttr = (row) => {
  scene.value = 1
  // 需要深度拷贝
  Object.assign(attrParams,JSON.parse(JSON.stringify(row)))
}

// 取消按钮的回调
const cancel = ()=>{
  scene.value = 0
}

// 添加属性值按钮的回调
const addAttrValue = ()=>{
  attrParams.attrValueList.push({
    valueName: '',
    isEditMode: true 
  })

  nextTick(()=>{
    inputArr.value[attrParams.attrValueList.length-1].focus()
  })
}

// 保存按钮的回调
const save = async ()=>{
  // 收集参数 发送请求
  let res = await reqAddOrUpdateAttr(attrParams)
  if(res.code === 200){
      scene.value = 0
      ElMessage({
        type: 'success',
        message: attrParams.id? '修改属性成功':'添加属性成功'
      })
      getAttr()

  }else{
      scene.value = 0
      ElMessage({
        type: 'error',
        message: attrParams.id? '修改属性失败':'添加属性失败'
      })
  }
}

// 属性值失去焦点的回调 查看模式和编辑模式的切换
const toLookUpMode = (row,index) => {

  // 非法情况 属性值不能为空
  if(row.valueName.trim() == ''){
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    attrParams.attrValueList.splice(index,1)
  }

  // 非法情况2 属性值不能重复
  let repeat = attrParams.attrValueList.find((item)=>{
      if(item !=  row){
        return item.valueName === row.valueName
      }
  })

  console.log(repeat,'fasfadsjfdsajfk')
  if(repeat){
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    attrParams.attrValueList.splice(index,1)
    return ;
  }

  row.isEditMode = false
}

const toEditMode = (row,index) =>{
  row.isEditMode = true
  nextTick(()=>{
    inputArr.value[index].focus()
  })
}

// 删除属性 的回调
const deleteAttr = async (row) =>{
  let res = await reqRemoveAttr(row.id)
  if(res.code === 200){
    ElMessage({
        type: 'success',
        message: '删除属性成功'
      })
      getAttr()
  }else{
    ElMessage({
        type: 'success',
        message: '删除属性成功'
      })
  }
}

</script>

<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <!-- 表格组件用于展示 | 编辑组件用于修改和添加 -->
    <el-card style="margin: 10px 0px">
      <!-- 表格组件用于展示 -->
      <div v-show="scene === 0">

        <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">添加属性</el-button>

        <el-table :data="attrArr" style="width: 100%; margin: 10px 0px;" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="width" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width" align="center">
            <template #="{ row, $index }">
              <el-tag type="success" v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width" align="center">
            <template #="{ row, $index }">
              <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)"></el-button>

              <el-popconfirm :title="`确定删除${row.attrName}属性吗?`" @confirm="deleteAttr(row)">
                  <template #reference>
                    <el-button type="danger" size="small" icon="Delete" ></el-button>
                  </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 编辑组件用于修改和添加 -->
      <div v-show="scene === 1">

        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="属性名称">
            <el-input v-model="attrParams.attrName" placeholder="请您输入属性名称"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="Plus" :disabled="!attrParams.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>

        <el-table :data="attrParams.attrValueList" style="width: 100%; margin: 10px 0px" border >
          <el-table-column type="index" label="label" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值" width="width" align="center">
            <template #="{row,$index}">
                <el-input v-if="row.isEditMode" v-model="row.valueName" placeholder="请您输入属性值名称" 
                          @blur="toLookUpMode(row,$index)"
                          :ref = "(vc)=>inputArr[$index]=vc"></el-input>
                <div v-else @click="toEditMode(row,$index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width" align="center">
            <template #="{row,$index}">
                <el-button type="danger" icon="Delete" @click="attrParams.attrValueList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary"  @click="save" :disabled="attrParams.attrValueList.length<1">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>

      </div>

    </el-card>

  </div>
</template>


<style></style>