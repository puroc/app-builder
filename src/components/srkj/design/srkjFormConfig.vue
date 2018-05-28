<template>
  <el-form :label-position="labelPosition" label-width="80px" size='small' :model="formModel">
    <el-form-item label="数据对象">
      <el-input type="textarea" v-model="formModel.model"></el-input>
    </el-form-item>
    <el-form-item label="验证规则">
      <el-input type="textarea" v-model="formModel.rules"></el-input>
    </el-form-item>
    <el-form-item label="标签位置">
      <el-select v-model="formModel.labelPosition" placeholder="请选择">
        <el-option v-for="item in labelPositionOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="行内模式">
      <el-checkbox v-model="formModel.inline"></el-checkbox>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input v-model="formModel.labelWidth"></el-input>
    </el-form-item>
    <el-form-item label="组件尺寸">
      <el-select v-model="formModel.sizePosition" placeholder="请选择">
        <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="禁用组件">
      <el-checkbox v-model="formModel.disabled"></el-checkbox>
    </el-form-item>
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
      formModel: {
        inline: false,
        labelPosition: 'right',
        disabled: false
      },
      size: '',
      labelPositionOptions: [
        {
          value: 'right',
          label: 'right'
        },
        {
          value: 'left',
          label: 'left'
        },
        {
          value: 'top',
          label: 'top'
        }
      ],
      sizeOptions: [
        {
          value: 'medium',
          label: 'medium'
        },
        {
          value: 'small',
          label: 'small'
        },
        {
          value: 'mini',
          label: 'mini'
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
      componentAttributes[this.params.componentId] = deepCopy(this.formModel)
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







