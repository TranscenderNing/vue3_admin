<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import { Right } from '@element-plus/icons-vue/dist/types';

let peopleNum = ref('216908人')
let chartRef = ref()

onMounted(()=>{
    let myChart = echarts.init(chartRef.value)
    myChart.setOption({
        title:{
            text: '水球图'
        },
        xAxis:{},
        yAxis:{},
        series:{
            type: 'liquidFill',
            data: [0.6,0.4,0.2],
            radius: '100%'
        },
        grid:{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }
    })
})


</script>


<template>

    <div class="touristBox">
          <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span>99999</span>人</p>
          </div>  
          <div class="number">
            <span v-for="(item,index) in peopleNum" :key="index">{{ item }}</span>
          </div>
          <div class="chart" ref="chartRef">
          </div>
    </div>

</template>

<style scoped lang="scss">
.touristBox{
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    .top{
        margin-left: 20px;
        .title{
            color: white;
            font-size: 20px;
            // margin-left: 20px;
        }
        .bg{
            width: 68px;
            height: 7px;
            background: url('../../images/dataScreen-title.png') no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }
        .right{
            float: right;
            color: white;
            font-size: 20px;
            span{
                color: yellowgreen;
            }
        }
    }
    .number{
        margin-top: 35px;
        padding: 20px;
        display: flex;
        span{
            flex: 1;
            height: 40px;
            background: url('../../images/total.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            color: #29fcff;
            line-height: 40px;
        }
    }
    .chart{
        width: 100%;
        height: 250px;
        // background: #29fcff;
    }
}
</style>