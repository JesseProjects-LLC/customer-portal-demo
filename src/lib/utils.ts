import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'complete':
    case 'approved':
    case 'on track':
      return 'text-green-600 bg-green-50'
    case 'in progress':
    case 'under review':
      return 'text-blue-600 bg-blue-50'
    case 'not started':
    case 'open':
      return 'text-gray-600 bg-gray-50'
    case 'at risk':
    case 'awaiting customer input':
      return 'text-yellow-600 bg-yellow-50'
    case 'behind':
    case 'delayed':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

export function getMapPinColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'complete':
      return '#10b981' // green
    case 'in progress':
      return '#f59e0b' // yellow
    case 'not started':
      return '#6b7280' // gray
    default:
      return '#6b7280'
  }
}
