import dataImport from './data_io'
import { InstanceCore } from './../core/instance'
import moment from 'moment'

export class Instance extends InstanceCore {
  constructor (data) {
    super(data)
    this.schema = 'hk_2020_dag'
  }

  get needs () { return InstanceCore.arrayToObject(this.data.needs, ['job', 'mode', 'resource'], 'need') }
  get durations () { return InstanceCore.arrayToObject(this.data.durations, ['job', 'mode'], 'duration') }
  get parameters () { return this.data.parameters }
  get jobs () { return InstanceCore.arrayToObject(this.data.jobs, ['id']) }
  get capacities () { return InstanceCore.arrayToObject(this.data.resources, ['id'], 'available') }
  get dependencies () {
    const array = this.data.jobs
    const jobDependencies = {}
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      const treatSucc = function (el) {
        if (!(el in jobDependencies)) {
          jobDependencies[el] = []
        }
        jobDependencies[el].push(element.id)
      }
      element.successors.forEach(treatSucc)
    }
    return jobDependencies
  }

  get resources () {
    const resources = Object.keys(this.capacities)
    return resources
  }

  get renResources () {
    return this.resources.filter(Instance.resIsRenewable)
  }

  get nonRenResources () {
    return this.resources.filter((r) => !Instance.resIsRenewable(r))
  }

  get cornflowData () {
    const copy = JSON.parse(JSON.stringify(this.data))
    copy.jobs.forEach((row) => {
      delete row.description
      delete row.deadline
    })
    return copy
  }

  static resIsRenewable = (res) => res.charAt(0) === 'R'

  static fromMM = (content) => new this(dataImport.loadFile(content))

  get dataTable () {
    const capacities = this.capacities
    const resources = this.resources
    const resCols = resources.map((k, i) => ({ type: 'number', label: `${k} (${capacities[k]})` }))
    const table = [
      [
        { type: 'number', label: 'Job' },
        { type: 'number', label: 'Mode' },
        { type: 'number', label: 'Duration' },
        { type: 'string', label: 'Dependencies' },
      ],
    ]
    table[0].push(...resCols)
    const durations = this.durations
    const needs = this.needs
    const dependencies = this.dependencies
    const jobs = Object.keys(durations)
    const modes = (j) => Object.keys(durations[j])

    const jobModeToRow = function (j, m) {
      const _needs = resources.map((r) => needs[j][m][r])
      const _depend = (dependencies[j] || []).join(',')
      const main = [j, m, durations[j][m], _depend]
      return main.concat(_needs)
    }
    const newRows = []
    jobs.forEach((j) => newRows.push(...modes(j).map((m) => jobModeToRow(j, m))))
    table.push(...newRows)
    return table
  }

  get jobsMaersk () {
    const table = [
      [
        { type: 'number', label: 'Job' },
        { type: 'string', label: 'Description' },
        { type: 'number', label: 'Duration' },
        { type: 'string', label: 'Resource' },
        { type: 'string', label: 'Deadline' },
        { type: 'number', label: 'Priority' },
        { type: 'number', label: 'Res. needs' },
      ],
    ]
    const dur = InstanceCore.arrayToObject(this.data.durations, ['job'], 'duration')
    const needs = InstanceCore.arrayToObject(this.data.needs, ['job'])
    const jobs = this.jobs
    const today = moment(this.parameters.today)
    const toDate = (n) => today.add(n, 'hours').format('YYYY-MM-DD hh:mm')
    const jobToRow = function (j) {
      return [j.id, j.description, dur[j.id], needs[j.id].resource, toDate(j.deadline), 1, needs[j.id].need]
    }
    const newRows = Object.values(jobs).map(jobToRow)
    table.push(...newRows)
    return table
  }

  get resourcesTable () {
    const capacities = this.capacities
    const table = [
      [
        { type: 'string', label: 'Resource' },
        { type: 'number', label: 'Capacity' },
      ],
    ]
    for (const [key, value] of Object.entries(capacities)) {
      table.push([key, value])
    }
    return table
  }
}
