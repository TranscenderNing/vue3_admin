import request from '/utils/request'
import { HasSpuResponseData, AllTradeMark, SpuHasImg, SaleAttrResponseData, AllSaleAttrResponseData} from './type'

enum API{
    HASSPU_URL = '/admin/product/',
    ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    IMAGE_URL = '/admin/product/spuImageList/',
    SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',  
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
    UPDATESPU_URL = '/admin/product/updateSpuInfo',
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    ADDSKU_URL = '/admin/product/saveSkuInfo',
    SKUINFO_URL = '/admin/product/findBySpuId/',
    DELETESPU_URL = '/admin/product/deleteSpu/',
}

// 获取服务器 某个三级分类下已有的spu数据
export const reqHasSpu = (page:number,limit:number,category3Id:number|string)=>{
    return request.get<any,HasSpuResponseData>(API.HASSPU_URL+  `${page}/${limit}?category3Id=${category3Id}`)
}

// 获取所有SPU品牌数据
export const reqAllTrademark = ()=>{
    return request.get<any,AllTradeMark>(API.ALLTRADEMARK_URL)
}

// 获取所有SPU图片
export const reqSpuImgList = (spuId:number)=>{
    return request.get<any,SpuHasImg>(API.IMAGE_URL+ spuId)
}

// 获取某个SPU已有的销售属性
export const reqSpuHasSaleAttr = (spuId:number)=>{
    return request.get<any,SaleAttrResponseData>(API.SPUHASSALEATTR_URL+ spuId)
}

// 获取所有的销售属性
export const reqAllSaleAttr = ()=>{
    return request.get<any,AllSaleAttrResponseData>(API.ALLSALEATTR_URL)
}

// 添加SPU | 修改SPU
export const reqAddOrUpdateSpu = (data: any)=>{
    if(data.id){
        return request.post<any,any>(API.UPDATESPU_URL,data)
    }else{
        return request.post<any,any>(API.ADDSPU_URL,data)
    }
}

// 添加SKU
export const reqAddSKu = (data: any)=>{
    return request.post<any,any>(API.ADDSKU_URL,data)
}

// 展示SKU
export const reqSKuInfo = (spuId: number)=>{
    return request.get<any,any>(API.SKUINFO_URL + spuId)
}

// 删除SKU
export const deleteSPU = (spuId: number)=>{
    return request.delete<any,any>(API.DELETESPU_URL + spuId)
}