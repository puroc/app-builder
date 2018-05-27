<template>
  <el-dialog title="JS编辑器" :visible.sync="params.visible" width="100%" :before-close="handleClose">
    <el-form :label-position="labelPosition" size='small' :model="model">
      <el-form-item>
        <el-input type="textarea"  id="code" name="code" v-model="model.codes" class="form-control"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitCodes">保存</el-button>
      <el-button type="primary" @click="submitAndClose">保存并关闭</el-button>
    </span>
  </el-dialog>

</template>
<script>
import { mapGetters } from 'vuex'
import CodeMirror from 'codemirror/lib/codemirror'
export default {
  props: ['params'],
  computed: {
    ...mapGetters(['componentsCodes'])
  },
  updated() {
    if (!this.mirror) {
      this.mirror = CodeMirror.fromTextArea(document.getElementById('code'), {
        mode: 'text/javascript', // 实现groovy代码高亮
        // mode: "text/x-java", //实现Java代码高亮
        lineNumbers: true, // 显示行号
        // theme: "eclipse",  //设置主题
        // theme: "idea", //设置主题
        theme: 'dracula', // 设置主题
        lineWrapping: true, // 代码折叠
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        matchBrackets: true // 括号匹配
      // readOnly: true,        //只读
      })
    }
  },
  watch: {
    'params.visible': function() {
      if (this.componentsCodes[this.params.componentId]) {
        this.model.codes = this.componentsCodes[this.params.componentId]
      } else {
        this.model.codes = this.params.method + '(){}'
      }
    }
  },
  data() {
    return {
      labelPosition: 'right',
      mirror: '',
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
      this.model.codes = this.mirror.getValue()
      componentsCodes.codes = this.model.codes
      this.$store.dispatch('setComponentCodes', componentsCodes)
    },
    // 关闭dialog时提交代码
    handleClose() {
      // 向父组件传递关闭事件，在父组件中将vis  ible属性修改为false，因为visible是以参数的方式参入本组件的，所以在本组件中不允许修改，否则控制台会抛错
      this.$emit('close', '')
    },
    submitAndClose() {
      this.submitCodes()
      this.$emit('close', '')
    }
  }
}
</script>

