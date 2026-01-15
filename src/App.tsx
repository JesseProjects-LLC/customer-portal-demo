import { useState, useEffect } from 'react'
import { Project } from './types/project'
import { ProjectSelector } from './components/ProjectSelector'
import { OverviewCards } from './components/OverviewCards'
import { ProgressChart } from './components/ProgressChart'
import { FinancialChart } from './components/FinancialChart'
import { LocationMap } from './components/LocationMap'
import { LocationTable } from './components/LocationTable'
import { RFIList } from './components/RFIList'
import { SubmittalList } from './components/SubmittalList'
import { ActionItemList } from './components/ActionItemList'
import { Loader2, Moon, Sun } from 'lucide-react'

type TabType = 'rfis' | 'submittals' | 'actionItems'

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('rfis')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    fetch('/customer-portal/data/projects.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load projects')
        return res.json()
      })
      .then(data => {
        setProjects(data.projects)
        if (data.projects.length > 0) {
          setSelectedProject(data.projects[0])
        }
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading project data...</p>
        </div>
      </div>
    )
  }

  if (error || !selectedProject) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-2">Error Loading Projects</h2>
          <p className="text-red-700 dark:text-red-500">{error || 'No projects available'}</p>
        </div>
      </div>
    )
  }

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'rfis', label: 'RFIs', count: selectedProject.rfis.length },
    { id: 'submittals', label: 'Submittals', count: selectedProject.submittals.length },
    { id: 'actionItems', label: 'Action Items', count: selectedProject.actionItems.length },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="../resources/logos/LogoOnly Simple Padded.svg"
                alt="JesseProjects"
                className="h-12 w-12"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customer Portal</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Real-time project visibility and updates</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Selector */}
        <ProjectSelector
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />

        {/* Financial Overview Cards */}
        <OverviewCards project={selectedProject} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProgressChart project={selectedProject} />
          <FinancialChart project={selectedProject} />
        </div>

        {/* Map and Table Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LocationMap project={selectedProject} />
          <LocationTable project={selectedProject} />
        </div>

        {/* Project Activity Tabs */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-colors">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Activity</h3>
              <div className="flex space-x-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                      ${activeTab === tab.id
                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-t border-l border-r border-gray-200 dark:border-gray-700'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span className={`
                        ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                        ${activeTab === tab.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-200 text-gray-600'
                        }
                      `}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6">
            {activeTab === 'rfis' && <RFIList rfis={selectedProject.rfis} />}
            {activeTab === 'submittals' && <SubmittalList submittals={selectedProject.submittals} />}
            {activeTab === 'actionItems' && <ActionItemList actionItems={selectedProject.actionItems} />}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Questions about your project? Contact your project manager.</p>
          <p className="mt-1">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>
    </div>
  )
}

export default App
