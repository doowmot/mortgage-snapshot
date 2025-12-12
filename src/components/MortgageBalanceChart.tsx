import { useState, useRef, useEffect } from "react";

export function MortgageBalanceChart({ amortisationSchedule }) {

    declare const Chart: any;
    const chartRef = useRef(null);

    useEffect(() => {
        if (amortisationSchedule.length > 0 && chartRef.current) {
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }
          
          const ctx = chartRef.current.getContext('2d');
          const newChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: amortisationSchedule.map((item) => item.year),
              datasets: [
                {
                  label: 'Balance Remaining',
                  data: amortisationSchedule.map((item) => item.balance),
                  borderColor: 'rgb(30, 58, 138)',
                  borderWidth: 2
                },
                {
                label: 'Cumulative Interest Paid',
                data: amortisationSchedule.map((item) => item.cumulativeInterest),
                borderColor: 'rgb(74, 222, 128)',
                borderWidth: 2
                },
                {
                label: 'Cumulative Capital Paid',
                data: amortisationSchedule.map((item) => item.cumulativeCapital),
                borderColor: 'rgb(96, 165, 250)',
                borderWidth: 2
                },
    
              ],
            },
            options: {
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Year"
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: "£"
                  }
                },
              }
            }
          });
          
          chartRef.current.chart = newChart;
        }
      }, [amortisationSchedule]);

  return (
    <canvas ref={chartRef} width="400" height="200"></canvas>
);
}

