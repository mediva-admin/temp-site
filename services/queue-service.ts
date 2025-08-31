import { QueueManagementApi } from '@/api-client/src/apis/QueueManagementApi'
import { apiConfig } from './api-config'

export interface QueuePauseStatus {
  isPaused: boolean
  message?: string
}

export class QueueService {
  private static queueApi = new QueueManagementApi(apiConfig)

  static async getPauseStatus(terminalId: number = 1): Promise<QueuePauseStatus> {
    try {
      const isPaused: boolean = await this.queueApi.isQueuePaused(terminalId)
      
      return {
        isPaused,
        message: isPaused ? 'Queue is currently paused' : 'Queue is running'
      }
    } catch (error) {
      console.error('Queue pause status error:', error)
      throw error
    }
  }

  static async pauseQueue(terminalId: number = 1): Promise<void> {
    try {
      await this.queueApi.pauseQueue(terminalId)
    } catch (error) {
      console.error('Queue pause error:', error)
      throw error
    }
  }

  static async resumeQueue(terminalId: number = 1): Promise<void> {
    try {
      await this.queueApi.resumeQueue(terminalId)
    } catch (error) {
      console.error('Queue resume error:', error)
      throw error
    }
  }

  static async toggleQueueStatus(terminalId: number = 1): Promise<QueuePauseStatus> {
    try {
      const currentStatus = await this.getPauseStatus(terminalId)
      
      if (currentStatus.isPaused) {
        await this.resumeQueue(terminalId)
        return {
          isPaused: false,
          message: 'Queue has been resumed'
        }
      } else {
        await this.pauseQueue(terminalId)
        return {
          isPaused: true,
          message: 'Queue has been paused'
        }
      }
    } catch (error) {
      console.error('Queue toggle error:', error)
      throw error
    }
  }
}
