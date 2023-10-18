<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

import * as echarts from 'echarts';
let chartRef = ref()

onMounted(() => {
    let myChart = echarts.init(chartRef.value)
    myChart.setOption({
        title: {
            text: '游客消费统计',
            color: 'white'
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '销售额', max: 6500 },
                { name: '管理', max: 16000 },
                { name: '信息技术', max: 30000 },
                { name: '用户支持', max: 38000 },
                { name: '发展', max: 52000 },
                { name: '市场', max: 25000 }
            ]
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '预算'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: '消费'
                    }
                ]
            }
        ]
    })
})


</script>


<template>
    <div class="counterBox">
        <div class="title">
            <p>年龄比例</p>
            <img src="../../images/dataScreen-title.png">
        </div>
        <div class="chart" ref="chartRef">

        </div>
    </div>
</template>

<style scoped lang="scss">
.counterBox {
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