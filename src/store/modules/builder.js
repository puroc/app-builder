import {
  getCurrentTime
} from '@/utils'

const builder = {
  state: {
    time: {},
    currentComponent: '',
    componentsParams: {},
    // componentsParams: {
    //   componentId: {
    //     name: 'abc'
    //   }
    // },
    componentsAttributes: {},
    // componentsAttributes: {
    //   componentId: {
    //     name: 'abc'
    //   }
    // },
    componentsLayouts: {},
    // componentsLayouts: {
    //   layout1: {
    //     col1: [{ component: '1' }],
    //     col2: [{ component: '2' }]
    //   }
    // }
    componentsStyles: {},
    // componentsStyles: {
    //   componentId: {
    //     buttonStyle1: 'color:red;font-size:20px',
    //     buttonStyle2: 'color:blue;font-size:5px',
    //   }
    // }
    componentsDatas: {},
    // componentsDatas: {
    //   componentId: {
    //     data1: '',
    //     data2: '',
    //   }
    // }
    componentsEvents: {},
    // componentsEvents: {
    //   componentId: {
    //     event1: '',
    //     event2: '',
    //   }
    // }
    componentsCodes: {}
    // componentsCodes: {
    //   componentId: {
    //     code1: '',
    //     code2: '',
    //   }
    // }
  },
  mutations: {
    // 添加组件
    ADD_COMPONENTS: (state, component) => {
      const rowId = component.rowId
      const colId = component.colId
      const componentId = component.componentId
      const componentName = component.componentName
      const componentType = component.componentType

      // 若该布局不存在，则创建一个布局对象
      if (!state.componentsLayouts[rowId]) {
        state.componentsLayouts[rowId] = {}
      }

      if (componentId && componentName && componentType) {
        // 若该列不存在，则在布局中创建该列
        if (!state.componentsLayouts[rowId][colId]) {
          state.componentsLayouts[rowId][colId] = []
        }
        // 将放置到该列的组件和参数存储到state的layouts中
        const ele = {}
        // ele.componentName = componentName
        ele.componentId = componentId
        ele.componentType = componentType
        state.componentsLayouts[rowId][colId].push(ele)

        // 存储组件的参数
        state.componentsParams[componentId] = component.params

        // 存储组件的属性
        state.componentsAttributes[componentId] = component.attributes

        // 存储组件的数据
        state.componentsDatas[componentId] = component.datas

        // 存储组件的样式
        state.componentsDatas[componentId] = component.styles

        // 存储组件的事件
        state.componentsDatas[componentId] = component.events

        // 存储组件的代码
        state.componentsDatas[componentId] = component.codes
      }
    },
    LOAD_COMPONENTS: (state, component) => {
      const componentId = component.componentId

      // 存储组件的布局
      state.componentsParams[componentId] = component.layout

      // 存储组件的参数
      state.componentsParams[componentId] = component.params

      // 存储组件的属性
      state.componentsAttributes[componentId] = component.attributes

      // 存储组件的数据
      state.componentsDatas[componentId] = component.datas

      // 存储组件的样式
      state.componentsDatas[componentId] = component.styles

      // 存储组件的事件
      state.componentsDatas[componentId] = component.events

      // 存储组件的代码
      state.componentsDatas[componentId] = component.codes
    },
    // 设置当前选择的组件
    SET_CURRENT_COMPONENT: (state, component) => {
      state.currentComponent = component
    },
    // 设置组件的属性
    SET_COMPONENT_ATTRIBUTES: (state, component) => {
      const componentId = component.componentId
      // 将用户设置的属性存储到store中
      state.componentsAttributes[componentId] = component[componentId]
    },
    // 删除该组件所在布局中的数据
    DELETE_COMPONENT_LAYOUT: (state, componentId) => {
      const rowId = state.componentsParams[componentId].rowId
      const colId = state.componentsParams[componentId].colId
      const components = state.componentsLayouts[rowId][colId]
      // 删除componentsLayouts中对应的该组件数据
      let pos = -1
      for (let index = 0; index < components.length; index++) {
        const element = components[index]
        if (element.componentId === componentId) {
          pos = index
          break
        }
      }
      if (pos === -1) {
        console.log('在state.componentsLayouts中没有找到要删除的元素')
        return
      }
      // 从布局中的组件数组中删除指定的组件
      components.splice(pos, 1)
    },
    // 删除布局组件时，需要将这个布局组件从componentsLayouts中彻底清除
    DELETE_COMPONENT_LAYOUT_SELF: (state, componentId) => {
      delete state.componentsLayouts[componentId]
    },
    // 删除该组件的属性数据
    DELETE_COMPONENT_ATTRIBUTES: (state, componentId) => {
      delete state.componentsAttributes[componentId]
    },
    // 删除该组件的参数数据
    DELETE_COMPONENT_PARAMS: (state, componentId) => {
      delete state.componentsParams[componentId]
    },
    // 删除该组件的样式数据
    DELETE_COMPONENT_STYLES: (state, componentId) => {
      delete state.componentsStyles[componentId]
    },
    // 删除该组件的数据
    DELETE_COMPONENT_DATAS: (state, componentId) => {
      delete state.componentsDatas[componentId]
    },
    // 删除该组件的事件数据
    DELETE_COMPONENT_EVENTS: (state, componentId) => {
      delete state.componentsEvents[componentId]
    },
    // 删除该组件的代码数据
    DELETE_COMPONENT_CODES: (state, componentId) => {
      delete state.componentsCodes[componentId]
    },
    UPDATE_TIME: state => {
      state.time = getCurrentTime()
    },
    SET_COMPONENT_STYLES: (state, component) => {
      state.componentsStyles[component.componentId] = component.styles
    },
    SET_COMPONENT_PARAMS: (state, component) => {
      state.componentsParams[component.componentId] = component.params
    },
    SET_COMPONENT_DATAS: (state, component) => {
      state.componentsDatas[component.componentId] = component.datas
    },
    SET_COMPONENT_EVENTS: (state, component) => {
      state.componentsEvents[component.componentId] = component.events
    },
    SET_COMPONENT_CODES: (state, component) => {
      state.componentsCodes[component.componentId] = component.codes
    }
  },
  actions: {
    addComponents: ({
      commit
    }, component) => {
      commit('ADD_COMPONENTS', component)
      // 属性发生变化时，更新state.time，以便组件watch，及时更新组件的属性
      commit('UPDATE_TIME')
    },
    loadComponent: ({
      commit
    }, component) => {
      commit('LOAD_COMPONENTS', component)
      // 属性发生变化时，更新state.time，以便组件watch，及时更新组件的属性
      commit('UPDATE_TIME')
    },
    setCurrentComponent: ({
      commit
    }, component) => {
      commit('SET_CURRENT_COMPONENT', component)
    },
    setComponentAttributes: ({
      commit
    }, component) => {
      commit('SET_COMPONENT_ATTRIBUTES', component)
      // 属性发生变化时，更新state.time，以便组件watch，及时更新组件的属性
      commit('UPDATE_TIME')
    },
    deleteComponent: ({
      commit,
      state
    }, list) => {
      list.forEach(componentId => {
        commit('DELETE_COMPONENT_LAYOUT', componentId)
        commit('DELETE_COMPONENT_ATTRIBUTES', componentId)
        commit('DELETE_COMPONENT_PARAMS', componentId)
        commit('DELETE_COMPONENT_STYLES', componentId)
        commit('DELETE_COMPONENT_DATAS', componentId)
        commit('DELETE_COMPONENT_EVENTS', componentId)
        commit('DELETE_COMPONENT_CODES', componentId)
      })
      // 删除组件时，更新state.time，以便布局组件watch，及时更新布局中的组件
      commit('UPDATE_TIME')
    },
    deleteLayout: ({
      commit
    }, list) => {
      list.forEach(componentId => {
        commit('DELETE_COMPONENT_LAYOUT_SELF', componentId)
      })
      commit('UPDATE_TIME')
    },
    moveComponent: ({
      commit
    }, componentId) => {
      commit('DELETE_COMPONENT_LAYOUT', componentId)
      // 移动组件时，更新state.time，以便布局组件watch，及时更新布局中的组件
      commit('UPDATE_TIME')
    },
    setComponentStyles: ({
      commit
    }, component) => {
      commit('SET_COMPONENT_STYLES', component)
    },
    setComponentParams: ({
      commit
    }, component) => {
      commit('SET_COMPONENT_PARAMS', component)
    },
    setComponentDatas: ({
      commit
    }, component) => {
      commit('SET_COMPONENT_DATAS', component)
    },
    setComponentEvents: ({
      commit
    }, component) => {
      commit('SET_COMPONENT_EVENTS', component)
    },
    setComponentCodes: ({
      commit
    }, component) => {
      commit('SET_COMPONENT_CODES', component)
    }
  }
}

export default builder
