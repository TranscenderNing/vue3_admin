<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

import * as echarts from 'echarts';

let chartRef = ref()
onMounted(() => {
    let myChart = echarts.init(chartRef.value)
    myChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 40,
            right: 50,
            orient: 'vertical',
            textStyle:{
                color: 'white',
                fontSize: 15,
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: 'white'
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '军事' },
                    { value: 735, name: '新闻' },
                    { value: 580, name: '直播' },
                    { value: 484, name: '娱乐' },
                    { value: 300, name: '财经' }
                ]
            }
        ],
        grid:{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    })
})

</script>


<template>
    <div class="ageBox">
        <div class="title">
            <p>年龄比例</p>
            <img src="../../images/dataScreen-title.png">
        </div>
        <div class="chart" ref="chartRef">

        </div>
    </div>
</template>

<style scoped lang="scss">
.ageBox {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 10px 0px;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .chart {
        width: 100%;
        height: 200px;
        // background: burlywood;
    }
}
</style>