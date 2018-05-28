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
import { mapGetters } from 'vuex';
import { deepCopy } from '@/utils';
import { getBus } from '@/utils/bus';
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
    const componentAttributes = deepCopy(
      this.componentsAttributes[this.params.componentId]
    )
    if (componentAttributes.model) {
      componentAttributes.model = JSON.stringify(componentAttributes.model)
    }
    if (componentAttributes.rules) {
      componentAttributes.rules = JSON.stringify(componentAttributes.rules)
    }
    this.formModel = componentAttributes
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
      // 如果设置了model，则将其转换为json对象，因为form组件要求model属性是对象类型
      if (componentAttributes[this.params.componentId].model) {
        componentAttributes[this.params.componentId].model = JSON.parse(
          this.formModel.model
        )
      }
      // 如果设置了rules，则将其转换为json对象，因为form组件要求rules属性是对象类型
      if (componentAttributes[this.params.componentId].rules) {
        componentAttributes[this.params.componentId].rules = JSON.parse(
          this.formModel.rules
        )
      }
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







