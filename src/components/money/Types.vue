<template>
  <div>
    <ul class="types">
      <li :class="value==='-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="value==='+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>


<script lang="ts"> //TS=JS:类型
//1类型提示：更智能的提示
//2编译时报错：但不会停，会把报错的地方删掉，没报错的地方转成JS
//3类型检查：无法点出错误的属性


import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator'; //装饰器，自动添加没有的data,methods

@Component
export default class Types extends Vue {
   @Prop() readonly value!:string;
   selectType(type:string) {//type只能是'-'和'+'中的一个
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
   this.$emit('update:value',type);
  }

}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  font-size: 24px;
  text-align: center;

  > li {
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