import {arrayToObject} from './tools'

export class Solution {
  constructor(data) {
    this.data = data
  }
  get assignments () {return this.data.assignment}
  get modes () {return arrayToObject(this.assignments, ['job'], 'mode')}
}
