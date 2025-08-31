import { FlowApi } from '@/api-client/src/apis/FlowApi'
import { CreateFlow, CreateFlowFromFlowTemplateRequest, Flow } from '@/api-client/src/models'
import { apiConfig } from './api-config'

export interface CreateFlowRequest {
  patientId: number
  hospitalId: number
  flowName: string
  flowEntries: FlowEntry[]
  description?: string
}

export interface FlowEntry {
  terminalId: number
  terminalName: string
  order: number
  estimatedDuration?: number
  notes?: string
}

export interface FlowData {
  id?: string
  patientId?: string
  hospitalId?: number
  flowName?: string
  description?: string
  flowEntries?: FlowEntry[]
  currentTerminalId?: number
  status?: string
  createdAt?: string
  updatedAt?: string
}

export class FlowService {
  private static flowApi = new FlowApi(apiConfig)

  /**
   * Create a flow for a patient
   */
  static async createFlow(flowData: CreateFlowRequest): Promise<FlowData> {
    try {
      // Create the flow object first
      const flow: Flow = {
        patientId: flowData.patientId,
        hospitalId: flowData.hospitalId,
        currentStep: 0, // Start at step 0
        flowEntries: flowData.flowEntries.map(entry => ({
          terminalTemplateId: entry.terminalId, // Map terminalId to terminalTemplateId
          terminalDataId: undefined, // Will be set when terminal data is created
          comments: entry.notes || `Step: ${entry.terminalName}` // Set the comments to the step name
        }))
      }
      
      const createFlowRequest: CreateFlow = {
        patientId: flowData.patientId,
        flow: flow
      }

      const createdFlow = await this.flowApi.createFlow(createFlowRequest)
      return this.mapFlowToFlowData(createdFlow)
    } catch (error) {
      console.error('Create flow error:', error)
      throw error
    }
  }

  /**
   * Create a flow from a flow template
   */
  static async createFlowFromTemplate(request: CreateFlowFromFlowTemplateRequest): Promise<FlowData> {
    try {
      const flow = await this.flowApi.createFlowFromFlowTemplate(request)
      return this.mapFlowToFlowData(flow)
    } catch (error) {
      console.error('Create flow from template error:', error)
      throw error
    }
  }

  /**
   * Get flow for a patient
   */
  static async getFlowByPatient(patientId: string): Promise<FlowData> {
    try {
      const flow = await this.flowApi.getFlowByPatient(patientId)
      return this.mapFlowToFlowData(flow)
    } catch (error) {
      console.error('Get flow by patient error:', error)
      throw error
    }
  }

  /**
   * Save flow to flow history
   */
  static async saveFlow(flowId: string): Promise<boolean> {
    try {
      await this.flowApi.saveFlow(flowId)
      return true
    } catch (error) {
      console.error('Save flow error:', error)
      throw error
    }
  }

  /**
   * Map Flow to FlowData
   */
  private static mapFlowToFlowData(flow: Flow): FlowData {
    return {
      id: flow.id,
      patientId: flow.patientId?.toString(),
      hospitalId: flow.hospitalId,
      flowName: `Flow for Patient ${flow.patientId}`,
      description: `Flow created for patient ${flow.patientId}`,
      flowEntries: flow.flowEntries?.map(entry => ({
        terminalId: entry.terminalTemplateId || 0,
        terminalName: `Terminal ${entry.terminalTemplateId}`,
        order: 0,
        estimatedDuration: 30,
        notes: entry.comments
      })),
      currentTerminalId: flow.currentStep,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
}
