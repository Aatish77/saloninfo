<template>
    <div>
      <canvas ref="doughnutChart" class="chart-canvas" width="560" height="300"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Chart as ChartJS, DoughnutController, Title, Tooltip } from 'chart.js';
  
  ChartJS.register(DoughnutController, Title, Tooltip);
  
  export default {
    setup() {
      const doughnutChart = ref(null);
  
      onMounted(() => {
        const ctx = doughnutChart.value.getContext('2d');
  
        new ChartJS(ctx, {
          type: 'doughnut', // Change type to doughnut
          data: {
            labels: ['male', 'unisex', 'female', ],
            datasets: [{
              label: 'Dataset 1',
              data: [31, 18, 50],
              backgroundColor: ['#b1b1b1','#e6e6e6', '#262626' ],
              hoverOffset: 4
            }]
          },
          options: {
            responsive: false, // Disable responsive behavior
            maintainAspectRatio: false
            // You can add other options specific to doughnut charts here
          }
        });
      });
  
      return {
        doughnutChart
      };
    }
  };
  </script>
  
  <style scoped>
  .chart-canvas {
    width: 40px; /* Set a maximum width */
    height:100px; /* Set a maximum height */
  }
  </style>
  