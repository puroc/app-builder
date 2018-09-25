import request from '@/utils/request'

// 查询某用户的机构信息
export function _listProject() {
  return request({
    url: '/api/app/project/list',
    method: 'get'
  })
}
// 插入工程
export function _insertProject(project) {
  return request({
    url: '/api/app/project',
    method: 'post',
    data: {
      project
    }
  })
}

// 删除工程
export function _deleteProject(id) {
  return request({
    url: '/api/app/project/' + id,
    method: 'delete'
  })
}

export function _updateProject(id, project) {
  return request({
    url: '/api/app/project/' + id,
    method: 'put',
    data: {
      project
    }
  })
}
