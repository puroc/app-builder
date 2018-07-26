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
      const result = { components: [] }
      for (const item in this.componentsLayouts) {
        result.components[item] = {}
        result.components[item].layout = this.componentsLayouts[item]
        result.components[item].attributes = this.componentsAttributes[item]
        result.components[item].params = this.componentsParams[item]
        result.components[item].attributes = this.componentsAttributes[item]
        result.components[item].styles = this.componentsStyles[item]
        result.components[item].datas = this.componentsDatas[item]
        result.components[item].events = this.componentsEvents[item]
        result.components[item].codes = this.componentsCodes[item]
      }
      console.log(result)
      // console.log('[componentsParams]:' + JSON.stringify(this.componentsParams))
      // console.log('[componentsAttributes]:' + JSON.stringify(this.componentsAttributes))
      // console.log('[componentsLayouts]:' + JSON.stringify(this.componentsLayouts))
      // console.log('[componentsStyles]:' + JSON.stringify(this.componentsStyles))
      // console.log('[componentsDatas]:' + JSON.stringify(this.componentsDatas))
      // console.log('[componentsEvents]:' + JSON.stringify(this.componentsEvents))
      // console.log('[componentsCodes]:' + JSON.stringify(this.componentsCodes))
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


