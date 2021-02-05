import makeResource from './makeResource'
import login from './login'
import config from '../config'

const instancefile = (data) =>
  fetch(config.baseUrl + '/instancefile/', {
    method: 'POST',
    headers: {
      Authorization: 'access_token ' + localStorage.getItem('token'),
    },
    body: data,
  })

export default {
  signin: login.login,
  signup: login.signup,
  instancefile,
  user: makeResource('user'),
  instance: makeResource('instance'),
  execution: makeResource('execution'),
}
