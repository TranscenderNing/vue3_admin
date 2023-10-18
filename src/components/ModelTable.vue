<script setup lang="ts">
import { ref } from 'vue'

const data = ref(
  [
    {standard: '后门中毒', method: '基于逆向工程触发器的检测方法', result: '96', suggest: '后门输入阻断增强方法'}, 
    {standard: '对抗样本', method: '基于CW的对抗样本攻击检测', result: '95', suggest: '暂时不需要增强'}, 
    {standard: '逆向窃取', method: '基于使用替代模型攻击的检测方法', result: '91', suggest: '差分隐私增强方法'}, 
  ]
  )

</script>

<template>
  <div style="width: 90%; margin: 20px 25px;">
    <h1 style="text-align: center;">算法模型安全性评估报告</h1>
    <div style="display: flex;   justify-content: space-between;">
      <span style="padding: 20px 20px;">检测对象： AlexNet模型</span>
      <span style="padding: 20px 30px;">评分： 94</span>
    </div>
    <div style="display: flex;">
      <span style="padding: 20px 20px;">基本信息</span>
      <ul>
        <li>模型类别： 图像</li>
        <li>模型名称： AlexNet模型</li>
      </ul>
    </div>

    <el-table :data="data" style="width: 100%; align:center;" border>
      <el-table-column  type="selection" width="80" align="center">
      </el-table-column>
      <el-table-column prop="standard" label="检测标准" width="100" align="center">
      </el-table-column>
      <el-table-column prop="method" label="检测方法" width="width" align="center">
      </el-table-column>
      <el-table-column prop="result" label="检测结果" width="width" align="center">
      </el-table-column>
      <el-table-column prop="suggest" label="增强建议" width="width" align="center">
      </el-table-column>

    </el-table>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;

}
</style>
