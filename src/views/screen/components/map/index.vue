
<script setup lang="ts">

import { ref,onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJson from './china.json'

let mapRef = ref()
echarts.registerMap('china',chinaJson)

onMounted(() => {
    let myChart = echarts.init(mapRef.value)
    myChart.setOption({
        geo:{
            map: 'china',
            roam: true, // 鼠标移动缩放
            label: {
                show: true,
                color: 'white',
                fontSize: 12,
            },
            itemStyle:{
                color: '#2c365c'
            },
            emphasis:{
                itemStyle:{
                    color: 'green'
                }
            }
        },
        // series:{
        //     type: 'lines',
        //     data:[
        //         {
        //             coords:[
        //                 [87.617733,43.792818],
        //                 [119.306239,26.075302]
        //             ],
        //             lineStyle:{
        //                 color: 'white',
        //             },
        //         }
        //     ]
        // }

    })
})

</script>

<template>

    <div class="mapBox" ref="mapRef">
        地图组件
    </div>
  
</template>


<style scoped lang="scss">
.mapBox{

}
</style>