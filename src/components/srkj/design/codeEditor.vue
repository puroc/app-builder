<template>
    <el-dialog title="JS编辑器" :visible.sync="dialogVisible" width="100%" :before-close="handleClose">
        <el-form :label-position="labelPosition" size='small' :model="model">
            <el-form-item>
                <el-input type="textarea" v-model="model.codes" class="code"></el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
  props: ['dialogVisible', 'method'],
  computed: {
    lock() {
      return this.dialogVisible
    }
  },
  watch: {
    lock: function() {
      this.model.codes = this.method + '(){}'
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
    handleClose() {
      this.$emit('close', '')
    }
  }
}
</script>

