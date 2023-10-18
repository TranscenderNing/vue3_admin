<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

import * as echarts from 'echarts';

let chartRef = ref()
onMounted(()=>{
    let myChart = echarts.init(chartRef.value)
    myChart.setOption({
        title: {
            text: '散点图',
            color: 'white',
            left: '40%',      
        },
        xAxis:{
            show: false,
            type: 'category',
            splitLine: {
                show: false,
            },
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
                type: 'scatter',
                data: [2,5,3,6,7,8,6]
            },
        ]
    })
})

</script>


<template>
    <div class="yearBox">
        <div class="title">
            <p>年度游客量对比</p>
            <img src="../../images/dataScreen-title.png" >
        </div>
        <div class="chart" ref="chartRef">

        </div>
    </div>
</template>

<style scoped lang="scss">
.yearBox{
    width: 100%;
    height: 100%;
    background: forestgreen;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 10px 0px;
    .title{
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }
    .chart{
        width: 100%;
        height: calc(100% - 30px);

    }
}
</style>