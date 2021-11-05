<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import echarts, {EChartOption, ECharts} from 'echarts'

@Component
export default class chart extends Vue {
  //要学会自己封装组件，因为有时第三方组件不靠谱
  @Prop() options?: EChartOption;
  chart?: ECharts;

  mounted() {
    if (this.options === undefined) {
      return console.error('options为空')
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)//ref用来在script中获得template标签的id
    this.chart.setOption(this.options)//将父组件传过来的chart内容渲染到选定的容器中
  }

  @Watch('options')
  onOptionsChange(newValue: EChartOption) {
    this.chart!.setOption(newValue);
  }

}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>