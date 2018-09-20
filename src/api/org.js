import request from '@/utils/request'

export function _getOrgTree(orgId) {
  return request({
    url: '/api/idm/org/' + orgId + '/tree',
    method: 'get'
  })
}

export function _getOrgInfo(orgId) {
  return request({
    url: '/api/idm/org/' + orgId,
    method: 'get'
  })
}

export function _addOrg(upperOrgId, payloads) {
  return request({
    url: '/api/idm/org/' + upperOrgId,
    method: 'post',
    data: {
      payloads
    }
  })
}

export function _deleteOrg(orgId) {
  return request({
    url: '/api/idm/org/' + orgId,
    method: 'delete'
  })
}
