import { ActionItem } from '../types/project'
import { cn, getStatusColor, formatDate } from '../lib/utils'
import { CheckSquare } from 'lucide-react'

interface ActionItemListProps {
  actionItems: ActionItem[]
}

export function ActionItemList({ actionItems }: ActionItemListProps) {
  if (actionItems.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-500 dark:text-gray-400">No action items</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Owner
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {actionItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                {item.description}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                {item.category}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                {item.owner}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                {formatDate(item.dueDate)}
              </td>
              <td className="px-4 py-4">
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  getStatusColor(item.status)
                )}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
