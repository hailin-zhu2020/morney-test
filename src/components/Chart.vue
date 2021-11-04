<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import echarts, {EChartOption} from 'echarts'

@Component
export default class chart extends Vue {
  //要学会自己封装组件，因为有时第三方组件不靠谱
  @Prop() options?: EChartOption

  mounted() {
    if (this.options === undefined) {
      return console.error('options为空')
    }
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)//ref用来在script中获得template标签的id
    chart.setOption(this.options)//将父组件传过来的chart内容渲染到选定的容器中
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>