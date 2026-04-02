import { useRef, useEffect } from "react";

declare const Chart: any;

export function MilestoneChart({ yearlyAmortisationSchedule }) {

    const chartRef = useRef(null);

    useEffect(() => {
        const yearlyData = yearlyAmortisationSchedule.filter((item) => item.year !== 0);

        if (yearlyData.length > 0 && chartRef.current) {
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }
          
          const milestoneYear = yearlyData.find((item) => item.cumulativeCapital > item.cumulativeInterest)?.year;

          const ctx = chartRef.current.getContext('2d');
          const newChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: yearlyData.map((item) => item.year),
              datasets: [
                {
                  label: 'Cumulative Interest Paid',
                  data: yearlyData.map((item) => item.cumulativeInterest),
                  borderColor: 'rgb(220, 38, 38)',
                  backgroundColor: 'rgb(220, 38, 38)', 
                  borderWidth: 5,
                  radius: 0,
                },
                {
                  label: 'Cumulative Capital Paid',
                  data: yearlyData.map((item) => item.cumulativeCapital),
                  borderColor: 'rgb(22, 163, 74)',
                  backgroundColor: 'rgb(22, 163, 74)',
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
                },
                annotation: milestoneYear ? {
                  annotations: {
                    milestoneLine: {
                      type: 'line',
                      scaleID: 'x',
                      value: milestoneYear,
                      borderColor: 'rgba(0, 0, 0, 0.6)',
                      borderWidth: 2,
                      borderDash: [6, 6],
                      label: {
                        display: true,
                        content: `Milestone: Year ${milestoneYear}`,
                        position: 'start',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: '#fff',
                        font: {
                          weight: 'bold',
                          size: 12,
                        },
                        padding: 6,
                      }
                    }
                  }
                } : {},
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
                    text: "Cumulative Payment (£)",
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
      }, [yearlyAmortisationSchedule]);

  return (
    <canvas ref={chartRef} width="400" height="200"></canvas>
);
}

