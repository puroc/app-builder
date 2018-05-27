<template>
  <layout>
    <div slot="a1"><sr-button :attributes='attributes1' @click="a"/></div>
    <div slot="a2"><sr-button :attributes='attributes2' @click="b"/></div>
    <!-- <div slot="b"><sr-table :attributes='attributes3' :datas='data3' ></sr-table></div> -->
    <div slot="b"><sr-table :attributes='attributes3' :datas='data3' @handleSelectionChange='handleSelectionChange'></sr-table></div>
    <div slot="c"><el-button @click="add">添加</el-button><el-button @click="subtract">减少</el-button></div>
  </layout>
</template> 
<script>
import layout from './layout'
import test from './test'
export default {
  ...test,
  components: {
    layout
  }

}
</script>


