import { FileManagementApi } from '@/api-client/src/apis/FileManagementApi'
import { apiConfig } from './api-config'

export class FileManagementService {
  private static fileApi = new FileManagementApi(apiConfig)

  /**
   * Upload multiple files to S3
   * @param files Array of file blobs to upload
   * @returns Promise<Array<string>> Array of uploaded file URLs
   */
  static async uploadFiles(files: Array<Blob>): Promise<Array<string>> {
    try {
      const uploadedUrls = await this.fileApi.uploadFiles(files)
      return uploadedUrls
    } catch (error) {
      console.error('File upload error:', error)
      throw error
    }
  }

  /**
   * Download multiple files from S3
   * @param fileUrls Array of file URLs to download
   * @returns Promise<Array<string>> Array of downloaded file URLs
   */
  static async downloadFiles(fileUrls: Array<string>): Promise<Array<string>> {
    try {
      const downloadedUrls = await this.fileApi.downloadFiles(fileUrls)
      return downloadedUrls
    } catch (error) {
      console.error('File download error:', error)
      throw error
    }
  }

  /**
   * Upload a single file
   * @param file Single file blob to upload
   * @returns Promise<string> Uploaded file URL
   */
  static async uploadFile(file: Blob): Promise<string> {
    try {
      const uploadedUrls = await this.uploadFiles([file])
      return uploadedUrls[0]
    } catch (error) {
      console.error('Single file upload error:', error)
      throw error
    }
  }

  /**
   * Validate file before upload
   * @param file File to validate
   * @returns boolean Whether file is valid
   */
  static validateFile(file: File): boolean {
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return false
    }

    // Check file type (allow common medical file types)
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]
    
    return allowedTypes.includes(file.type)
  }

  /**
   * Get file size in human readable format
   * @param bytes File size in bytes
   * @returns string Formatted file size
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}
