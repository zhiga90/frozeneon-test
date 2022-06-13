import axios from 'axios'

const baseURL = 'https://registry.npmjs.com/'
const v1Url = '-/v1'

const npmSearchInstance = axios.create({
  baseURL: baseURL + v1Url,
})

const api = {
  search(text, page, perPage) {
    let from
    if (page && perPage) {
      from = (page * perPage) - perPage
    }
    return npmSearchInstance('/search', {
      params: {
        text,
        from,
        size: perPage,
      },
    })
  },
}

export default api
