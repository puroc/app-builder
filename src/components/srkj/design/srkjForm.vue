<template>
  <div @click.stop="openAttributesPanel" class="layout-wrapper">
    <el-form :data-component-id="params.componentId" :ref="attributes.ref" :model="attributes.model" label-width="80px">
      <srkj-form-layout :params="layoutParams"></srkj-form-layout>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['params'],
  computed: {
    ...mapGetters([
      'currentComponent',
      'componentsParams',
      'componentsAttributes',
      'componentsLayouts',
      'componentsStyles',
      'time'
    ]),
    watchObj() {
      return this.time
    },
    layoutComponentId() {
      return 'srkj-layout-' + Math.round(Math.random() * 1000)
    },
    layoutParams() {
      const params = {}
      params.componentId = this.layoutComponentId
      params.componentName = this.layoutComponentId
      params.componentType = 'srkj-layout'
      return params
    },
    layoutAttributes() {
      const attributes = {}
      attributes.row = { gutter: 0 }
      attributes.cols = [{ id: '0', span: 24 }]
      return attributes
    }
  },
  data() {
    return {
      style: '',
      attributes: {}
    }
  },
  created() {
    if (!this.componentsLayouts[this.layoutComponentId]) {
      this.$store.dispatch('addComponents', {
        rowId: this.params.componentId,
        colId: 0,
        componentName: this.layoutComponentId,
        componentId: this.layoutComponentId,
        componentType: 'srkj-layout',
        params: this.layoutParams,
        attributes: this.layoutAttributes
      })
    }

    this.refresh()
  },
  watch: {
    // 观察store中是否有任何组件的属性发生变化，若有，则从store中取出自己的属性，并进行设置
    watchObj: function() {
      this.refresh()
    }
  },
  methods: {
    refresh() {
      this.getAttributes()
      this.getStyle()
    },
    getAttributes() {
      this.attributes = this.componentsAttributes[this.params.componentId]
    },
    getStyle() {
      this.style = this.componentsStyles[this.params.componentId]
    },
    // 打开属性配置面板
    openAttributesPanel(ev) {
      if (this.currentComponent.componentId !== this.params.componentId) {
        this.$store.dispatch('setCurrentComponent', {
          componentId: this.params.componentId,
          componentName: this.params.componentName,
          componentType: this.params.componentType
        })
      }
    },
    handleSizeChanle() {
      this.$emit('size-change')
    },
    handleCurrentChange() {
      this.$emit('current-change')
    }
  }
}
</script>
<style scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
}
.el-form {
  width: 100%;
  height: 100%;
}
</style>








