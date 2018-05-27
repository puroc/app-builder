<template>
  <el-form :label-position="labelPosition" label-width="80px" size='small' :model="model">
    <el-form-item label="背景色">
      <el-checkbox v-model="model.background"></el-checkbox>
    </el-form-item>
    <el-form-item label="每页条数">
      <el-select v-model="model.pageSize" placeholder="">
        <el-option v-for="item in pageSizeOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <div hidden> -->
      <el-form-item label="总条数">
        <el-input-number v-model="model.total"></el-input-number>
      </el-form-item>
      <el-form-item label="当前页数">
        <el-input-number v-model="model.currentPage"></el-input-number>
      </el-form-item>
    <!-- </div> -->
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
      size: '',
      pageSizeOptions: [
        {
          value: 10,
          label: '10'
        },
        {
          value: 30,
          label: '30'
        },
        {
          value: 50,
          label: '50'
        },
        {
          value: 100,
          label: '100'
        }
      ]
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







