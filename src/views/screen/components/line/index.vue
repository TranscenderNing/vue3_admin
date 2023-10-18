
<script setup lang="ts">

import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'

let chartRef = ref()
onMounted(() => {
    let myChart = echarts.init(chartRef.value)
    myChart.setOption({
        title: {
            text: '访问量'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false,
            },
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisLine:{
                show: true,
            },
            axisTike:{
                show: true,
            },
            min: 0,
            max: 3000
        },
        grid: {
            top: 0,
            bottom: 20,
            left: 40,
            right: 0
        },
        series: [
            {
                type: 'line',
                data: [120, 240, 66, 2299, 321, 890, 1200],
                smooth: true,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            }
        ]
    })
})

</script>

<template>
    <div class="lineBox">
        <div class="title">
            <p>未来七天游客数据趋势图</p>
            <img src="../../images/dataScreen-title.png">
        </div>
        <div class="chart" ref="chartRef">

        </div>
    </div>
</template>


<style scoped lang="scss">
.lineBox {
    width: 97%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 0px 20px;

    .title {
        margin-left: 10px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .chart {
        width: 100%;
        height: calc(100% - 40px);
    }
}
</style>