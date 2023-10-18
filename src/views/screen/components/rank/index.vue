<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

import * as echarts from 'echarts';

let chartRef = ref()
onMounted(()=>{
    let myChart = echarts.init(chartRef.value)
    myChart.setOption({
        title: {
            text: '景区排行',
            color: 'white',
            left: '40%',      
        },
        xAxis:{
            type: 'category',
        },
        yAxis:{
            splitLine: {
                show: false,
            },
        },
        grid:{
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
        },
        series:[
            {
                type: 'bar',
                data: [2,5,3,6,7,8,6]
            },
            {
                type: 'line',
                data: [2,5,3,6,7,8,6],
                smooth: true,
            }
        ]
    })
})


</script>


<template>
    <div class="rankBox">
        <div class="top">
            <p class="title">热门景区排行</p>
            <p class="bg"></p>
          </div>  
          <div class="chart" ref="chartRef">

          </div>
    </div>
</template>

<style scoped lang="scss">
.rankBox{
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    // margin-bottom: 20px;
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
    }
    .chart{
        width: 100%;
        height: calc(100% - 30px);
    }
}
</style>