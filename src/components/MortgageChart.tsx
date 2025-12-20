import { useRef, useEffect } from "react";

declare const Chart: any;

export function MortgageBalanceChart({ amortisationSchedule }) {

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
                  borderColor: 'rgb(59 130 246)',
                  backgroundColor: 'rgb(59 130 246)', 
                  borderWidth: 5,
                  radius: 0,
                },
                {
                label: 'Cumulative Interest Paid',
                data: amortisationSchedule.map((item) => item.cumulativeInterest),
                borderColor: 'rgb(74, 222, 128)',
                backgroundColor: 'rgb(74, 222, 128)', 
                borderWidth: 5,
                radius: 0,
                },
                {
                label: 'Cumulative Capital Paid',
                data: amortisationSchedule.map((item) => item.cumulativeCapital),
                borderColor: 'rgb(30, 58, 138)',
                backgroundColor: 'rgb(30, 58, 138)',
                borderWidth: 5,
                radius: 0,
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  labels: {
                    color: 'rgb(0,0,0)',
                  }
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Year",
                    color: 'rgb(0,0,0)',
                  },
                  ticks: {
                    color: 'rgb(0,0,0)',
                  },
                  grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "£",
                    color: 'rgb(0,0,0)',
                  },
                  ticks: {
                    color: 'rgb(0,0,0)',
                  },
                  grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                  }
                },
              },
            }
          });
          
          chartRef.current.chart = newChart;
        }
      }, [amortisationSchedule]);

  return (
    <canvas ref={chartRef} width="400" height="200"></canvas>
);
}

