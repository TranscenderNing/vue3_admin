import request from '/utils/request'
import { CategoryResponseData,AttrResponseData,Attr } from './type'

enum API{
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    ADDORUPDATAEATTR_URL = '/admin/product/saveAttrInfo',
    DELETEATTR_URL = '/admin/product/deleteAttr/'
}

// 获取一级分类
export const reqC1 = () => request.get<any,CategoryResponseData>(API.C1_URL)

// 获取二级分类
export const reqC2 = (category1Id: number) => request.get<any,CategoryResponseData>(API.C2_URL + category1Id)

// 获取三级分类
export const reqC3 = (category2Id: number) => request.get<any,CategoryResponseData>(API.C3_URL + category2Id)

// 获取分类已有的属性和属性值
export const reqAttr = (category1Id: number|string,category2Id: number|string,category3Id: number|string) => {
    return request.get<any,AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
}

// 新增 或者 修改属性
export const reqAddOrUpdateAttr = (data: Attr)=>request.post<any,any>(API.ADDORUPDATAEATTR_URL,data)

// 删除属性
export const reqRemoveAttr = (attrId: number)=>request.delete<any,any>(API.DELETEATTR_URL + attrId)



