
<script setup lang="ts">

import { ref, onMounted, reactive } from 'vue'
import { reqAllPermission, reqAddOrUpdatePermission, reqDeletePermission } from '@/api/acl/permission'
import { ElMessage } from 'element-plus'


// 用于 对话框组件的显示 和 隐藏
let dialogFormVisible = ref<boolean>(false)
// 全部的菜单权限数据
let permissionList = ref<any>([])
// 收集表单的数据
let menuParam = reactive<any>({
  code: '',
  name: '',
  pid: '',
  level: ''
})

// 添加按钮的回调
const addMenu =  (row)=>{
  // 清空上次表单数据
  Object.assign(menuParam,{
    id: '',
    code: '',
    name: '',
    pid: '',
    level: ''
  })
  dialogFormVisible.value = true
  // 新增菜单是几级菜单
  menuParam.level = row.level+1
  // 给谁新增子菜单
  menuParam.pid = row.id
}

// 修改按钮的回调
const updateMenu = (row)=>{
  Object.assign(menuParam,row)
  dialogFormVisible.value = true
} 

// 删除按钮的回调
const deleteMenu = async (row)=>{
    let res = await reqDeletePermission(row.id)
    if(res.code === 200){
      ElMessage({
        type: 'success',
        message: '删除菜单成功'
      })
      getAllPermission()
    }else{
      ElMessage({
        type: 'error',
        message: '删除菜单失败'
      })
      getAllPermission()
    }
}


// 从服务器获取所有的菜单权限数据
const getAllPermission = async () => {
  let res = await reqAllPermission()
  if (res.code === 200) {
    permissionList.value = res.data
  }
}

// 确定保存 菜单数据
const confirmSaveMenu = async ()=>{
  let res = await reqAddOrUpdatePermission(menuParam)
  if(res.code === 200){
      ElMessage({
        type:'success',
        message: menuParam.id? '修改菜单成功':'添加菜单成功'
      })
      getAllPermission()
      dialogFormVisible.value = false
  }else{
    ElMessage({
        type:'error',
        message: menuParam.id? '修改菜单失败':'添加菜单失败'
      })
      dialogFormVisible.value = false
  }
}

// 取消保存 菜单数据
const cancelSaveMenu = async ()=>{
  dialogFormVisible.value = false
}



// 组件加载的时候获取数据
onMounted(() => {
  getAllPermission()
})




</script>

<template>
  <div>

    <!-- 表格组件 用于展示菜单 -->
    <el-table :data="permissionList" style="width: 100%; margin-bottom: 20px" row-key="id" border>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="code" label="权限值"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button @click="addMenu(row)" type="primary" size="small" :disabled="row.level === 4">{{ row.level === 3 ? '添加功能' : '添加菜单' }}</el-button>
          <el-button @click="updateMenu(row)" type="primary" size="small" :disabled="row.level === 1">编辑</el-button>
          <el-button @click="deleteMenu(row)" type="primary" size="small" :disabled="row.level === 1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 添加菜单 或者 编辑菜单的 对话框组件  -->
    <el-dialog v-model="dialogFormVisible" :title="menuParam.id ? '修改菜单' : '添加菜单'">
      <el-form ref="formRef" :model="menuParam" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="menuParam.name" placeholder="请您输入名称"></el-input>
        </el-form-item>
        <el-form-item label="权限值" prop="code">
          <el-input v-model="menuParam.code" placeholder="请您输入权限值"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSaveMenu">取消</el-button>
          <el-button type="primary" @click="confirmSaveMenu">确定</el-button>
        </span>
      </template>
    </el-dialog>


  </div>
</template>


<style></style>