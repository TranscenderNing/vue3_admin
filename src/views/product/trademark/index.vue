
<script setup lang="ts">

import { ref, onMounted, reactive, nextTick} from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import { TradeMarkResponseData,Records } from '@/api/product/trademark/type'
import { ElNotification } from 'element-plus'
import { pa } from 'element-plus/es/locale'

// 当前页码
let pageNo = ref<number>(1)
// 每页数据容量
let limit = ref<number>(3)
// 数据总量
let total = ref<number>(100)
// 存储当前页的数据 用于展示
let trademarkArr = ref<Records>([])
// 控制对话框的隐藏和显示 对话框中用于添加|编辑
let dialogFormVisible = ref<boolean>(false)
// 收集对话框表单中的数据
let trademarkParams = reactive<any>({
    tmName: '',
    logoUrl: ''
})

// 获取el-form的组件实例
let formRef = ref()

// 获取已有品牌的列表  改变当前页码的回调
const getHasTrademark = async (page = 1)=>{
  pageNo.value = page
  console.log(reqHasTrademark)
  let res:TradeMarkResponseData  = await reqHasTrademark(pageNo.value,limit.value)
  if(res.code === 200){
    console.log(res.data)
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }else{
    return Promise.reject(new Error(res.message))
  }
}

onMounted(()=>{
  getHasTrademark()
})

// 改变一页容量的回调
const handleSizeChange = (pageSize)=>{
  limit.value = pageSize
  getHasTrademark()
}

// 添加按钮的回调 
const addTrademark = ()=>{
  // 清除之前收集到的数据 防止在添加新数据的时候回显
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  trademarkParams.id = ''
  // 显示对话框进行编辑
  dialogFormVisible.value = true
  // 清除校验规则的提示信息
  // formRef.value?.clearValidate('logoUrl')
  // formRef.value?.clearValidate('tmName')
  nextTick(()=>{
    formRef.value?.clearValidate('logoUrl')
    formRef.value?.clearValidate('tmName')
  })

}


// 修改按钮的回调
const updateTrademark = (row)=>{
  trademarkParams.id = row.id
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl
  dialogFormVisible.value = true
  // 清除校验规则
  // formRef.value?.clearValidate('logoUrl')
  // formRef.value?.clearValidate('tmName')
  nextTick(()=>{
    formRef.value?.clearValidate('logoUrl')
    formRef.value?.clearValidate('tmName')
  })
}

// 对话框确定按钮回调
const confirm = async ()=>{
  // 校验数据
  await formRef.value.validate()
  // 向服务器发送请求添加新的品牌数据
  let res = await reqAddOrUpdateTrademark(trademarkParams)
  console.log('校验通过')
  
  if(res.code === 200){
    dialogFormVisible.value = false
    ElNotification({
      type:'success',
      message: trademarkParams.id ? '修改成功':'添加成功'
    })
    if(trademarkParams.id){
      getHasTrademark(pageNo.value)
    }else{
      getHasTrademark()
    } 
  }else{
    dialogFormVisible.value = false
    ElNotification({
      type:'error',
      message: trademarkParams.id ? '修改失败':'添加失败'
    })
  }

}

// 对话框取消按钮回调
const cancel = ()=>{
  dialogFormVisible.value = false
}

// 上传图片之前的回调 限制文件的大小 格式
const beforeAvatarUpload = (rawFile)=>{
  if(rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif' ){
      if(rawFile.size/1024/1024 < 4 ){
        return true
      }else{
          ElNotification({
            type: 'error',
            message: '文件需要少于4mb'
          })
          return false
      }
  }else{
    ElNotification({
      type: 'error',
      message: '图片格式错误'
    })
    return false
  }
}

// 图片上传成功的回调
const handleAvatarSuccess = (response,uploadFile) => {
  trademarkParams.logoUrl = 'http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKF2AWpcKAADv98DWYRo516.jpg'
  formRef.value.clearValidate('logoUrl')
}

// 删除按钮确定的 回调
const removeTrademark = async (row) => {
    let res = await reqDeleteTrademark(row.id)
    if(res.code === 200){
        console.log(200,res.code)
        ElNotification({
          type: 'success',
          message: '删除成功'
        })
        getHasTrademark(trademarkArr.value.length>1? pageNo.value : pageNo.value-1)
    }else{
      ElNotification({
          type: 'error',
          message: '删除失败'
        })
    }
}

// 表单校验规则
const validateTmName = (rule,value,callback)=>{
  if(value.trim().length > 2){
    callback()
  }else{
    callback(new Error('名称应大于2个字符'))
  }
}

const validateUrlLogo = (rule,value,callback)=>{
  if(value){
    callback()
  }else{
    callback(new Error('需要上传logo'))
  }
}

const rules = {
  tmName: [
    { required: true, trigger: 'blur', validator: validateTmName }
  ],
  logoUrl: [{ required: true, validator: validateUrlLogo }]
}





</script>

<template>
  <div>
      <el-card class="box-card">
        <!-- 添加按钮 -->
        <el-button type="primary" icon="Plus" size="default" @click="addTrademark" v-has="`btn.Trademark.add`">添加品牌</el-button>
        <!-- 表格 -->
        <el-table :data="trademarkArr"  style="width: 100%; margin: 10px 0px" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="tmName" label="品牌名称" width="width" align="center">
            <template #="{row,$index}">
              <pre> {{ row.tmName  }} </pre>
            </template>
          </el-table-column>
          <el-table-column prop="logoUrl" label="品牌LOGO" width="width" align="center">
            <template #="{row,$index}">
              <img :src="row.logoUrl" style="width: 50px; height: 50px">
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="品牌操作" width="width" align="center">
            <template #="{row,$index}">
              <el-button type="primary" icon="Edit" @click="updateTrademark(row)"></el-button>

              <el-popconfirm title="确定要删除该品牌吗" icon="Delete" @confirm="removeTrademark(row)">
                  <template #reference>
                    <el-button type="primary" icon="Delete"></el-button>
                  </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getHasTrademark"
          :current-page="pageNo"
          :page-sizes="[3, 5, 7]"
          :page-size="limit"
          layout="total, prev, pager, next, jumper, ->,  sizes, total"
          :total="total">
        </el-pagination>
        <!-- 对话框组件 -->
        <div>
          <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌' ">
            <el-form ref="formRef" :model="trademarkParams" :rules="rules" label-width="100px" style="width: 80%;">
              <el-form-item label="品牌名称" prop="tmName">
                <el-input  placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
              </el-form-item>
              <el-form-item label="品牌LOGO" prop="logoUrl">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
              </el-form-item>
            </el-form>

            <template #footer>
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </template>
          </el-dialog>
        </div>


     </el-card>
  </div>
</template>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>