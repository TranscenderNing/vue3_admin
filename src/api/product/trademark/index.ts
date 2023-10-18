// 品牌管理模块的接口
import request from '/utils/request'
import { TradeMarkResponseData,TradeMark } from './type'

enum API{
    // 分页获取品牌内容
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    DELETE_URL = '/admin/product/baseTrademark/remove/',
}

// 获取服务器已有的品牌列表
export const reqHasTrademark = (page: number, limit: number)=>request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)


// 添加 或者 更新 品牌
export const reqAddOrUpdateTrademark = (data: TradeMark)=>{
    if(data.id){
        // 修改品牌
        return request.put<any,any>(API.UPDATETRADEMARK_URL,data)
    }else{
        // 新增品牌
        return request.post<any,any>(API.ADDTRADEMARK_URL,data)
    }
}

// 删除品牌
export const reqDeleteTrademark = (id: number) => request.delete<any,any>(API.DELETE_URL+id)