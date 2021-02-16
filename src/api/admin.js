import client from './client'

const putAdmin = (id, admin) =>
    (client.put(`/user/${id}/${admin}/`))

export default {
  putAdmin,
}
