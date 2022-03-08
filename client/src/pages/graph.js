import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { QUERY_EXPENSES } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { ChartData }  from "./GetExpense";

ChartJS.register(ArcElement, Tooltip, Legend);
// ChartData() this crashes site
console.log(ChartData.expenseLabels)
const labelArr =ChartData.expenseLabels
const graphNumbers= ChartData.expenseAmounts

export const graphData = {
  labels: ["chash","pickle","dog","car","ribbit"],
  datasets: [
    {
      label: '# of Expenses',
      data: ['1','2','3','4','5'],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function ExpensesGraph() {
  return <Doughnut options= {{width:"200px", height:"200px"}} data={graphData} />;
}