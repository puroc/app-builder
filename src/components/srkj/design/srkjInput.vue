<template>
  <div draggable="true" @click.stop="openAttributesPanel">
    <el-form-item :label="attributes.label">
      <el-input :data-component-id="params.componentId" placeholder="请输入内容"></el-input>
    </el-form-item>
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
      'componentsStyles',
      'time'
    ]),
    watchObj() {
      return this.time
    }
  },
  data() {
    return {
      style: '',
      attributes: {
      }
    }
  },
  created() {
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
      if (!this.attributes.label) {
        this.attributes.label = '标签名称'
      }
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







