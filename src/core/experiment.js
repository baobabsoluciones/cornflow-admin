import API from './../api/index'
import { InstanceCore } from './instance'
import { SolutionCore } from './solution'

export class ExperimentCore {
  static MyInstance = InstanceCore
  static MySolution = SolutionCore

  constructor (instance, solution) {
    this.instance = instance
    this.solution = solution
  }

  static fromCornflow (id, snack) {
    // in a static method, "this" refers to the constructor
    // debugger
    return API.execution.getOne(id)
      .then((response) => {
        const promise1 = this.MyInstance.fromCornflow(response.instance_id, snack)
        const promise2 = this.MySolution.fromCornflow(response.id, snack)
        return Promise.all([promise1, promise2]).then((values) => {
          return new this(values[0], values[1])
        })
      })
  }
  // TODO: initialize from json files
  // TODO: send to server (post/put)
}
