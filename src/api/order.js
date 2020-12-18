/**
 * 商品相关所有axios请求函数
 */
//引入请求工具函数request
import request from '@/utils/port'

//添加分类
export const getorderlist = (data) => {
    return request.get('/order/list', data)
}

//获取订单详情
export const getorder = (data) => {
    return request.get('/order/detail', data)
}

//25.修改订单
export const geteditlist = (data) => {
    return request.post('/order/edit', data)
}

// 获取首页报表数据
export const getTotalData = () => {
    return request.get('/order/totaldata')
}

// 获取订单数据
export const getOrderTotal = (data) => {
    return request.get('/order/ordertotal', data)
}