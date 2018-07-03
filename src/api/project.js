import request from '@/utils/request'

export function _getProjectList() {
  return request({
    url: '/api/app/project/list',
    method: 'get'
  })
}

export function _addProject(payloads) {
  return request({
    url: '/api/app/project',
    method: 'post',
    data: {
      payloads
    }
  })
}

export function _deleteProject(projectId) {
  return request({
    url: '/api/app/project/' + projectId,
    method: 'delete'
  })
}

export function _editProject(projectId, payloads) {
  return request({
    url: '/api/app/project/' + projectId,
    method: 'put',
    data: {
      payloads
    }
  })
}
