import { Project } from '../types/project'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ProgressChartProps {
  project: Project
}

export function ProgressChart({ project }: ProgressChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Progress</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Planned vs Actual Completion (%)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={project.progress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Completion %', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            iconType="square"
          />
          <Bar dataKey="planned" fill="#93c5fd" name="Planned" radius={[4, 4, 0, 0]} />
          <Bar dataKey="actual" fill="#3b82f6" name="Actual" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
