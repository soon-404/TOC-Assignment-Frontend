import axios from 'axios'
import axiosRetry from 'axios-retry'
import { apiUrl } from 'constants'

const httpClient = axios.create({
  baseURL: apiUrl,
  timeout: 12000, // * 12 second
})

axiosRetry(httpClient, { retries: 3, retryDelay: () => 1000 })

export { httpClient }
