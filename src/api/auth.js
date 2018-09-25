import request from '@/utils/request'

// 登录
export function _login(username, password) {
  return request({
    url: '/api/idm/login',
    method: 'post',
    data: {
      'payloads': [
        {
          'username': username,
          'password': password
        }
      ]
    }
  })
}

// 登出
export function _logout() {
  return request({
    url: '/api/idm/logout',
    method: 'get'
  })
}

// 刷新token
export function _refreshToken() {
  return request({
    url: '/api/idm/token',
    method: 'get'
  })
}
