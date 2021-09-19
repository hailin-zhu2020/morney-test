<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>

          </li>
        </ol>
      </li>
    </ol>

  </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator'
import Tabs from '@/components/Tabs.vue'
import intervalList from '@/constants/intervalList'
import recordTypeList from '@/constants/recordTypeList'

@Component({
  components: {Tabs},
})
/* eslint-disable*/
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');//将tags换一下格式
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;//$store用的时候没有类型，所以不得不手动添加类型
  }

  get result() {
    const {recordList} = this;

    type HashTableValue = { title: string, items: RecordList[] };

    const hashTable: { [key: string]: HashTableValue } = {}//hashTable用来分类存储
    for (let i = 0; i < this.recordList.length; i++) {
      const [date, time] = recordList[i].createAt.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};//保底值是一个空数组
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  mounted() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList
  recordTypeList = recordTypeList;
}
</script>
<style lang="scss" scoped>
%item {
  padding: 6px 16px;
  line-height: 24px; //即支撑高度，又设置垂直对齐
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item;
}

.record {
  background: white;
  @extend %item;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

::v-deep {
  .type-tabs-item { //::v-deep deep语法 用来影响子组件
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}


</style>
