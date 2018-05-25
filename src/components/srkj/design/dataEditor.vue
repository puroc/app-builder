<template>
  <el-form :model="model" >
    <el-form-item>
      <el-input type="textarea" v-model="model.datas" class="data"></el-input>  
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import { getBus } from '@/utils/bus'
import { deepCopy } from '@/utils'
export default {
  computed: {
    ...mapGetters(['componentsDatas', 'currentComponent'])
  },
  created() {
    this.getDatas()
  },
  mounted() {
    // 注册保存事件
    if (this.currentComponent.componentId) {
      getBus().$on(
        this.currentComponent.componentId + '-data-' + 'save',
        this.save
      )
      this.lastComponent = this.currentComponent
    }
  },
  destroyed() {
    // 取消注册保存事件
    getBus().$off(this.lastComponent.componentId + '-data-' + 'save')
  },
  watch: {
    // 监听当前组件是否变化，若变化，则取消原有组件注册的数据保存事件，并注册新组件的数据保存事件
    currentComponent: function() {
      if (
        this.lastComponent.componentId !== this.currentComponent.componentId
      ) {
        getBus().$off(this.lastComponent.componentId + '-data-' + 'save')
        getBus().$on(
          this.currentComponent.componentId + '-data-' + 'save',
          this.save
        )
        this.lastComponent = this.currentComponent
        this.getDatas()
      }
    }
  },
  data() {
    return {
      lastComponent: '',
      model: {
        datas: ''
      }
    }
  },
  methods: {
    // 保存当前组件设置的数据
    save() {
      const component = { componentId: this.currentComponent.componentId }
      // component.datas = JSON.parse(deepCopy(this.model.datas))
      component.datas = JSON.parse(this.model.datas)
      this.$store.dispatch('setComponentDatas', component)
    },
    getDatas() {
      // 从store中获取当前组件的数据，若获取到则对model赋值，若没有获取到则重置model的所有属性值为初始值
      if (this.componentsDatas[this.currentComponent.componentId]) {
        this.model = deepCopy(
          this.componentsDatas[this.currentComponent.componentId]
        )
      } else {
        this.restModel(this.paramModel)
      }
    },
    // 重置model的属性值为初始值
    restModel(model) {
      for (const key in model) {
        model[key] = ''
      }
    }
  }
}
</script>
