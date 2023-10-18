<script setup lang="ts">
import { ref } from 'vue'

const data = ref(
  [
    {standard: '数据规模', method: '统计数据规模是否超过阈值', result: '96', suggest: '暂时不需要增强'}, 
    {standard: '数据均衡', method: '计算类别平衡度', result: '95', suggest: '暂时不需要增强'}, 
    {standard: '数据准确', method: '多模型验证方法', result: '90', suggest: '暂时不需要增强'}, 
    {standard: '数据规范', method: '基于OpenCV视觉库检测方法', result: '85', suggest: '暂时不需要增强'}, 
    {standard: '安全威胁', method: '自编码器异常检测方法', result: '95', suggest: '基于自编码器增强方法'}, 
  ]
  )

</script>

<template>
  <div style="width: 90%; margin: 20px 25px;">
    <h1 style="text-align: center;">样本数据安全性评估报告</h1>
    <div style="display: flex;   justify-content: space-between;">
      <span style="padding: 20px 20px;">检测对象： 可见光图像数据集</span>
      <span style="padding: 20px 30px;">评分： 90</span>
    </div>
    <div style="display: flex;">
      <span style="padding: 20px 20px;">基本信息</span>
      <ul>
        <li>大小： 6万</li>
        <li>类别： 可见光图像</li>
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
