import request from '@/utils/request'

// 删除用户
export function _deleteUser(user) {
  return request({
    url: '/api/idm/user/' + user.id,
    method: 'delete'
  })
}

// 更新用户
export function _updateUser(user) {
  return request({
    url: '/api/idm/user/' + user.id,
    method: 'put',
    data: {
      payloads: [
        user
      ]
    }
  })
}

// 查询用户信息
export function _getUser(user) {
  return request({
    url: '/api/idm/user/' + user.id,
    method: 'get'
  })
}

// 插入用户
export function _insertUser(user) {
  return request({
    url: '/api/idm/user',
    method: 'post',
    data: {
      payloads: [
        user
      ]
    }
  })
}

// 查询某机构下的用户信息
export function _listUserByOrgId(params) {
  return request({
    url: '/api/idm/user',
    method: 'get',
    params
  })
}

// 批量删除用户
export function _deleteUserList(userList) {
  return request({
    url: '/api/idm/user',
    method: 'delete',
    data: {
      payloads: userList
    }
  })
}
