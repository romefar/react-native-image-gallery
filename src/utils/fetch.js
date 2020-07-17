import axios from 'axios'

const fetch = async (url, method = 'GET', body = null, headers = {}, params = {}) => {
  const items = await axios({
    url,
    method,
    data: body,
    headers,
    params
  })
  return items.data
}

export default fetch
