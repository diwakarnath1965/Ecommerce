import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export default function SalesChart({salesData}) {
     const options = {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Sales & Order Data',
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
      
      const labels = salesData?.map((data) => data?.date );
        
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Sales',
            data:salesData?.map((data) => data?.sales ),
            borderColor: '#f6ae84',
            backgroundColor: 'white',
            yAxisID: 'y',
          },
          {
            label: 'Orders',
            data: salesData?.map((data) => data?.numOrders ),
            borderColor: '#232f3e',
            backgroundColor: 'white',
            yAxisID: 'y1',
          },
        ],
      };
  return <Line options={options} data={data} />;
}
