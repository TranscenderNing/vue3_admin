
<script setup lang="ts">

import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqAsignRole, reqDeleteUser, reqBatchDeleteUser} from '@/api/acl/user'
import { ElMessage } from 'element-plus'
import { User } from '@element-plus/icons-vue/dist/types'
import useLayOutSettingStore from '@/store/modules/setting'



// 分页相关的数据
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(100)
let userList = ref<any>([])

// 控制抽屉的显示 和 隐藏
let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)

// 收集用户的响应式数据
let userParms = reactive<any>({
  username: '',
  name: '',
  password: ''
})
// 收集批量删除用户的id
let deleteIds = ref<number[]>([])
// 收集 搜索框的内容 
let searchKeyWord = ref<string>('')

// 全选 复选框相关的数据 和 回调
let checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
let allRoleArr = ref<any>([])
let checkedRoles =  ref<any>([])

const handleCheckAllChange = (val:any)=>{
  checkedRoles.value = val ? allRoleArr.value : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoleArr.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRoleArr.value.length
}



// 获取form表单实例
let formRef = ref()

// 组件挂载的时候获取已有用户数据
onMounted(() => {
  getHasUser()
})

// 获取已有的用户数据  改变页码的回调
const getHasUser = async (page = 1) => {
  pageNo.value = page
  let res = await reqUserInfo(pageNo.value, limit.value,searchKeyWord.value)
  if (res.code === 200) {
    userList.value = res.data.records
    total.value = res.data.total
  }
}

// 改变页容量的回调
const handleSizeChange = (pageSize) => {
  limit.value = pageSize
  getHasUser()
}

// 添加新用户的回调
const addNewUser = () => {
  drawer.value = true
  // 清空上次填写的表单数据 和 表单校验的错误提示信息
  Object.assign(userParms, {
    username: '',
    name: '',
    password: '',
    id: ''
  })
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}

// 批量删除用户的回调
const batchDeleteUser = async () => {
    alert(deleteIds.value)
    let res = await reqBatchDeleteUser(deleteIds.value)
    if(res.code === 200){
      ElMessage({
        type: 'success',
        message: '批量删除用户成功'
      })
      getHasUser(userList.value.length > deleteIds.value.length ? pageNo.value:pageNo.value-1)
    }else{
      ElMessage({
        type: 'error',
        message: '批量删除用户失败'
      })
    }
}

// 给用户分配角色的回调
const allocateRole = async (row) => {
  drawer1.value = true
  Object.assign(userParms, row)

  let res = await reqAllRole(row.id)
  if(res.code === 200){
    allRoleArr.value = res.data.allRolesList
    checkedRoles.value = res.data.assignRoles
  }
}


// 确定 给用户分配角色的回调
const confirmAssignRole = async ()=>{
    let data = {
      roleIdList: checkedRoles.value.map(item=>item.id),
      userId: userParms.id
    }
    let res = await reqAsignRole(data)
    if(res.code === 200){
      ElMessage({
        type: 'success',
        message: '分配角色成功'
      })
      drawer1.value = false
      getHasUser(pageNo.value)
    }else{
      ElMessage({
        type: 'error',
        message: '分配角色失败'
      })
      drawer1.value = false
    }
}

// 取消 给用户分配角色的回调
const cancelAssignRole = () =>{
    drawer1.value = false
}


// 搜索按钮的回调
const goSearch = ()=>{
  alert('search')
    getHasUser()
    searchKeyWord.value = ''
}

// 重置按钮的回调
const reset = ()=>{
  let layOutStore = useLayOutSettingStore()
  layOutStore.refresh = !layOutStore.refresh
}

// 更新用户信息的回调
const updateUser = (row) => {
  drawer.value = true
  // 收集已有参数 用于回显
  Object.assign(userParms, row)
  // 清空上次表单校验错误信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}

// 删除用户信息的回调
const deleteUser = async (row) => {
    let res = await reqDeleteUser(row.id)
    if(res.code === 200){
      ElMessage({
        type: 'success',
        message: '删除用户成功'
      })
      getHasUser(userList.value.length > 1? pageNo.value:pageNo.value-1)
    }else{
      ElMessage({
        type: 'error',
        message: '删除用户失败'
      })
    }
}

// 用于添加修改的 取消按钮回调
const cancelClick = () => {
  drawer.value = false
}

// 用于添加修改的 保存按钮回调
const confirmClick = async () => {
  // 验证所有表单项 都符合条件后才能发送请求
  await formRef.value.validate()
  let res = await reqAddOrUpdateUser(userParms)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: userParms.id ? '修改成功' : '添加成功'
    })
    drawer.value = false
    getHasUser(userParms.id ? pageNo.value : 1)
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userParms.id ? '修改失败' : '添加失败'
    })
    drawer.value = false
  }
}

// 表格第一列复选框勾选的回调
const selectChange = (value)=>{
  deleteIds.value = value.map(item=>item.id)
}

// 表单校验规则
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名字至少需要5位'))
  }
}

const validateName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称至少需要5位'))
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用户密码至少需要6位'))
  }
}

let rules = {
  username: [
    { required: true, trigger: 'blur', validator: validateUsername }
  ],
  name: [
    { required: true, trigger: 'blur', validator: validateName }
  ],
  password: [
    { required: true, trigger: 'blur', validator: validatePassword }
  ]
}

</script>

<template>
  <div>

    <el-card style="height: 80px;">
      <el-form :inline="true" ref="form" :model="form" label-width="80px" class="form">
        <el-form-item label="用户名">
          <el-input v-model="searchKeyWord" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goSearch" :disabled="!searchKeyWord">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 10px 0px;">
      <el-button type="primary" @click="addNewUser">添加用户</el-button>
      <el-button type="primary" @click="batchDeleteUser" :disabled="!deleteIds.length">批量删除</el-button>

      <el-table :data="userList" style="width: 100%; margin: 10px 0px;" border @selection-change="selectChange">
        <el-table-column type="selection" width="80" align="center">
        </el-table-column>
        <el-table-column type="index" label="#" width="80" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="id" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="用户名字" width="120" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名称" width="120" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="用户角色" width="120" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" icon="User" size="small" @click="allocateRole(row)">分配角色</el-button>
            <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)">编辑</el-button>
            <el-popconfirm :title="`确定删除${row.username}用户吗?`" @confirm="deleteUser(row)">
              <template #reference>
                <el-button type="primary" icon="Delete" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="getHasUser" :current-page="pageNo"
        :page-sizes="[3, 5, 7]" :page-size="limit" layout=" prev, pager, next, jumper, ->, sizes, total" :total="total">
      </el-pagination>
    </el-card>

    <!-- 抽屉效果 用于添加和修改用户 -->

    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ userParms.id ? '修改用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form :model="userParms" :rules="rules" ref='formRef'>
          <el-form-item label="用户姓名" prop="username">
            <el-input v-model="userParms.username" placeholder="请您输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="userParms.name" placeholder="请您输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParms.id">
            <el-input v-model="userParms.password" placeholder="请您输入用户密码"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>

    <!-- 抽屉效果 用于给用户分配角色 -->
    <el-drawer v-model="drawer1" :direction="direction">
      <template #header>
        <h4>分配角色（职位）</h4>
      </template>
      <template #default>
        <el-from>
          <el-form-item label="用户姓名">
            <el-input v-model="userParms.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedRoles"  @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(role,index) in allRoleArr" :key="role.id" :label="role">{{role.roleName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-from>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelAssignRole">取消</el-button>
          <el-button type="primary" @click="confirmAssignRole">确定</el-button>
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