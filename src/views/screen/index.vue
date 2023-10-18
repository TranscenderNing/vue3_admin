<script setup lang="ts">

import { ref,onMounted } from 'vue'
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Counter from './components/counter/index.vue'


let screenRef = ref()

const getScale = (w=1920,h=1080)=>{
   const ww = window.innerWidth / w
   const hh = window.innerHeight / h
   return ww > hh ? hh:ww
}

onMounted(() => {
    screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

window.onresize = ()=>{
    screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

</script>


<template>

    <div class="container">
        <!-- 展示内容区域 -->
        <div class="screen" ref="screenRef">
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist" />
                    <Sex class="sex" />
                    <Age class="age" />
                </div>
                <div class="middle">
                    <Map class="map" />
                    <Line class="line" />
                </div>
                <div class="right">
                    <Rank class="rank" />
                    <Year class="year" />
                    <Counter class="counter" />                   
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.container{
    width: 100vw;
    height: 100vh;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;
    .screen{
        position: fixed;
        left: 50%;
        top: 50%;
        width: 1920px;
        height: 1080px;
        transform-origin: left top;

        .top{
            width: 100%;
            height: 40px;
        }

        .bottom{
            display: flex;

            .left{
                flex: 1;
                height: 1040px;
    
                display: flex;
                flex-direction: column;
                .tourist{
                    flex: 1.5
                }
                .sex{
                    flex: 1;
                }
                .age{
                    flex: 1;
                }
            }

            .middle{
                flex: 2;
                display: flex;
                flex-direction: column;
                .map{
                    flex: 3;
                }
                .line{
                    flex: 1;
                }
            }

            .right{
                flex: 1;
                display: flex;
                flex-direction: column;
                .rank{
                   flex: 1.3
                }
                .year{
                    flex: 1
                }
                .counter{
                    flex: 1
                }            
            }
        }
    }
}

</style>