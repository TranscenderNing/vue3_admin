export interface ResponseData{
    code: number,
    message: string,
    ok: boolean
}

export interface SpuData{
    id?: number,
    spuName: string,
    description: string,
    category3Id: string|number,
    tmId: number | string,
    spuSaleAttrList: null,
    spuImageList: null |  SpuImg[]
}

export type Records = SpuData[]

export interface HasSpuResponseData extends ResponseData{
    data: {
       records: Records,
       total: number,
       size: number,
       current: number,
       searchCount: boolean,
       pages: number
    }
}

export interface TradeMark{
    id: number,
    tmName: string,
    logoUrl: string
}

export interface  AllTradeMark extends ResponseData{
    data: TradeMark[]
}

export interface SpuImg{
    id?: number,
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    imgName: string,
    imgUrl: string
}

export interface SpuHasImg extends ResponseData{
    data: SpuImg[]
}

export interface SaleAttrValue{
    id?: number,
    createTime: null,
    updateTime: null,
    spuId: number,
    baseSaleAttrId: number,
    saleAttrValueName: string,
    saleAttrName: string,
    isChecked: null
}

export type SpuSaleAttrValueList = SaleAttrValue[]

export interface SaleAttr{
    id?: number,
    createTime: null,
    updateTime: null,
    spuId: number,
    baseSaleAttrId: number,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrValueList
}

export interface SaleAttrResponseData extends ResponseData{
    data: SaleAttr[]
}

export interface OneSaleAttr{
    id: number,
    name: string
}

export interface AllSaleAttrResponseData extends ResponseData{
    data: OneSaleAttr[]
}

export interface SkuData{
    
    category3Id: string|number,
    spuId: string|number,
    tmId: string|number,
    skuName: string,
    weight: string|number
    price: string|number,
    skuDesc: string,
    skuDefaultImg: string,

    skuAttrValueList: [
        {
            attrId: number|string,
            valueId: number|string,
        }
    ],
    skuSaleAttrValueList: [
        {
            saleAttrId: number|string,
            saleAttrValueId: number|string,
        }
    ]
}