<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import type { ECharts, EChartsOption } from 'echarts';

// 註冊必要的組件
echarts.use([
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer
]);

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: ECharts | null = null;

let color1 = '#114f4f'
let color2 = '#367c7c'

const option: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      show: false, // 关闭xAxis的指示器
    }
  },
  legend: {
    data: ['bar-Data', 'line-Data'],
    top: '5%', // 将图例放在顶部
    left: 'center', // 水平居中
    orient: 'horizontal' // 水平排列（默认值，但明确指定更清晰）
  },
  grid: {
    top: '15%', // 为图例留出空间，防止图表内容与图例重叠
    right: '5%',
    bottom: '10%',
    left: '5%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['2022', '2023', '2024', '2025'],

    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '',
      min: 0,
      max: 70,
      interval: 10,
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: '',
      min: 0,
      max: 70,
      interval: 10,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: 'bar-Data',
      type: 'bar',
      data: [
        { value: 22, itemStyle: { color: color1 } },
        { value: 37, itemStyle: { color: color2 } },
        { value: 52, itemStyle: { color: color1 } },
        { value: 67, itemStyle: { color: color2 } }
      ],
      barWidth: '20%', // 也可以是具体像素值，如 10
      tooltip: {
        valueFormatter: (value: any) => {
          return `${value}`;
        }
      }
    },

    {
      name: 'line-Data',
      type: 'line',
      yAxisIndex: 1,
      data: [22, 37, 52, 67],
      itemStyle: {
        color: '#114f4f' // 第一个颜色
      },
      tooltip: {
        valueFormatter: (value: any) => {
          return `${value} `;
        }
      }
    }
  ]
};

onMounted(() => {
  if (!chartRef.value) return;

  // 初始化图表实例
  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(option);

  // 響應式調整
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  if (chartInstance) {
    window.removeEventListener('resize', handleResize);
    chartInstance.dispose();
    chartInstance = null;
  }
});

function handleResize() {
  chartInstance?.resize();
}
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 600px;"></div>
</template>
