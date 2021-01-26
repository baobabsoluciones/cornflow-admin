import makeResource from './makeResource'
import config from '../config'

/* TODO: improve this */
const parseJSON = resp => resp.json()

const signin = (username, password) =>
  fetch(config.baseUrl + '/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: username, password: password }),
  }).then(parseJSON)

const signup = (username, password, name) =>
  fetch(config.baseUrl + '/signup/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: username, password: password, name: name }),
  })

export default {
  signin,
  signup,
  user: makeResource('user'),
  instance: makeResource('instance'),
  instancefile: makeResource('instancefile'),
  execution: makeResource('execution'),
}
