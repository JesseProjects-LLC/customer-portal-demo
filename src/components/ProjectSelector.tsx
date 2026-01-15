import { Project } from '../types/project'
import { cn, getStatusColor } from '../lib/utils'
import { ChevronDown } from 'lucide-react'

interface ProjectSelectorProps {
  projects: Project[]
  selectedProject: Project
  onSelectProject: (project: Project) => void
}

export function ProjectSelector({ projects, selectedProject, onSelectProject }: ProjectSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Project
          </label>
          <div className="relative max-w-md">
            <select
              id="project-select"
              value={selectedProject.id}
              onChange={(e) => {
                const project = projects.find(p => p.id === e.target.value)
                if (project) onSelectProject(project)
              }}
              className="block w-full px-4 py-3 pr-10 bg-white border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name} - {project.customer}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="ml-6">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Status</div>
          <span className={cn(
            "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold",
            getStatusColor(selectedProject.status)
          )}>
            {selectedProject.status}
          </span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Customer</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{selectedProject.customer}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Project ID</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{selectedProject.id}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Start Date</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
            {new Date(selectedProject.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">End Date</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
            {new Date(selectedProject.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  )
}
