import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/product/queryList',
    method: 'post',
    params
  })
}
