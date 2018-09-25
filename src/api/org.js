import request from '@/utils/request'

// 查询某机构树
export function _getOrgTree(orgId) {
  return request({
    url: '/api/idm/org/' + orgId + '/tree',
    method: 'get'
  })
}

// 查询机构信息
export function _getOrg(orgId) {
  return request({
    url: '/api/idm/org/' + orgId,
    method: 'get'
  })
}

// 插入机构
export function _insertOrg(upperOrgId, payloads) {
  return request({
    url: '/api/idm/org/' + upperOrgId,
    method: 'post',
    data: {
      payloads
    }
  })
}

// 删除机构
export function _deleteOrg(orgId) {
  return request({
    url: '/api/idm/org/' + orgId,
    method: 'delete'
  })
}
