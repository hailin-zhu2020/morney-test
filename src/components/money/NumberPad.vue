<template>
  <div class="numberPad">
    <div class="output">{{ output || '&nbsp;' }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click = "remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click = "clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click = "ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString(); //小数点不显示，所以用字符串类型
  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);// 强制指定类型，vue和TS的结合不好导致的
    const input = button.textContent !;//！排空 或者写as string
    if (this.output.length === 16) {
      return;
    } //最大长度为16
    if (this.output === '0') { //替换0
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;

      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input==='.') {
      return;
    }
    this.output += input; //正常情况下

  }
  remove(){
    this.output = this.output.slice(0,-1); //只有slice支持负数
  }
  clear(){
    this.output = '0';
  }
  ok() {
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('submit', number);//防止出bug,所以写两个触发
    this.output = '0';//记录之后，置0
  }


}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace; //设置等宽字体
    padding: 9px 16px;
    text-align: right; //文本对齐方式

  }

  .buttons {
    @extend %clearFix; //将选择器复制到%x的位置，减少复制的量
    button {
      width: 25%; //一行四个
      height: 64px;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 25*2%;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%); //darken为颜色函数
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%); //darken为颜色函数
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%); //darken为颜色函数
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%); //darken为颜色函数
      }

      &:nth-child(12), &:nth-child(14) {
        background: darken($bg, 4*5%); //darken为颜色函数
      }
    }

  }
}
</style>