/**
 * 商品相关所有axios请求函数
 */
//引入请求工具函数request
import request from '@/utils/port'

//添加分类
export const AddClass = (data) => {
    return request.post('/goods/addcate', data)
}

//获取商品分类
export const getClassgoods = (data) => {
    return request.get('/goods/catelist', data)
}

//删除商品分类
export const removeClass = (data) => {
    return request.get('/goods/delcate', data)
}

//查询所有分类名称
export const queryClass = () => {
    return request.get('/goods/categories')
}

//修改分类
export const modifyClass = (data) => {
    return request.post('/goods/editcate',data)
}

//商品图片上传接口
export const goodsimgupload = (data) => {
    return request.post('/goods/goods_img_upload', data)
}

//添加商品
export const addgoods = (data) => {
    return request.post('/goods/add', data)
}

//获取商品列表
export const getgoodslist = (data) => {
    return request.get('/goods/list', data)
}

//删除商品
export const removegoods = (data) => {
    return request.get('/goods/del', data)
}

//修改商品
export const editgoods = (data) => {
    return request.post('/goods/edit', data)
}