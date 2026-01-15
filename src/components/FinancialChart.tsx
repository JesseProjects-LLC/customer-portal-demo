import { Project } from '../types/project'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { formatCurrency } from '../lib/utils'

interface FinancialChartProps {
  project: Project
}

const COLORS = {
  paid: '#10b981',
  invoiced: '#3b82f6',
  remaining: '#9ca3af',
}

export function FinancialChart({ project }: FinancialChartProps) {
  const data = [
    { name: 'Paid', value: project.contract.paid, color: COLORS.paid },
    { name: 'Invoiced (Not Paid)', value: project.contract.invoiced - project.contract.paid, color: COLORS.invoiced },
    { name: 'Remaining', value: project.contract.remaining, color: COLORS.remaining },
  ]

  const renderCustomLabel = (entry: any) => {
    const percent = ((entry.value / project.contract.total) * 100).toFixed(0)
    return `${percent}%`
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Financial Summary</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Budget Breakdown</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
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
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.paid }}></div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Paid</div>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(project.contract.paid)}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.invoiced }}></div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Invoiced</div>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(project.contract.invoiced - project.contract.paid)}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.remaining }}></div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Remaining</div>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(project.contract.remaining)}</div>
        </div>
      </div>
    </div>
  )
}
