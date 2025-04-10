
import React from 'react';
import { DailyUsage } from '@/types/wellbeing';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface UsageChartProps {
  dailyData: DailyUsage;
}

const UsageChart: React.FC<UsageChartProps> = ({ dailyData }) => {
  // Filter to only show data between 9am and 9pm for the chart
  const filteredData = dailyData.hourlyBreakdown.filter(
    item => item.hour >= 8 && item.hour <= 21
  );

  // Transform data for the stacked bar chart
  const chartData = filteredData.map(item => ({
    hour: item.hour,
    productive: item.productive,
    neutral: item.neutral,
    distracting: item.distracting
  }));

  // Format hour labels
  const formatHour = (hour: number) => {
    if (hour === 0) return '12AM';
    if (hour === 12) return '12PM';
    return hour < 12 ? `${hour}AM` : `${hour - 12}PM`;
  };

  return (
    <div className="h-64 mt-6 mb-8 text-gray-300">
      <ChartContainer 
        className="h-full"
        config={{
          productive: { color: '#4ade80' },
          neutral: { color: '#a3e635' },
          distracting: { color: '#f87171' }
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            barSize={12}
            stackOffset="none"
          >
            <XAxis 
              dataKey="hour" 
              tickFormatter={formatHour}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#1f2937' }}
              tickLine={false}
            />
            <YAxis 
              hide 
              domain={[0, 'dataMax']}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent nameKey="type" labelKey="hour" />
              }
            />
            <Bar 
              dataKey="productive" 
              stackId="stack" 
              fill="#4ade80" 
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="neutral" 
              stackId="stack" 
              fill="#a3e635" 
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="distracting" 
              stackId="stack" 
              fill="#f87171" 
              radius={[0, 0, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default UsageChart;
