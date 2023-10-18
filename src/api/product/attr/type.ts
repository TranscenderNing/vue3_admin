// 商品分类 全局组件的ts类型
export interface ResponseData{
    code: number,
    message: string,
    ok: boolean
}

export interface CategoryObj{
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number,
}

export interface CategoryResponseData extends ResponseData{
    data: CategoryObj[]
}

// 属性和属性值类型
export interface AttrValue{
    id?: number,
    valueName: string,
    attrId?: number,
    isEditMode?: boolean
}

export type AttrValueList = AttrValue[]

export interface Attr{
    id?: number,
    attrName: string,
    categoryId: number | string,
    categoryLevel: number,
    attrValueList: AttrValueList
}

export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData{
    data: Attr[]
}
