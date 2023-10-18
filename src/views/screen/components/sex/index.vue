<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';

let chartRef = ref()

onMounted(()=>{
    let myChart = echarts.init(chartRef.value)
    myChart.setOption({
        title:{
            text:'男女比例',
            textStyle:{
                color: 'skyblue',
            },
            left: '40%'
        },
        series:[
            {
                type:'bar',
                data: [58],
                barWidth: 20,
                z:100,
                itemStyle:{
                    color: 'skyblue',
                    borderRadius: 20
                }
            },
            {
                type:'bar',
                data: [100],
                barWidth: 20,
                barGap: '-100%',
                itemStyle:{
                    color: 'pink',
                    borderRadius: 20
                }
            },
        ],
        xAxis:{
            show: false,
            min: 0,
            max: 100
        },
        yAxis:{
            show: false,
            type: 'category',
        },
        grid:{
            top:0,
            bottom: 0,
            left: 0,
            right: 0
        }
    })
})


</script>


<template>

    <div class="sexBox">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" >
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images/man.png" >
            </div>
            <div class="woman">
                <img src="../../images/woman.png" alt="">
            </div>
        </div>
        <div class="rate">
            <p>男生58%</p>
            <p>男生42%</p>
        </div>
        <div class="chart" ref="chartRef">

        </div>

    </div>

</template>

<style scoped lang="scss">
.sexBox{
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
    .sex{
        display: flex;
        justify-content: center;
        align-items: center;
        .man{
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url('../../images/man-bg.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: cneter;
        }
        .woman{
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url('../../images/woman-bg.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: cneter;
        }
    }
    .rate{
        display: flex;
        justify-content: space-between;
        color: white;
    }
    .chart{
        width: 100%;
        height: 150px;
        // background: yellowgreen;
    }
}
        
</style>