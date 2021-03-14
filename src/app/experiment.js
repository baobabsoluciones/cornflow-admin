import { daysToMilliseconds, addHours } from './../core/tools'
import { ExperimentCore } from './../core/experiment'
import { Instance } from './instance'
import { Solution } from './solution'

export class Experiment extends ExperimentCore {
  static MyInstance = Instance
  static MySolution = Solution

  get jobPeriods () {
    const durations = this.instance.durations
    const treatJob = function (el) {
      const duration = durations[el.job][el.mode]
      return {
        job: el.job,
        periods: [...Array(duration).keys()].map(p => p + el.period),
      }
    }
    return this.solution.assignments.map(treatJob)
  }

  get jobFinish () {
    const durations = this.instance.durations
    const treatJob = function (el) {
      const duration = durations[el.job][el.mode]
      return {
        job: el.job,
        finish: duration + el.period,
      }
    }
    return this.solution.assignments.map(treatJob)
  }

  get makeSpan () { return Math.max(...this.jobFinish.map(o => o.finish)) }

  get renResUsage () {
    const resources = this.instance.renResources
    const consumption = {} // resource => [sum(usagePeriod0), sum(usagePeriod1), ...]
    const makeSpan = this.makeSpan
    const needs = this.instance.needs
    const modes = this.solution.modes
    const usage = (job, resource) => (needs[job][modes[job]][resource] || 0)
    for (const res of resources) {
      consumption[res] = new Array(makeSpan + 1).fill(0)
    }
    for (const { job, periods } of this.jobPeriods) {
      for (const period of periods) {
        for (const res of resources) {
          consumption[res][period] = consumption[res][period] + usage(job, res)
        }
      }
    }
    return consumption
  }

  get nonRenResUsage () {
    const resources = this.instance.nonRenResources
    const consumption = {} // resource => sum(usage)
    const needs = this.instance.needs
    const modes = this.solution.modes
    const usage = (job, resource) => (needs[job][modes[job]][resource] || 0)
    for (const { job } of this.solution.assignments) {
      for (const res of resources) {
        consumption[res] = (consumption[res] || 0) + usage(job, res)
      }
    }
    return consumption
  }

  get dataGantt () {
    const table = [
      [
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Resource' },
        { type: 'date', label: 'Start Date' },
        { type: 'date', label: 'End Date' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
      ],
    ]
    const dependencies = this.instance.dependencies
    const durations = this.instance.durations
    const needs = Instance.arrayToObject(this.instance.data.needs, ['job'])
    let firstDate
    if (this.instance.data.parameters) {
      firstDate = Date.parse(this.instance.data.parameters.today)
    } else {
      firstDate = new Date(2015, 3, 28)
    }

    const outputToRow = function (el) {
      const id = el.job.toString()
      const resource = needs[el.job].resource
      const duration = durations[el.job][el.mode]
      let resultString = ''
      if (el.job in dependencies) {
        resultString = dependencies[el.job].join(',')
      }
      const startDate = addHours(firstDate, el.period)
      const newDuration = daysToMilliseconds(duration / 24)
      return [id, id, resource, startDate, null, newDuration, 100, resultString]
    }
    const newRows = this.solution.assignments.map(outputToRow)
    table.push(...newRows)
    return table
  }

dataResChart (resource) {
  const resources = this.instance.renResources
  if (!resources.includes(resource)) {
    throw Error('Resource is not in renewables')
  }
  const table = [['Time', resource]]
  const consumption = this.renResUsage
  for (let index = 0; index < consumption[resource].length; index++) {
    const row = [index, consumption[resource][index]]
    table.push(row)
  }
  return table
}
}
