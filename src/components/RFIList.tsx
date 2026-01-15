import { RFI } from '../types/project'
import { cn, getStatusColor } from '../lib/utils'
import { AlertCircle } from 'lucide-react'

interface RFIListProps {
  rfis: RFI[]
}

export function RFIList({ rfis }: RFIListProps) {
  if (rfis.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-500 dark:text-gray-400">No open RFIs</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              RFI #
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Days Open
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Assigned To
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {rfis.map((rfi) => (
            <tr key={rfi.number} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                {rfi.number}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                {rfi.subject}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                {rfi.category}
              </td>
              <td className="px-4 py-4">
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded text-xs font-medium",
                  rfi.daysOpen > 7 ? "bg-red-100 text-red-700" :
                  rfi.daysOpen > 3 ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                )}>
                  {rfi.daysOpen} days
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                {rfi.assignedTo}
              </td>
              <td className="px-4 py-4">
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  getStatusColor(rfi.status)
                )}>
                  {rfi.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
