import client from './client'

export const makeResourceWithClient = client => resourceName => {
  const getAll = () => client.get(`/${resourceName}/`)

  const getOne = id => client.get(`/${resourceName}/${id}/`)

  const del = id => client.delete(`/${resourceName}/${id}/`)

  const create = (data, headers = {}) => client.post(`/${resourceName}/`, data, headers)

  return {
    getAll,
    getOne,
    delete: del,
    create,
  }
}

export default makeResourceWithClient(client)
