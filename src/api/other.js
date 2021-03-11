import client from './client'
import config from '../config'

export const putAdmin = (id, admin) =>
    (client.put(`/user/${id}/${admin}/`))

export const instancefile = (data) =>
    fetch(config.baseUrl + '/instancefile/', {
      method: 'POST',
      headers: {
        Authorization: 'access_token ' + localStorage.getItem('token'),
      },
      body: data,
    })

export const getSchema = (schema) => (client.get(`/schema/${schema}/`))
