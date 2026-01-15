import { Project } from '../types/project'
import { formatCurrency, formatPercentage } from '../lib/utils'
import { DollarSign, TrendingUp, CreditCard, Clock } from 'lucide-react'

interface OverviewCardsProps {
  project: Project
}

export function OverviewCards({ project }: OverviewCardsProps) {
  const invoicedPercent = (project.contract.invoiced / project.contract.total) * 100
  const paidPercent = (project.contract.paid / project.contract.invoiced) * 100

  const cards = [
    {
      title: 'Contract Value',
      value: formatCurrency(project.contract.total),
      icon: DollarSign,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Amount Invoiced',
      value: formatCurrency(project.contract.invoiced),
      subtitle: formatPercentage(invoicedPercent) + ' of contract',
      icon: TrendingUp,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Amount Paid',
      value: formatCurrency(project.contract.paid),
      subtitle: formatPercentage(paidPercent) + ' of invoiced',
      icon: CreditCard,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Remaining Balance',
      value: formatCurrency(project.contract.remaining),
      icon: Clock,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</div>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</div>
            {card.subtitle && (
              <div className="text-xs text-gray-500 dark:text-gray-400">{card.subtitle}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
