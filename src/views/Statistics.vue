<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ECharts :options="x"/>
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
//const ECharts:any = require('vue-echarts').default
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'


console.log("ECharts")
console.log(ECharts)

@Component({
  components: {Tabs,ECharts},
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
  get x(){
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])

    }
    console.log('hi')

    return {
      title: {
        text: '极坐标双数值轴'
      },
      legend: {
        data: ['line']
      },
      polar: {
        center: ['50%', '54%']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      series: [
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: data
        }
      ],
      animationDuration: 2000
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

</style>
