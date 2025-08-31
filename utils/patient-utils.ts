import { NotCheckedInPatient } from '@/services/not-checked-in-service'

/**
 * Format patient name with age and gender
 */
export function formatPatientDisplayName(patient: NotCheckedInPatient): string {
  const name = patient.name || 'Unknown'
  const age = patient.age || 'N/A'
  const gender = patient.gender || 'N/A'
  return `${name} ${age}${gender}`
}

/**
 * Format time from ISO string to readable format
 */
export function formatTime(timeString?: string): string {
  if (!timeString) return 'N/A'
  
  try {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  } catch (error) {
    return 'Invalid time'
  }
}

/**
 * Format date from ISO string to readable format
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch (error) {
    return 'Invalid date'
  }
}

/**
 * Get service display name from consultation type
 */
export function getServiceDisplayName(consultationType?: string): string {
  if (!consultationType) return 'Unknown'
  
  switch (consultationType.toLowerCase()) {
    case 'general':
      return 'General Consultation'
    case 'specialist':
      return 'Specialist Consultation'
    case 'emergency':
      return 'Emergency Consultation'
    default:
      return consultationType
  }
}

/**
 * Get doctor display name
 */
export function getDoctorDisplayName(doctor?: string): string {
  if (!doctor) return 'Unknown Doctor'
  
  switch (doctor.toLowerCase()) {
    case 'drpraveen':
      return 'Dr. Praveen'
    case 'drsmith':
      return 'Dr. Smith'
    case 'drjones':
      return 'Dr. Jones'
    default:
      return doctor
  }
}

/**
 * Calculate time difference in minutes
 */
export function getTimeDifferenceInMinutes(timeString?: string): number {
  if (!timeString) return 0
  
  try {
    const time = new Date(timeString)
    const now = new Date()
    const diffMs = now.getTime() - time.getTime()
    return Math.floor(diffMs / (1000 * 60))
  } catch (error) {
    return 0
  }
}

/**
 * Format time difference as human readable
 */
export function formatTimeDifference(timeString?: string): string {
  const minutes = getTimeDifferenceInMinutes(timeString)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours}h ago`
  }
  
  return `${hours}h ${remainingMinutes}m ago`
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[0-9]{10}$/
  return phoneRegex.test(phone)
}

/**
 * Validate age
 */
export function validateAge(age: number): boolean {
  return age > 0 && age <= 150
}

/**
 * Generate a unique patient ID (for new patients)
 */
export function generatePatientId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `PAT${timestamp}${random}`
}
