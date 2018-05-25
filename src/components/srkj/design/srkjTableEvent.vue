<template>
  <div>
    <el-form :label-position="labelPosition" size='small' :model="model">
      <el-form-item>
        <div>selection-change
          <i class="el-icon-info" title="当选择项发生变化时会触发该事件"></i>
        </div>
        <el-input v-model="model.selectionChange"></el-input>
        <i class="el-icon-edit" @click="openCodeEditor('selectionChange')"></i>
      </el-form-item>
    </el-form>
    <code-editor :dialogVisible='dialogVisible' :method='method' @close='dialogVisible = false'></code-editor>
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
      model: {},
      dialogVisible: false,
      title: '',
      method: ''
      // codeEditorParams: {
      //   title: 'hahaha',
      //   visible: true
      // }
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    openCodeEditor(title) {
      this.dialogVisible = true
      this.title = title
      this.method = this.model[title]
      // this.codeEditorParams.title = 'hahaha'
      // this.codeEditorParams.visible = true
    },
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
.el-input {
  width: 90%;
}
</style>








