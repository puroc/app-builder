Input<template>
  <el-form :label-position="labelPosition" label-width="80px" size='small' :model="model">
    
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/utils'
import { getBus } from '@/utils/bus'
export default {
  props: ['params'],
  computed: {
    ...mapGetters(['currentComponent', 'componentsAttributes'])
  },
  data() {
    return {
      labelPosition: 'right',
      model: {},
      size: ''
    }
  },
  created() {
    this.model = deepCopy(this.componentsAttributes[this.params.componentId])
  },
  mounted() {
    // 注册保存组件和删除组件的事件
    getBus().$on(this.params.componentId + '-attribute-' + 'save', this.save)
    getBus().$on(
      this.params.componentId + '-component-' + 'delete',
      this.delete
    )
  },
  destroyed() {
    // 取消注册保存组件和删除组件的事件
    getBus().$off(this.params.componentId + '-attribute-' + 'save')
    getBus().$off(this.params.componentId + '-component-' + 'delete')
  },
  methods: {
    // 保存组件属性
    save() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      componentAttributes[this.params.componentId] = deepCopy(this.model)
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    },
    // 删除组件
    delete() {
      const list = []
      list.push(this.params.componentId)
      this.$store.dispatch('deleteComponent', list)
    }
  }
}
</script>







