
<script setup lang="ts">

import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqRoleInfo, reqAddOrUpdateRole, reqAllMenuByRoleId,reqAssignPermission,reqDeleteRole} from '@/api/acl/role'
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage, ElStep } from 'element-plus'

// 分页相关的数据
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(100)
let roleList = ref<any>([])

// 树形组件的数据
let menuList = ref<any>([])
let checkedKeys = ref<any>([])
const defaultProps = {
  children: 'children',
  label: 'name',
}

// 控制对话框、抽屉的 显示 或 隐藏
let dialogFormVisible = ref<boolean>(false)
let drawer = ref<boolean>(false)

// 用户搜索关键词
let roleKeyWord = ref<string>('')

// 收集表单数据
let roleParam = reactive<any>({
  id: '',
  roleName: ''
})


let formRef = ref()
let treeRef = ref()

// 获取已有的角色数据  改变页码的回调
const getHasRole = async (page = 1) => {
  pageNo.value = page
  let res = await reqRoleInfo(pageNo.value, limit.value, roleKeyWord.value)
  if (res.code === 200) {
    roleList.value = res.data.records
    total.value = res.data.total
  }
}

// 改变页容量的回调
const handleSizeChange = (pageSize) => {
  limit.value = pageSize
  getHasRole()
}

// 组件挂载的时候发送请求 获取已有角色数据
onMounted(() => {
  getHasRole()
})

// 搜索按钮的回调
const goSearch = () => {
  getHasRole()
  roleKeyWord.value = ''
}

// 清空的回调
const reset = () => {
  let layoutStore = useLayOutSettingStore()
  layoutStore.refresh = !layoutStore.refresh
}

// 添加 角色 的按钮回调
const addNewRole = () => {
  roleParam.id = ''
  roleParam.roleName = ''
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
  dialogFormVisible.value = true
}

// 递归获取树形组件需要勾选的id
const filterCheckedKeys =(menus,checkedKeyList)=>{
  menus.forEach(item => {
      if(item.select && item.level===4){
        checkedKeyList.push(item.id)
      }
      if(item.children && item.children.length > 0){
        filterCheckedKeys(item.children,checkedKeyList)
      }
  })  
  return checkedKeyList
}

// 分配角色的 回调
const allocateMenu = async (row) => {
  drawer.value = true
  Object.assign(roleParam,row)
  let res = await reqAllMenuByRoleId(row.id)
  if(res.code === 200){
    menuList.value = res.data
    checkedKeys.value = filterCheckedKeys(menuList.value,[])
    console.log(checkedKeys,'hjkfsafdhsahhfkasdhfdkl')
  }
}

// 更新角色的 回调
const updateRole = (row) => {
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
  dialogFormVisible.value = true
  Object.assign(roleParam, row)
}

// 删除角色的 回调
const deleteRole = async (row) => {
    let res = await reqDeleteRole(row.id)
    if(res.code === 200){
      ElMessage({
        type: 'success',
        message: '删除角色成功'
      })
      console.log(roleList.value.length,pageNo.value,pageNo.value-1,'length')
      getHasRole(roleList.value.length>1? pageNo.value:pageNo.value-1)
    }else{
      ElMessage({
        type: 'error',
        message: '删除角色失败'
      })
    }
}

// 取消保存 角色的回调
const cancelSaveRole = () => {
  dialogFormVisible.value = false
}

// 确认保存 角色的回调
const confirmSaveRole = async () => {
  await formRef.value.validate()
  let res = await reqAddOrUpdateRole(roleParam)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParam.id ? '修改角色成功' : '添加角色成功'
    })
    dialogFormVisible.value = false
    getHasRole(roleParam.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: roleParam.id ? '修改角色失败' : '添加角色失败'
    })
    dialogFormVisible.value = false
  }
}


// 确认保存 权限的回调
const confirmAssignMenu = async () => {
  let arr= treeRef.value.getCheckedKeys()
  let arr1 = treeRef.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  console.log(roleParam.id,arr,arr1,permissionId)
  let res = await reqAssignPermission({roleId:roleParam.id,permissionIdList:permissionId})
  if(res.code === 200){
    ElMessage({
      type: 'success',
      message: '分配权限成功'
    })
    drawer.value = false
    window.location.reload()
  }else{
    ElMessage({
      type: 'error',
      message: '分配权限失败'
    })
    drawer.value = false
  }
}

// 取消保存 权限的回调
const cancelAssignMenu = () => {
  drawer.value = false
}


// 表单校验规则
const validateRoleName = (rule, value, callback) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('角色名称至少需要5位'))
  }
}

let rules = {
  roleName: [
    { required: true, trigger: 'blur', validator: validateRoleName }
  ]
}





</script>

<template>
  <div>

    <el-card style="height: 80px;">
      <el-form :inline="true" ref="form" :model="form" label-width="80px" class="form">
        <el-form-item label="职位搜索">
          <el-input v-model="roleKeyWord" placeholder="请输入搜索职位关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goSearch">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 10px 0px;">
      <el-button type="primary" @click="addNewRole" icon="Plus">添加职位</el-button>

      <el-table :data="roleList" style="width: 100%; margin: 10px 0px;" border @selection-change="selectChange">
        <el-table-column type="selection" width="80" align="center">
        </el-table-column>
        <el-table-column type="index" label="#" width="80" align="center">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="80" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="职位名称" width="120" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" icon="User" size="small" @click="allocateMenu(row)">分配角色</el-button>
            <el-button type="primary" icon="Edit" size="small" @click="updateRole(row)">编辑</el-button>
            <el-popconfirm :title="`确定删除${row.roleName}职位吗?`" @confirm="deleteRole(row)">
              <template #reference>
                <el-button type="primary" icon="Delete" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="getHasRole" :current-page="pageNo"
        :page-sizes="[3, 5, 7]" :page-size="limit" layout=" prev, pager, next, jumper, ->, sizes, total" :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加 修改角色的 对话框组件 -->
    <el-dialog v-model="dialogFormVisible" :title="roleParam.id ? '修改角色' : '添加角色'">
      <el-form ref="formRef" :model="roleParam" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleParam.roleName" placeholder="请您输入角色名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSaveRole">取消</el-button>
          <el-button type="primary" @click="confirmSaveRole">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 给角色分配权限的 抽屉组件  -->
    <el-drawer v-model="drawer" :direction="direction">
      <template #header>
        <h4>分配菜单权限</h4>
      </template>
      <template #default>
        <el-tree 
          ref="treeRef"
          :data="menuList" 
          show-checkbox 
          node-key="id" 
          default-expand-all 
          :default-checked-keys="checkedKeys"
          :props="defaultProps" />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelAssignMenu">取消</el-button>
          <el-button type="primary" @click="confirmAssignMenu">确定</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>


<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>