<template>
  <div>
    <label class="formItem">
      <span class="name">
        {{ this.filedName }}
      </span>
      <template v-if="type === 'date'">
        <input :type="type"
               :value="x(value)"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder"/>
      </template>
      <template v-else>
        <input :type="'text'"
               :value="value"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder"/>
      </template>
      <!--两种类型的框，如果有一个类型的数据需要处理，则需要用template+v-if/v-else
      -->

    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import dayjs from 'dayjs'

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) filedName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);//触发当前实例上的事件。附加参数都会传给监听器回调。
  }

  x(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD');
  }//处理时间
}
</script>

<style  lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 40px; //padding line-height
    flex-grow: 1; //代替width
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}

</style>