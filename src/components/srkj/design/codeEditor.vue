<template>
    <el-dialog title="JS编辑器" :visible.sync="params.visible" width="100%" :before-close="handleClose">
        <el-form :label-position="labelPosition" size='small' :model="model">
            <el-form-item>
                <el-input type="textarea" v-model="model.codes" class="code"></el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/utils'
export default {
  props: ['params'],
  computed: {
    ...mapGetters(['componentsCodes'])
  },
  watch: {
    'params.visible': function() {
      this.model.codes = this.params.method + '(){}'
    }
  },
  data() {
    return {
      labelPosition: 'right',
      model: {
        codes: ''
      }
    }
  },
  methods: {
    // 提交代码
    submitCodes() {
      const componentsCodes = {
        componentId: this.params.componentId
      }
      componentsCodes.codes = deepCopy(this.model)
      this.$store.dispatch('setComponentCodes', componentsCodes)
    },
    // 关闭dialog时提交代码
    handleClose() {
      this.submitCodes()
      // 向父组件传递关闭事件，在父组件中将visible属性修改为false，因为visible是以参数的方式参入本组件的，所以在本组件中不允许修改，否则控制台会抛错
      this.$emit('close', '')
    }
  }
}
</script>

