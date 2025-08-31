import { NotCheckedInQueueManagementApi } from '@/api-client/src/apis/NotCheckedInQueueManagementApi'
import {
    MoveToNotCheckedInRequest,
    MoveToNotCheckedInRequestConsultationTypeEnum,
    MoveToNotCheckedInRequestDoctorEnum,
    MoveToNotCheckedInRequestGenderEnum,
    MoveToNotCheckedInRequestReasonEnum,
    NotCheckedInPatientEntry
} from '@/api-client/src/models'
import { apiConfig } from './api-config'

export interface AddPatientRequest {
  name: string
  phone: string
  age: number
  gender: 'male' | 'female' | 'other'
  doctor: string
  consultationType: string
  reason?: string
  notes?: string
}

export interface NotCheckedInPatient {
  patientId?: string
  name?: string
  phone?: string
  age?: number
  gender?: string
  doctor?: string
  consultationType?: string
  originalStartTime?: string
  movedToNotCheckedInAt?: string
  reason?: string
  notes?: string
  tokenNumber?: number
  originalPosition?: number
}

export class NotCheckedInService {
  private static notCheckedInApi = new NotCheckedInQueueManagementApi(apiConfig)

  /**
   * Add a patient to the not checked in queue
   */
  static async addPatient(patientData: AddPatientRequest): Promise<NotCheckedInPatient> {
    try {
      const request: MoveToNotCheckedInRequest = {
        name: patientData.name,
        phone: patientData.phone,
        age: patientData.age,
        gender: this.mapGenderToEnum(patientData.gender),
        doctor: this.mapDoctorToEnum(patientData.doctor),
        consultationType: this.mapConsultationTypeToEnum(patientData.consultationType),
        reason: MoveToNotCheckedInRequestReasonEnum.Other,
        notes: patientData.notes || '',
        originalStartTime: new Date().toISOString()
      }

      const response = await this.notCheckedInApi.movePatientToNotCheckedIn(request)
      
      if (response.success && response.patient) {
        return this.mapPatientEntryToPatient(response.patient)
      }
      
      throw new Error(response.message || 'Failed to add patient')
    } catch (error) {
      console.error('Add patient error:', error)
      throw error
    }
  }

  /**
   * Get all patients in the not checked in queue
   */
  static async getAllPatients(): Promise<NotCheckedInPatient[]> {
    try {
      const patients = await this.notCheckedInApi.getAllNotCheckedInPatients()
      return patients.map(patient => this.mapPatientEntryToPatient(patient))
    } catch (error) {
      console.error('Get all patients error:', error)
      throw error
    }
  }

  /**
   * Get count of patients in not checked in queue
   */
  static async getPatientCount(): Promise<number> {
    try {
      const response = await this.notCheckedInApi.getNotCheckedInCount()
      return response.count || 0
    } catch (error) {
      console.error('Get patient count error:', error)
      throw error
    }
  }

  /**
   * Check in a patient from reception queue to terminal queue
   */
  static async checkInPatient(patientId: string): Promise<boolean> {
    try {
      const response = await this.notCheckedInApi.checkInPatient(patientId)
      return response.success || false
    } catch (error) {
      console.error('Check in patient error:', error)
      throw error
    }
  }

  /**
   * Remove a patient from the not checked in queue
   */
  static async removePatient(patientId: string): Promise<boolean> {
    try {
      const response = await this.notCheckedInApi.removeNotCheckedInPatient(patientId)
      return response.success || false
    } catch (error) {
      console.error('Remove patient error:', error)
      throw error
    }
  }

  /**
   * Map gender string to enum
   */
  private static mapGenderToEnum(gender: string): MoveToNotCheckedInRequestGenderEnum {
    switch (gender.toLowerCase()) {
      case 'male':
        return MoveToNotCheckedInRequestGenderEnum.Male
      case 'female':
        return MoveToNotCheckedInRequestGenderEnum.Female
      case 'other':
        return MoveToNotCheckedInRequestGenderEnum.Other
      default:
        return MoveToNotCheckedInRequestGenderEnum.Other
    }
  }

  /**
   * Map doctor string to enum
   */
  private static mapDoctorToEnum(doctor: string): MoveToNotCheckedInRequestDoctorEnum {
    // Map to the actual enum values from the API
    switch (doctor.toLowerCase()) {
      case 'dr. praveen':
      case 'docube':
        return MoveToNotCheckedInRequestDoctorEnum.Docube
      default:
        return MoveToNotCheckedInRequestDoctorEnum.Other
    }
  }

  /**
   * Map consultation type string to enum
   */
  private static mapConsultationTypeToEnum(consultationType: string): MoveToNotCheckedInRequestConsultationTypeEnum {
    // Map to the actual enum values from the API
    switch (consultationType.toLowerCase()) {
      case 'echo':
        return MoveToNotCheckedInRequestConsultationTypeEnum.Echo
      case 'ultrasound':
        return MoveToNotCheckedInRequestConsultationTypeEnum.Ultrasound
      case 'both':
        return MoveToNotCheckedInRequestConsultationTypeEnum.Both
      default:
        return MoveToNotCheckedInRequestConsultationTypeEnum.Echo
    }
  }

  /**
   * Map NotCheckedInPatientEntry to NotCheckedInPatient
   */
  private static mapPatientEntryToPatient(patient: NotCheckedInPatientEntry): NotCheckedInPatient {
    return {
      patientId: patient.patientId,
      name: patient.name,
      phone: patient.phone,
      age: patient.age,
      gender: patient.gender,
      doctor: patient.doctor,
      consultationType: patient.consultationType,
      originalStartTime: patient.originalStartTime,
      movedToNotCheckedInAt: patient.movedToNotCheckedInAt,
      reason: patient.reason,
      notes: patient.notes,
      tokenNumber: patient.tokenNumber,
      originalPosition: patient.originalPosition
    }
  }
}
