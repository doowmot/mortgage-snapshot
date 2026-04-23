import { useRef, useEffect } from "react";
import { formatCurrency } from "../utils/format";
import type { AmortisationRow } from "../utils/mortgageCalculations";

interface InflectionPointChartProps {
  yearlyAmortisationSchedule: AmortisationRow[];
}

declare const Chart: any;

export function InflectionPointChart({ yearlyAmortisationSchedule }: InflectionPointChartProps) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<any>(null);

    useEffect(() => {
        const yearlyData = yearlyAmortisationSchedule.filter((item) => item.year !== 0);

        if (yearlyData.length > 0 && canvasRef.current) {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }

          Chart.defaults.font.family = "'Inter', system-ui, -apple-system, sans-serif";
          
          const inflectionYear = yearlyData.find((item) => item.capital > item.interest)?.year;

          const ctx = canvasRef.current.getContext('2d');
          const newChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: yearlyData.map((item) => String(item.year)),
              datasets: [
                {
                  label: 'Annual Interest',
                  data: yearlyData.map((item) => item.interest),
                  borderColor: 'rgb(220, 38, 38)',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  borderWidth: 2,
                  radius: 0,
                  fill: true,
                  pointStyle: 'circle',
                },
                {
                  label: 'Annual Capital',
                  data: yearlyData.map((item) => item.capital),
                  borderColor: 'rgb(22, 163, 74)',
                  backgroundColor: 'rgba(22, 163, 74, 0.1)',
                  borderWidth: 2,
                  radius: 0,
                  fill: true,
                  pointStyle: 'circle',
                },
              ],
            },
            options: {
              responsive: true,
              aspectRatio: 1.5,
              plugins: {
                legend: {
                  labels: {
                    color: 'rgb(0,0,0)',
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                  }
                },
                tooltip: {
                  callbacks: {
                    label: function(context: any) {
                      return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                    }
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
                    callback: function(value: any) {
                      return formatCurrency(value);
                    }
                  },
                  grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                  }
                },
              },
            }
          });
          
          chartInstanceRef.current = newChart;
        }
      }, [yearlyAmortisationSchedule]);

  return (
    <div className="relative w-full">
      <canvas ref={canvasRef}></canvas>
    </div>
);
}

