import axios from 'axios'

const baseURL = 'https://data.jsdelivr.com/'
const v1Url = 'v1/package'

const jsDelivrInstance = axios.create({
  baseURL: baseURL + v1Url,
})

const api = {
  getNPMPack: advancedURL => jsDelivrInstance('npm/' + advancedURL || ''),
}

export default api
