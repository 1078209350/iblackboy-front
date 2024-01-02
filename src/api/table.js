import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/product/queryList',
    method: 'get',
    params
  })
}

// 新增商品
export function addProduct(data) {
  return request({
    url: '/product/addProduct',
    method: 'post',
    data
  })
}

// 修改商品
export function changeProduct(data) {
  return request({
    url: '/product/changeProduct',
    method: 'post',
    data
  })
}

// 删除商品
export function deleteProduct(id) {
  return request({
    url: '/product/deleteProduct',
    method: 'post',
    data: {
      productId: id
    }
  })
}
