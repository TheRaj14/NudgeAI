
import React from 'react';
import { 
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// Data types
export interface DailyProgress {
  day: string;
  tasks: number;
  focusMinutes: number;
}

export interface WeeklyProgress {
  week: string;
  tasks: number;
  focusHours: number;
}

interface ProgressChartProps {
  data: DailyProgress[] | WeeklyProgress[];
  type: 'daily' | 'weekly';
  chartType?: 'line' | 'bar';
}

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  data, 
  type,
  chartType = 'line'
}) => {
  // Determine which data key to use for primary visualization
  const dataKey = type === 'daily' ? 'focusMinutes' : 'focusHours';
  const labelKey = type === 'daily' ? 'day' : 'week';
  
  // Colors
  const primaryColor = 'hsl(var(--primary))';
  const secondaryColor = 'hsl(var(--secondary))';
  
  if (chartType === 'line') {
    return (
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey={labelKey} 
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={primaryColor}
              strokeWidth={3}
              dot={{ fill: primaryColor, strokeWidth: 2, r: 4, stroke: primaryColor }}
              activeDot={{ r: 6, fill: primaryColor, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke={secondaryColor}
              strokeWidth={3}
              dot={{ fill: secondaryColor, strokeWidth: 2, r: 4, stroke: secondaryColor }}
              activeDot={{ r: 6, fill: secondaryColor, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis 
            dataKey={labelKey} 
            tickLine={false}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
            labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
          />
          <Bar dataKey={dataKey} fill={primaryColor} radius={[4, 4, 0, 0]} barSize={30} />
          <Bar dataKey="tasks" fill={secondaryColor} radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
