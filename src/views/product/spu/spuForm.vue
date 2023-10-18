
<script setup lang="ts">
import { ref,computed } from 'vue'
import {reqAllTrademark,reqSpuImgList,reqSpuHasSaleAttr,reqAllSaleAttr,reqAddOrUpdateSpu} from '@/api/product/spu'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['chageScene'])

// 存储从服务器获得的数据
let allTrademark = ref<any>([])
let imgList = ref<any>([])
let saleAttr = ref<any>([])
let allSaleAttr = ref<any>([])
// 收集参数 和 展示数据
let spuParams = ref<any>({
    category3Id:'',
    description:'',
    spuName:'',
    tmId:'',
    spuImageList:[],
    spuSaleAttrList:[],
})
let saleAttrIdAndName = ref<any>('')

// 根据 已有属性 和 全部属性 计算 还可以添加的属性
let unSelectSaleAttr = computed(()=>{
    let unSelectArr = allSaleAttr.value.filter(item =>{
        return saleAttr.value.every(item1 => {
            return item1.saleAttrName != item.name
        })
    })
    console.log(unSelectArr,5656565)
    return unSelectArr
})


// 控制照片墙预览对话框的显示和隐藏
let dialogVisible = ref<any>(false)
// 预览图片的地址数据
let dialogImageUrl = ref<any>('')


// 向服务器发送请求 获取需要展示的数据 
const initHasSpuData = async (row)=>{
    spuParams.value = JSON.parse(JSON.stringify(row))
    console.log('我是子组件中的方法',row)
    let trademarkRes = await reqAllTrademark()
    if(trademarkRes.code === 200){
        allTrademark.value = trademarkRes.data
    }
    let imgRes = await reqSpuImgList(row.id)
    if(imgRes.code === 200){
        imgList.value = imgRes.data.map(item => {
            return {
                name: item.imgName,
                url: item.imgUrl
            }
        })
    }
    let saleAttrRes = await reqSpuHasSaleAttr(row.id)
    if(saleAttrRes.code === 200){
        saleAttr.value = saleAttrRes.data
    }
    let allSaleAttrRes = await reqAllSaleAttr()
    if(allSaleAttrRes.code === 200){
        allSaleAttr.value = allSaleAttrRes.data
    }
}


// 添加的时候 向服务器发送请求 初始化数据
const initAddSpuData = async (c3Id)=>{
    // 清空之前收集的数据
    Object.assign(spuParams.value,{
        category3Id:'',
        description:'',
        spuName:'',
        tmId:'',
        spuImageList:[],
        spuSaleAttrList:[],
    })
    imgList.value = []
    saleAttr.value =[]
    saleAttrIdAndName.value = ''

    spuParams.value.category3Id = c3Id
    console.log('我是子组件中的方法 add init')
    let trademarkRes = await reqAllTrademark()
    if(trademarkRes.code === 200){
        allTrademark.value = trademarkRes.data
    }

    let allSaleAttrRes = await reqAllSaleAttr()
    if(allSaleAttrRes.code === 200){
        allSaleAttr.value = allSaleAttrRes.data
    }
}

// 保存 的回调
const save = async ()=>{
    // 整理参数 照片墙数据

    spuParams.value.spuImageList = imgList.value.map(item =>{
        return {
            imgName: item.name,
            imgUrl: item.response? item.response.data : item.url,
        }
    })

    spuParams.value.spuSaleAttrList = saleAttr.value
    let res = await reqAddOrUpdateSpu(spuParams.value)

    if(res.code === 200){
        ElMessage({
            type: 'success',
            message: spuParams.value.id ? '修改SPU成功':'添加SPU成功'
        })
        $emit('chageScene',{scene1: 0,updateOrAdd: spuParams.value.id ? 'update':'add'})

    }else{
        ElMessage({
            type: 'success',
            message: spuParams.value.id ? '修改SPU失败':'添加SPU失败'
        })
        $emit('chageScene',{scene1: 0,updateOrAdd:'add'})
    }



}

// 取消 的回调
const cancel = ()=>{
    $emit('chageScene',{scene1: 0,updateOrAdd:'update'})
}

// 照片墙 预览 回调
const handlePictureCardPreview  = (file:any) =>{
    dialogVisible.value = true
    dialogImageUrl.value = file.url
}
// 照片墙 删除 文件的回调
const handleRemove = ()=>{

}
// 图片上传前 的回调
const handleUpload = (file: any) =>{
    if(file.type === 'image/png' || file.type === 'image/jpeg'){
        if(file.size / 1024 / 1024 < 3){
            return true
        }else{
            ElMessage({
                type: 'error',
                message: '上传的图片大小应该小于3MB'
            })
            return false
        }
        return true
    }else{
        ElMessage({
                type: 'error',
                message: '上传的格式只能是jpeg和png'
            })
        return false
    }
}

// 添加新的属性 的回调
const addNewAttr = () =>{
    let [baseSaleAttrId,saleAttrName] = saleAttrIdAndName.value.split(':')
    console.log(baseSaleAttrId,saleAttrName)
    saleAttr.value.push({
        saleAttrName,
        baseSaleAttrId,
        spuSaleAttrValueList:[]
    })
    saleAttrIdAndName.value = ''
}

// 属性对象中 每一行   查看模式 切换到 编辑模式
const toEditMode = (row)=>{
    row.isEdit = true
    row.newSaleAttrValue = ''
}

// 属性对象中 每一行  编辑模式 切换到 查看模式 
const toLookUpMode = (row)=>{
    let { baseSaleAttrId, newSaleAttrValue } = row
    console.log( baseSaleAttrId, newSaleAttrValue )
    // 属性值不能为空
    if(newSaleAttrValue.trim() === ''){
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return ;
    }
    // 属性值不可以重复
    let repeat = row.spuSaleAttrValueList.find(item =>{
        return item.saleAttrValueName == newSaleAttrValue
    })

    if(repeat){
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return ;
    }

    row.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName:newSaleAttrValue
    })
    row.isEdit = false
}

// 对外暴露
defineExpose({
    initHasSpuData,initAddSpuData
})
</script>

<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="SPU名称">
                <el-input v-model="spuParams.spuName" placeholder="请您输入SPU名称"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select v-model="spuParams.tmId" placeholder="">
                    <el-option v-for="item in allTrademark" :key="item.id" :label="item.tmName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input v-model="spuParams.description" type="textarea" placeholder="请您输入SPU描述" rows="4"></el-input>
            </el-form-item>

            <el-form-item label="SPU图片">
                <el-upload v-model:file-list="imgList"
                    action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handleUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>


            <el-form-item label="SPU销售属性">
                <el-select v-model="saleAttrIdAndName" placeholder="">
                    <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="Plus" style="margin: 0px 10px;" :disabled="!saleAttrIdAndName" @click="addNewAttr">添加属性</el-button>
                <el-table :data="saleAttr" style="width: 100%; margin: 10px 0px;" border >
                    <el-table-column type="index" label="序号" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="saleAttrName" label="属性名" width="120">
                    </el-table-column>
                    <el-table-column  label="属性值" width="width">
                        <template #="{row,$index}">
                            <el-tag style="margin: 0px 10px;" type="success"  closable
                            v-for="(item,index) in row.spuSaleAttrValueList" 
                            :key="item.id" @close="row.spuSaleAttrValueList.splice(index,1)">{{ item.saleAttrValueName }}</el-tag>
                            <el-input v-if="row.isEdit" placeholder="请您输入属性值" v-model="row.newSaleAttrValue" @blur="toLookUpMode(row)"></el-input>
                            <el-button v-else type="primary" size="small" icon="Plus" @click="toEditMode(row)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width" align="center">
                        <template #="{row,$index}">
                            <el-button type="danger" icon="Delete" size="small" @click="saleAttr.splice($index,1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item >
                <el-button type="primary" @click="save" :disabled="saleAttr.length<1">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>


        </el-form>

    </div>
</template>


<style></style>