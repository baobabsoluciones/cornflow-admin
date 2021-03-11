import { arrayToObject } from './tools'
import API from './../api/index'

export class SolutionCore {
  constructor (data) {
    this.data = data
    this.schema = 'pulp'
  }

  static arrayToObject = arrayToObject

  static fromCornflow (id, snack) {
    // in a static method, "this" refers to the constructor
    return API.execution.getOneDetail(id, 'status').then((response) => {
      if (response.state === 0) {
        if (snack != null) {
          Object.assign(snack, { show: true, text: 'Results are not yet ready', color: 'error' })
        }
        throw Error('Execution creation failed')
      } else if (response.state < 0) {
        if (snack != null) {
          Object.assign(snack, { show: true, text: 'There was an error solving the instance', color: 'error' })
        }
        throw Error('Execution creation failed')
      }
      return API.execution.getOneDetail(id, 'data')
        .then((response) => (new this(response.data)))
        .catch((error) => {
          if (snack != null) {
            Object.assign(snack, { show: true, text: 'There was an error loading the solution: ' + error, color: 'error' })
          } else {
            console.log(error)
          }
          throw Error('Execution creation failed')
        })
    })
    }
  // TODO: initialize from json file
  // TODO: check if it matches a schema from server
  // TODO: send to server (post or put with execution id)
}
