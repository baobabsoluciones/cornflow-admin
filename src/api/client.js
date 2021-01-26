import config from '../config'

export const makeClient = ({ baseUrl = '' }) => {
  const getBaseHeaders = () => ({
    Accept: 'application/json',
    Authorization: 'access_token ' + localStorage.getItem('token'),
  })

  const parseJSON = resp => resp.json()

  const request = (url = '', options = {}) =>
    fetch(baseUrl + url, {
      ...options,
      headers: {
        ...options.headers,
        ...getBaseHeaders(),
      },
      body: JSON.stringify(options.body),
    }).then(parseJSON)

  const get = url => request(url)

  const post = (url, data = {}, headers = {}) => request(url, { method: 'POST', body: data, headers: headers })

  const del = (url, data = {}) => request(url, { method: 'DELETE', body: data })

  const patch = (url, data = {}) =>
    request(url, { method: 'PATCH', body: data })

  return {
    get,
    post,
    delete: del,
    patch,
  }
}

export default makeClient({ baseUrl: config.baseUrl })
