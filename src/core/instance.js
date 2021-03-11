import API from './../api/index'
import jsonschema from 'jsonschema'
import { arrayToObject } from './tools'

export class InstanceCore {
  constructor (data) {
    this.data = data
    this.schema = 'pulp'
  }

  static arrayToObject = arrayToObject

  static fromCornflow (id, snack) {
    return API.instance.getOneDetail(id, 'data')
      .then((response) => (new this(response.data)))
      .catch((error) => {
        if (snack != null) {
          snack.show = true
          snack.text = 'There was an error loading the instance: ' + error
          snack.color = 'error'
        } else {
          console.log(error)
        }
      })
  }

  checkSchema (snack) {
    // TODO: check this, use snack
    return API.getSchema(this.schema)
    .then((response) => {
      const validate = jsonschema.validate
      return validate(this.data, response)
    })
  }

  toCornflow (snack, name = 'default') {
    // TODO: download data_schema from server and check instance matches.
    // if it fails => throw Error
    const instData = { data: this.data, name: name, data_schema: this.schema }
    return API.instance.create(instData)
    .then((response) => {
      if (!('error' in response)) {
        return response
      }
      if (snack != null) {
        snack.show = true
        snack.text = 'Instance creation returned error: ' + response.error + '.'
        snack.color = 'error'
      } else {
        console.log(response.error)
      }
      throw Error('Instance creation failed')
    })
  }

  toCornflowAndSolve (snack, config, name = 'default') {
    return this.toCornflow(snack).then((response) => {
      const data = { config: config, instance_id: response.id, name: name, dag_name: this.schema }
      return API.execution.create(data)
      .then((response) => {
        if ('error' in response) {
          snack = { show: true, text: 'There was an error creating the execution: ' + response.error + '.', color: 'error' }
          throw Error('Execution creation failed')
        }
        return response
      })
    })
  }

  // TODO: check?
  // TODO: initialize from json file
}
