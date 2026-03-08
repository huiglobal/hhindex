import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '../common/Button';
import { LineChart as LineIcon, BarChart3, AreaChart as AreaIcon } from 'lucide-react';

interface TimelineDataPoint {
  date: string;
  incidents: number;
  averageSeverity: number;
}

interface TimelineChartProps {
  data: TimelineDataPoint[];
  height?: number;
}

type ChartType = 'line' | 'bar' | 'area';

export function TimelineChart({ data, height = 300 }: TimelineChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line');

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              yAxisId="left"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Incidents', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Avg Severity', angle: 90, position: 'insideRight' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="incidents"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Incidents"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="averageSeverity"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: '#EF4444', r: 4 }}
              activeDot={{ r: 6 }}
              name="Avg Severity"
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              yAxisId="left"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Incidents', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Avg Severity', angle: 90, position: 'insideRight' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar
              yAxisId="left"
              dataKey="incidents"
              fill="#3B82F6"
              name="Incidents"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="averageSeverity"
              fill="#EF4444"
              name="Avg Severity"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              yAxisId="left"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Incidents', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Avg Severity', angle: 90, position: 'insideRight' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="incidents"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              name="Incidents"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="averageSeverity"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.3}
              name="Avg Severity"
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Chart Type Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Chart Type:</span>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={chartType === 'line' ? 'primary' : 'outline'}
            onClick={() => setChartType('line')}
            icon={<LineIcon className="w-4 h-4" />}
          >
            Line
          </Button>
          <Button
            size="sm"
            variant={chartType === 'bar' ? 'primary' : 'outline'}
            onClick={() => setChartType('bar')}
            icon={<BarChart3 className="w-4 h-4" />}
          >
            Bar
          </Button>
          <Button
            size="sm"
            variant={chartType === 'area' ? 'primary' : 'outline'}
            onClick={() => setChartType('area')}
            icon={<AreaIcon className="w-4 h-4" />}
          >
            Area
          </Button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
