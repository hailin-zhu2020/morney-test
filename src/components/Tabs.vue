<template>
  <ul :class="{[classPrefix+'-tabs']:classPrefix}" class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        class="tabs-item"
        :class="liClass(item)" @click="select(item)">{{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string, value: string };
@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  readonly classPrefix?: string;//？表示可能是undefined,！表示绝对不可能是undefined

  @Prop({type: String, default: '64px'})
  height!: string;//使用JS来添加不同的高度，目前是使用css添加，没有使用这个方法

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.value,
    }
  }//优先使用这种函数写法，因为会放到函数原型上面
  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  font-size: 24px;
  text-align: center;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after { //&表示自身
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>