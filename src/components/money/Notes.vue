<template>
  <div>
    <label class="notes">
      <span class="name">
        {{ this.filedName }}
      </span>
      <input type="text"
             v-model="value"
             :placeholder="this.placeholder"/>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
  @Prop({required: true}) filedName!: string;
  @Prop() placeholder?: string;

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value);//触发当前实例上的事件。附加参数都会传给监听器回调。
  }
}
</script>

<style  lang="scss" scoped>
.notes{
  background:#f5f5f5;
  font-size: 14px;
  padding-left:16px;
  display: flex;
  align-items:center;
  .name{
    padding-right:16px;
  }
  input{
    height:64px; //padding line-height
    flex-grow: 1;  //代替width
    background: transparent;
    border: none;
    padding-right:16px;
  }
}

</style>