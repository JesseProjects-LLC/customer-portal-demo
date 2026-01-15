import { Project } from '../types/project'
import { cn, getStatusColor, formatDate } from '../lib/utils'

interface LocationTableProps {
  project: Project
}

export function LocationTable({ project }: LocationTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Locations</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{project.locations.length} total locations</p>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Completion
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {project.locations.map((location) => (
              <tr key={location.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{location.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{location.address}</div>
                </td>
                <td className="px-4 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusColor(location.status)
                  )}>
                    {location.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 max-w-[120px]">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all",
                          location.completion === 100 ? "bg-green-500" :
                          location.completion > 0 ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-500"
                        )}
                        style={{ width: `${location.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[40px]">
                      {location.completion}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(location.lastUpdated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
