
<template>
  <Layout class-prefix='layout'>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="createAt">
      <FormItem filed-name="日期"
                placeholder="在这里输入日期"
                type="date"
                :value="record.createAt"
      />
    </div>
    <div class="notes">
      <FormItem filed-name="备注"
                placeholder="在这里输入备注"
                :value="record.notes"
      />
    </div>
    <Tags @update:value="record.tags=$event"/>
  </Layout>
</template>

<script lang="ts">

import Vue from 'vue';

import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import FormItem from '@/components/money/FormItem.vue';
import recordTypeList from '@/constants/recordTypeList'
import Tabs from '@/components/Tabs.vue'

/* eslint-disable */
@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})

export default class Money extends Vue {
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createAt: new Date().toISOString()}; //初始值
  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }


  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    if (!this.record.amount || this.record.amount === 0) {
      return window.alert('请输入金额');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
    }
    this.record.notes = '';
  }

}

</script>
<style lang="scss" scoped> //没有scoped，就能影响其他的组件
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse; //从底部开始布局
}

.notes {
  padding: 12px 0;
}
</style>


