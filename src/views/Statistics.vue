<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">{{ item.id }}
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
import dayjs from 'dayjs';
import clone from '@/lib/clone'


@Component({
  components: {Tabs},
})
/* eslint-disable*/
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');//将tags换一下格式
  }

  beautify(string) {
    const day = dayjs(string);
    const now = dayjs();//变化的今天
    if (day.isSame(now, 'day')) {
      return '今天'
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日')
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;//$store用的时候没有类型，所以不得不手动添加类型
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length === 0) {return [];}

    //const hashTable : { title:string,items:RecordItem[]}[];//hashTable用来分类存储
    const newList = clone(recordList).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()); //从大到小排序

    const result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];//初始化为第一项

    for (let i = 0; i < newList.length; i++) {
      const current = newList[i];//当前项
      const last = result[result.length - 1];//最后一项,因为是最早的
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current)
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]})
      }
    }
    return result;
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
