<template>
  <el-tabs v-model="activeTab" type="card">
    <el-tab-pane label="参数" name="paramTab">
      <param-editor></param-editor>
    </el-tab-pane>
    <el-tab-pane label="属性" name="attributeTab">
      <component :is="attribute" :params="params" :key="currentComponent.componentId" />
    </el-tab-pane>
    <el-tab-pane label="数据" name="dataTab">
      <data-editor></data-editor>
    </el-tab-pane>
    <el-tab-pane label="事件" name="eventTab">
      <component :is="event" :params="params" :key="currentComponent.componentId" />
    </el-tab-pane>
    <el-tab-pane label="样式" name="cssTab">
      <style-editor></style-editor>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
export default {
  computed: {
    ...mapGetters([
      'currentComponent',
      'componentsParams',
      'componentsAttributes'
    ]),
    attribute() {
      return this.currentComponent.componentType + '-config';
    },
    event() {
      const componentName = this.currentComponent.componentType + '-event';
      if (Vue.component(componentName)) {
        return componentName
      } else {
        return '';
      }
      // const b = Vue.component('srkj-table-event')

      // return this.currentComponent.componentType + '-event'
    },
    params() {
      return this.componentsParams[this.currentComponent.componentId]
    }
  },
  data() {
    return {
      activeTab: 'paramTab'
    }
  }
}
</script>


  
