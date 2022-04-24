import { AxiosInstance } from 'axios'
import { httpClient } from 'api/httpClient'

class TranscriptService {
  private _httpClient: AxiosInstance

  constructor(_httpClient: AxiosInstance) {
    this._httpClient = _httpClient
  }

  public sendTranscript = async (files: File[]) => {
    const formData = new FormData()
    formData.append('selectedFile', files[0])

    try {
      const { data } = await httpClient.post('/uploader', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log('x', data)
    } catch (e) {
      console.error(e)
    }
  }
}
export const transcriptService = new TranscriptService(httpClient)
