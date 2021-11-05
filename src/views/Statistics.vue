<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref = "chartWrapper">
      <Chart class="chart" :options="x"/>
    </div>

    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}<span>￥{{ group.total }}</span></h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">{{ item.id }}
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>

  </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator'
import Tabs from '@/components/Tabs.vue'
import recordTypeList from '@/constants/recordTypeList'
import dayjs from 'dayjs';
import clone from '@/lib/clone'
import Chart from '@/components/Chart.vue'

@Component({
  components: {Tabs, Chart},
})
/* eslint-disable*/
export default class Statistics extends Vue {

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');//将tags换一下格式
  }

  beautify(string: string) {
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
  mounted(){
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999//vue2里用ts没有类型，所以不得不手动设置类型
  }
  get x(){
    return {
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',],
        axisTick:{
          alignWithLabel:true,//刻度线与标签对齐
        },
        axisLine:{
          color:'#666'
        }

      },
      yAxis: {
        type: 'value',
        show:false
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260,
            150, 230, 224, 218, 135, 147, 260,
            150, 230, 224, 218, 135, 147, 260,
            150, 230, 224, 218, 135, 147, 260,
            150, 450
          ],
          type: 'line',
          symbolSize:12,//设置点点的大小
          symbol:"circle",//设置点点的样式
          itemStyle:{
            borderWidth:1,
            borderColor:'#666',
            color:'#666'
          },

        }

      ],
      tooltip: {
        show: true,
        triggerOn: 'click',
        position:'top',
        formatter: '{c}'
      },
      grid: {
        left: 0,
        right: 0,
      }//解决图表echarts和入容器div之间的空白，类似padding

    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;//$store用的时候没有类型，所以不得不手动添加类型
  }

  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList)
        .filter(item => item.type === this.type)  //分成收入和支出两类
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()); //从大到小排序
    if (newList.length === 0) {return [];}
    type Result = { title: string, total?: number, items: RecordItem[] }[];

    const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];//定义并初始化第一项
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];//当前项
      const last = result[result.length - 1];//最后一项,因为是最早的
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current)
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]})
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum += item.amount, 0); //map有返回值，forEach无返回值
    })
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  recordTypeList = recordTypeList;
}
</script>
<style lang="scss" scoped>
.echarts {
  max-width: 100%;
  min-height: 400px;

}

.noResult {
  padding: 16px 0;
  text-align: center;
}

::v-deep {
  .type-tabs-item { //::v-deep deep语法 用来影响子组件
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}

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
.chart{
  width:430%;//视口宽度的5倍
  &-wrapper{
    overflow: auto;//加在父容器上
    &::-webkit-scrollbar {
      display: none;//从dom中删除scrollbar,电脑上要按shift+滚轮才能看见
    }
  }
}


</style>
