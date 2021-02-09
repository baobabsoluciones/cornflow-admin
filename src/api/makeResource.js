import client from './client'

export const makeResourceWithClient = client => resourceName => {
  const getAll = () => client.get(`/${resourceName}/`)

  const getOne = id => client.get(`/${resourceName}/${id}/`)

  const getOneDetail = (id, detail) => client.get(`/${resourceName}/${id}/${detail}/`)

  const del = id => client.delete(`/${resourceName}/${id}/`)

  const create = (data, headers = {}) => client.post(`/${resourceName}/`, data, headers)

  const put = (id, data, headers = {}) => client.put(`/${resourceName}/${id}/`, data, headers)

  return {
    getAll,
    getOne,
    delete: del,
    create,
    getOneDetail,
    put,
  }
}

export default makeResourceWithClient(client)
