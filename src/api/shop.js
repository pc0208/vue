/**
 * 商品相关所有axios请求函数
 */
//引入请求工具函数request
import request from '@/utils/port'

// 获取店铺详情
export const getShopInfo = () => {
  return request.get('/shop/info')
}

// 修改店铺
export const editShopInfo = (data) => {
  return request.post('/shop/edit', data)
}
