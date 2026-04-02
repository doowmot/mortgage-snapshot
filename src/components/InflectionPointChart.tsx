import { useRef, useEffect } from "react";

declare const Chart: any;

export function InflectionPointChart({ yearlyAmortisationSchedule }) {

    const chartRef = useRef(null);

    useEffect(() => {
        const yearlyData = yearlyAmortisationSchedule.filter((item) => item.year !== 0);

        if (yearlyData.length > 0 && chartRef.current) {
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }
          
          const inflectionYear = yearlyData.find((item) => item.capital > item.interest)?.year;

          const ctx = chartRef.current.getContext('2d');
          const newChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: yearlyData.map((item) => String(item.year)),
              datasets: [
                {
                  label: 'Annual Interest',
                  data: yearlyData.map((item) => item.interest),
                  borderColor: 'rgb(220, 38, 38)',
                  backgroundColor: 'rgb(220, 38, 38)', 
                  borderWidth: 5,
                  radius: 0,
                },
                {
                  label: 'Annual Capital',
                  data: yearlyData.map((item) => item.capital),
                  borderColor: 'rgb(22, 163, 74)',
                  backgroundColor: 'rgb(22, 163, 74)',
                  borderWidth: 5,
                  radius: 0,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  labels: {
                    color: 'rgb(0,0,0)',
                  }
                },
                annotation: inflectionYear ? {
                  annotations: {
                    inflectionLine: {
                      type: 'line',
                      scaleID: 'x',
                      value: String(inflectionYear),
                      borderColor: 'rgba(0, 0, 0, 0.6)',
                      borderWidth: 2,
                      borderDash: [6, 6],
                      label: {
                        display: true,
                        content: `Inflection: Year ${inflectionYear}`,
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
                    text: "Annual Payment (£)",
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
    <div className="relative w-full">
      <canvas ref={chartRef}></canvas>
    </div>
);
}

