
<template>
  <Layout class-prefix='layout'>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.types"/>
    <div class="notes">
      <FormItem filed-name="备注"
                placeholder="在这里输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">

import Vue from 'vue';

import {Component, Watch} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import FormItem from '@/components/money/FormItem.vue';

import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';
/* eslint-disable */
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
@Component({
  components: {Tags, FormItem, Types, NumberPad}
})

export default class Money extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {tags: [], notes: '', types: '-', amount: 0}; //定义变量并初始化
  // 如果有初始值，可以不用类型声明
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }
  @Watch('recordList')
  onRecordListChange(){
    recordListModel.save(this.recordList);
  }



}
</script>
<style lang="scss"> //没有scoped，就能影响其他的组件
.layout-content {
  display: flex;
  flex-direction: column-reverse; //从底部开始布局
}

.notes {
  padding: 12px 0;
}
</style>


