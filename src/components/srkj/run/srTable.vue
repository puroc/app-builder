<template>
  <el-table :highlightCurrentRow="attributes.highlightCurrentRow" :showHeader="attributes.showHeader" :fit="attributes.fit" :border="attributes.border" :height="attributes.height" :maxHeight="attributes.maxHeight" :size="attributes.size" :stripe="attributes.stripe" :data="datas.tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
      <el-table-column :align="col.align" :showOverflowTooltip="col.showOverflowTooltip" :fixed="col.fixed" :minWidth="col.minWidth" :width="col.width" :type="col.type" :prop="col.prop" :label="col.label" v-for="col in attributes.cols" :key="col.prop"></el-table-column>
    </el-table>
</template>
<script>
export default {
  props: ['attributes', 'datas', 'events'],
  methods: {
    handleSelectionChange() {
      this.$emit('handleSelectionChange')
    }
  }
}
</script>









