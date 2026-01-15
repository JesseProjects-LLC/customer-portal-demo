export interface Project {
  id: string
  name: string
  customer: string
  status: 'On Track' | 'At Risk' | 'Behind'
  startDate: string
  endDate: string
  contract: {
    total: number
    invoiced: number
    paid: number
    remaining: number
  }
  locations: Location[]
  rfis: RFI[]
  submittals: Submittal[]
  actionItems: ActionItem[]
  progress: ProgressData[]
}

export interface Location {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  status: 'Complete' | 'In Progress' | 'Not Started'
  completion: number
  lastUpdated: string
}

export interface RFI {
  number: string
  subject: string
  daysOpen: number
  assignedTo: string
  status: string
  category: string
}

export interface Submittal {
  id: string
  item: string
  description: string
  status: string
  dueDate: string
  category: string
}

export interface ActionItem {
  id: string
  description: string
  owner: string
  dueDate: string
  status: string
  category: string
}

export interface ProgressData {
  month: string
  planned: number
  actual: number
}
