<template>
  <button class="button" @click="$emit('click',$event)">
    <slot/>
  </button>
</template>
<!--button被点击了，就触发Button-->
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {
}
</script>

<style lang="scss" scoped>
.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center; //内联元素居中可在父元素上加text-align
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>