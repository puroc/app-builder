import request from '@/utils/request'

// 删除角色
export function _deleteRole(role) {
  return request({
    url: '/api/idm/role/' + role.id,
    method: 'delete'
  })
}

// 更新角色
export function _updateRole(role) {
  return request({
    url: '/api/idm/role/' + role.id,
    method: 'put',
    data: {
      payloads: [
        role
      ]
    }
  })
}

// 查询某机构下的角色
export function _listRoleByOrgId(orgId, params) {
  return request({
    url: '/api/idm/org/' + orgId + '/roles',
    method: 'get',
    params
  })
}

// 插入角色
export function _insertRole(role) {
  return request({
    url: '/api/idm/role',
    method: 'post',
    data: {
      payloads: [
        role
      ]
    }
  })
}
// 批量删除角色
export function _deleteRoleList(roleList) {
  return request({
    url: '/api/idm/role',
    method: 'delete',
    data: {
      payloads: roleList
    }
  })
}

