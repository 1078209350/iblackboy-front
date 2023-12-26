import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/product/queryList',
    method: 'get',
    params
  })
}

export function addProduct(data) {
  return request({
    url: '/product/addProduct',
    method: 'post',
    data
  })
}
