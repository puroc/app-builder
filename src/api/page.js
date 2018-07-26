import request from '@/utils/request'

export function _getPageList(projectId, params) {
  return request({
    url: '/api/app/' + projectId + '/page/list',
    method: 'get',
    params
  })
}

export function _addPage(projectId, payloads) {
  return request({
    url: '/api/app/' + projectId + '/page',
    method: 'post',
    data: {
      payloads
    }
  })
}

export function _deletePage(projectId, pageId) {
  return request({
    url: '/api/app/' + projectId + '/page/' + pageId,
    method: 'delete'
  })
}

export function _editPage(projectId, payloads) {
  return request({
    url: '/api/app/' + projectId + '/page/' + payloads.id,
    method: 'put',
    data: {
      payloads
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
