import request from '/utils/request'


enum API{
    SKU_URL = '/admin/product/list/',
    SALE_URL = '/admin/product/onSale/',
    CANCELSALE_URL = '/admin/product/onSale/',
    SKUINFO_URL = '/admin/product/getSkuInfo/',
    DELETESKU_URL = '/admin/product/deleteSku/',
}

// 获取服务器 某个三级分类下已有的spu数据
export const reqSkuList = (page:number,limit:number)=> request.get<any,any>(API.SKU_URL +  `${page}/${limit}`)

// 上架商品
export const reqSaleSku = (skuId:number)=> request.get<any,any>(API.SALE_URL + skuId)

// 下架商品
export const reqCancelSaleSku = (skuId:number)=> request.get<any,any>(API.CANCELSALE_URL + skuId)

// 获取商品详情
export const reqSkuInfo = (skuId:number)=> request.get<any,any>(API.SKUINFO_URL + skuId)

// 删除SKU
export const reqDeleteSku = (skuId:number)=> request.delete<any,any>(API.DELETESKU_URL + skuId)