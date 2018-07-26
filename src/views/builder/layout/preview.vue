<template>
  <div id="preview-main">
    <srkj-layout :params="params"></srkj-layout>
  </div>
</template>
<script>
import { _loadComponent } from '@/api/page'
export default {
  computed: {
    componentName() {
      return 'preview-main-row'
    },
    componentId() {
      return 'preview-main-row'
    },
    componentType() {
      return 'srkj-layout'
    },
    projectId() {
      return this.$route.query.projectId
    },
    pageId() {
      return this.$route.query.pageId
    },
    params() {
      const params = {}
      params.componentId = this.componentId
      params.componentName = this.componentName
      params.componentType = this.componentType
      return params
    },
    attributes() {
      const attributes = {}
      attributes.row = { gutter: 0 }
      attributes.cols = [{ id: '0', span: 24 }]
      return attributes
    }
  },
  created() {
    // 打开一个页面进行设计时，先清除builder store中的旧数据
    this.$store.dispatch('cleanBuilderStoreData')

    // 添加预置组件preview-main-row
    this.$store.dispatch('addComponents', {
      rowId: 'preview-init-row',
      colId: 0,
      componentName: this.componentName,
      componentId: this.componentId,
      componentType: this.componentType,
      params: this.params,
      attributes: this.attributes
    }).then(respones => {
      // 从服务端获取该页面的组件
      _loadComponent(this.projectId, this.pageId).then(response => {
        const components = response.data.payloads
        this.$store.dispatch('loadComponent', components).then(response => {
          this.$store.dispatch('updateLoadTime')
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    })

    // 设置当前组件为刚拖拽过来的组件
    this.$store.dispatch('setCurrentComponent', {
      componentId: this.componentId,
      componentName: this.componentName,
      componentType: this.componentType
    })
  }
}
</script>
<style scoped>
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
  border: 1px solid red;
}
.component {
  height: 100%;
}
</style>







