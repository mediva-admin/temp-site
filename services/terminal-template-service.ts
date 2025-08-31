import { TerminalTemplateApi } from '@/api-client/src/apis/TerminalTemplateApi'
import { TerminalTemplate } from '@/api-client/src/models'
import { apiConfig } from './api-config'

export interface TerminalTemplateData {
  id?: number
  name?: string
  description?: string
  flowSteps?: any[]
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export class TerminalTemplateService {
  private static terminalTemplateApi = new TerminalTemplateApi(apiConfig)

  /**
   * Get all terminal templates
   */
  static async getAllTerminalTemplates(): Promise<TerminalTemplateData[]> {
    try {
      const templates = await this.terminalTemplateApi.getAllTerminalTemplates()
      return templates.map(template => this.mapTerminalTemplate(template))
    } catch (error) {
      console.error('Get all terminal templates error:', error)
      throw error
    }
  }

  /**
   * Get a single terminal template by ID
   */
  static async getTerminalTemplateById(id: number): Promise<TerminalTemplateData> {
    try {
      const template = await this.terminalTemplateApi.getTerminalTemplateById(id)
      return this.mapTerminalTemplate(template)
    } catch (error) {
      console.error('Get terminal template by ID error:', error)
      throw error
    }
  }

  /**
   * Map TerminalTemplate to TerminalTemplateData
   */
  private static mapTerminalTemplate(template: TerminalTemplate): TerminalTemplateData {
    return {
      id: template.id,
      name: template.name,
      description: template.description,
      flowSteps: template.terminalAttributeTemplateList?.map((attr, index) => ({
        id: index,
        name: attr.name || `Step ${index + 1}`,
        terminalId: index + 1,
        estimatedDuration: 30,
        notes: `Pricing: ${attr.pricing || 0}`
      })) || [],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
}
