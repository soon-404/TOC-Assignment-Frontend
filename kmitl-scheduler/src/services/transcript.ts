import { AxiosInstance } from 'axios'
import FormData from 'form-data'
import { httpClient } from 'api/httpClient'
import { ApiTranscriptData, TranscriptData } from 'types'

class TranscriptService {
  private _httpClient: AxiosInstance

  constructor(_httpClient: AxiosInstance) {
    this._httpClient = _httpClient
  }

  public sendTranscript = async (files: File[]): Promise<TranscriptData | null> => {
    const formData = new FormData()
    formData.append('file', files[0])

    try {
      const {
        data: { data: transcript, success },
      } = await this._httpClient.post<ApiTranscriptData>('/uploader', formData, {
        headers: {
          ...formData.getHeaders,
        },
      })

      if (!success) {
        throw new Error('fetch transcript error')
      }

      return transcript
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
export const transcriptService = new TranscriptService(httpClient)
