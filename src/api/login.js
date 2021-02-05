import client from './client'

client.getBaseHeaders = () => ({ Accept: 'application/json' })
const login = (username, password) =>
  (client.post('/login/', { email: username, password: password }, { 'Content-Type': 'application/json' }))

const signup = (username, password, name) =>
  (client.post('/signup/', { email: username, password: password, name: name }, { 'Content-Type': 'application/json' }))

export default {
  signup,
  login,
}
