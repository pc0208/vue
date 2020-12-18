/**
 * 账号相关所有axios请求函数
 */

//引入请求工具函数request
import request from '@/utils/port'

//用户登录
export const checkLogin = (data) => {
    return request.post('/users/checkLogin', data)
}

//获取账号列表
export const getAddAccountList = (data) => {
    return request.get('/users/list', data)
}

//添加账号
export const addAccount = (data) => {
    return request.post('/users/add', data)
}

//删除账号
export const removeAccount = (data) => {
    return request.get('/users/del', data)
}

//修改账号
export const editAccount = (data) => {
    return request.post('/users/edit', data)
}

//批量删除账号
export const removesAccount = (data) => {
    return request.get('/users/batchdel', data)
}

// 7.检查旧密码是否正确
export const checkoldpwd = (data) => {
    return request.get('/users/checkoldpwd', data)
}

//修改密码
export const editpwd = (data) => {
    return request.post('/users/editpwd', data)
}

//头像上传接口
export const upload = (data) => {
    return request.post('/users/avatar_upload', data)
}

//获取账号（个人中心）信息
export const info = () => {
    return request.get('/users/info')
}

// 确认用户头像修改
export const saveAvatarEdit = (data) => {
    return request.get('/users/avataredit', data)
}