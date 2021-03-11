import makeResource from './makeResource'
import login from './login'
import { putAdmin, instancefile, getSchema } from './other'

export default {
  getSchema,
  signin: login.login,
  signup: login.signup,
  putAdmin: putAdmin,
  instancefile,
  user: makeResource('user'),
  instance: makeResource('instance'),
  execution: makeResource('execution'),
}
