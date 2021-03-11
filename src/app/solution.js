import { SolutionCore } from './../core/solution'

export class Solution extends SolutionCore {
  constructor (data) {
    super(data)
    this.schema = 'hk_2020_dag'
  }

  get assignments () { return this.data.assignment }
  get modes () { return SolutionCore.arrayToObject(this.assignments, ['job'], 'mode') }
  static fromCornflow = SolutionCore.fromCornflow
}
