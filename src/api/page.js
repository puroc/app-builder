import request from '@/utils/request'

export function _listPage(params) {
  return request({
    url: '/api/app/page',
    method: 'get',
    params
  })
}

export function _insertPage(page) {
  return request({
    url: '/api/app/page',
    method: 'post',
    data: {
      page
    }
  })
}

export function _deletePage(id) {
  return request({
    url: '/api/app/page/' + id,
    method: 'delete'
  })
}

export function _updatePage(id, page) {
  return request({
    url: '/api/app/page/' + id,
    method: 'put',
    data: {
      page
    }
  })
}

export function _deletePageList(pageList) {
  return request({
    url: '/api/app/page',
    method: 'delete',
    data: {
      payloads: pageList
    }
  })
}

export function _loadComponent(id) {
  return request({
    url: '/api/app/page/' + id + '/components',
    method: 'get'
  })
}

export function _savePageComponents(id, components) {
  return request({
    url: '/api/app/page/' + id + '/components',
    method: 'post',
    data: {
      payloads: components
    }
  })
}
