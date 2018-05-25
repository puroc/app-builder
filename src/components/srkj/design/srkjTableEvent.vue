<template>
  <div>
    <el-form :label-position="labelPosition" size='small' :model="model">
      <el-form-item>
        <div>selection-change <i class="el-icon-edit"></i></div>
        <el-input v-model="model.selectionChange" style="display:inline"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/utils'
import { getBus } from '@/utils/bus'
// import { showConfirmMsg } from '@/utils/index';
export default {
  props: ['params'],
  computed: {
    ...mapGetters(['componentsEvents', 'time'])
  },
  data() {
    return {
      labelPosition: 'right',
      model: {}
    }
  },
  created() {
    // 从store中获取该组件的事件
    this.model = deepCopy(this.componentsEvents[this.params.componentId])
  },
  mounted() {
    // 注册保存组件
    getBus().$on(this.params.componentId + '-event-' + 'save', this.save)
  },
  destroyed() {
    // 取消注册保存组件
    getBus().$off(this.params.componentId + '-event-' + 'save')
  },
  watch: {
    // 当前组件变化时，获取store中当前组件的事件数据
    time: function() {
      this.model = deepCopy(this.componentsEvents[this.params.componentId])
    }
  },
  methods: {
    // 保存组件事件数据
    save() {
      const componentsEvents = {
        componentId: this.params.componentId
      }
      componentsEvents.events = deepCopy(this.model)
      this.$store.dispatch('setComponentEvents', componentsEvents)
    }
  }
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>








