import { PatientQueueEntry } from '@/api-client/src/models'

export interface PatientQueueItem {
  id: string
  name: string
  patientId?: string
  phone?: string
  age?: number
  gender?: string
  doctor?: string
  startTime?: string
  consultationType?: string
  queueStatus?: string
}

export const transformQueueEntryToPatient = (entry: PatientQueueEntry): PatientQueueItem => {
  return {
    id: entry.id || entry.patientId || '',
    name: entry.name || '',
    patientId: entry.patientId,
    phone: entry.phone,
    age: entry.age,
    gender: entry.gender,
    doctor: entry.doctor,
    startTime: entry.startTime,
    consultationType: entry.consultationType,
    queueStatus: entry.queueStatus,
  }
}

export const formatPatientDisplayName = (patient: PatientQueueItem): string => {
  const name = patient.name || ''
  const age = patient.age ? ` ${patient.age}` : ''
  const gender = patient.gender ? patient.gender.charAt(0) : ''
  
  return `${name}${age}${gender}`
}
