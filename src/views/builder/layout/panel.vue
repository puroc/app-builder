<template>
  <div id="panel">
    <el-row>
      <el-col :span=16>
        <el-button type="primary" size="small">水平居左</el-button>
        <el-button type="primary" size="small">水平居中</el-button>
        <el-button type="primary" size="small">水平居右</el-button>
        <el-button type="primary" size="small">垂直置顶</el-button>
        <el-button type="primary" size="small">垂直居中</el-button>
        <el-button type="primary" size="small">垂直置底</el-button>
      </el-col>
      <el-col :span=8>
        <el-button type="primary" @click="saveComponent">保存</el-button>
        <el-button type="primary" @click="deleteComponent">删除</el-button>
        <el-button type="primary" @click="upload">上传</el-button>
      </el-col>
    </el-row>

  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getBus } from '@/utils/bus'
import { _savePageComponents } from '@/api/page'
export default {
  computed: {
    ...mapGetters([
      'currentComponent',
      'componentsParams',
      'componentsAttributes',
      'componentsLayouts',
      'componentsStyles',
      'componentsDatas',
      'componentsEvents',
      'componentsCodes'
    ])
  },
  methods: {
    saveComponent() {
      getBus().$emit(this.currentComponent.componentId + '-param-save', '')
      getBus().$emit(this.currentComponent.componentId + '-attribute-save', '')
      getBus().$emit(this.currentComponent.componentId + '-style-save', '')
      getBus().$emit(this.currentComponent.componentId + '-data-save', '')
      getBus().$emit(this.currentComponent.componentId + '-event-save', '')
      getBus().$emit(this.currentComponent.componentId + '-code-save', '')
    },
    deleteComponent() {
      getBus().$emit(
        this.currentComponent.componentId + '-component-delete',
        ''
      )
    },
    upload() {
      const projectId = this.$route.query.projectId
      const pageId = this.$route.query.pageId
      const result = { components: [] }
      for (const componentId in this.componentsParams) {
        const component = {}
        component.componentId = componentId
        component.name = this.componentsParams[componentId] ? this.componentsParams[componentId].componentName : ''
        component.type = this.componentsParams[componentId] ? this.componentsParams[componentId].componentType : ''
        component.pageId = pageId
        component.layout = this.componentsLayouts[componentId]
        component.attributes = this.componentsAttributes[componentId]
        component.params = this.componentsParams[componentId]
        component.attributes = this.componentsAttributes[componentId]
        component.styles = this.componentsStyles[componentId]
        component.datas = this.componentsDatas[componentId]
        component.events = this.componentsEvents[componentId]
        component.codes = this.componentsCodes[componentId]
        result.components.push(component)
      }
      console.log(result)
      _savePageComponents(projectId, pageId, result.components)
    }
  }
}
</script>
<style scoped>
.el-button {
  margin: 3px;
  float: right;
}
</style>


