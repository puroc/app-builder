<template>
  <div draggable="true" :data-component-id="params.componentId" @click.stop="openAttributesPanel">
    <el-table :highlightCurrentRow="attributes.highlightCurrentRow" :showHeader="attributes.showHeader" :fit="attributes.fit" :border="attributes.border" :height="attributes.height" :maxHeight="attributes.maxHeight" :size="attributes.size" :stripe="attributes.stripe" :data="datas.tableData" tooltip-effect="dark" :style="style" @selection-change="handleSelectionChange">
      <el-table-column :align="col.align" :showOverflowTooltip="col.showOverflowTooltip" :fixed="col.fixed" :minWidth="col.minWidth" :width="col.width" :type="col.type" :prop="col.prop" :label="col.label" v-for="col in attributes.cols" :key="col.prop"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['params'],
  computed: {
    ...mapGetters([
      'currentComponent',
      'componentsParams',
      'componentsAttributes',
      'componentsStyles',
      'componentsDatas',
      'time'
    ]),
    watchObj() {
      return this.time
    }
  },
  created() {
    this.refresh()
  },
  watch: {
    // 观察store中是否有任何组件的属性发生变化，若有，则从store中取出自己的属性，并进行设置
    watchObj: function() {
      this.refresh()
    }
  },
  data() {
    return {
      style: '',
      datas: {
        tableData: []
      },
      attributes: ''
      // events: {
      //   selectionChange: 'handleSelectionChange'
      // }
    }
  },
  methods: {
    refresh() {
      this.getAttributes()
      this.getStyle()
      this.getData()
      // this.getEvent()
    },
    // getEvent() {
    //   if (this.componentsEvents[this.params.componentId]) {
    //     this.events = this.componentsEvents[this.params.componentId]
    //   }
    // },
    getAttributes() {
      this.attributes = this.componentsAttributes[this.params.componentId]
    },
    getStyle() {
      this.style = this.componentsStyles[this.params.componentId]
    },
    getData() {
      // {"tableData":[{"a": "1","b": "2"}]}
      if (this.componentsDatas[this.params.componentId] && this.componentsDatas[this.params.componentId].tableData) {
        this.datas.tableData = this.componentsDatas[this.params.componentId].tableData
      }
      // if (Object.prototype.toString.call(data) == '[object Array]') {
      //   this.datas = data
      // } else {
      //   this.datas = []
      // }
    },
    // 打开属性配置面板
    openAttributesPanel(ev) {
      if (this.currentComponent.componentId !== this.params.componentId) {
        this.$store.dispatch('setCurrentComponent', {
          componentId: this.params.componentId,
          componentName: this.params.componentName,
          componentType: this.params.componentType
        })
      }
    },
    handleSelectionChange() {
      this.$emit('selection-change')
    }
  }
}
</script>







