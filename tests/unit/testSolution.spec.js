//import { shallowMount } from '@vue/test-utils'
import readMM from './../../src/views/inputData/data_io'
import {arrayToObject} from './../../src/core/tools'
import {Instance} from './../../src/core/instance'
import {Solution} from './../../src/core/solution'
import {Experiment} from './../../src/core/experiment'
import solutionData from './../data/oneSolution.json'
import instanceData from './../data/oneInstance.json'
import fs from 'fs'

describe('Instances', () => {
  let instance

  beforeEach(() => {
    instance = new Instance(instanceData)
  })

  it("arrayToNested", () => {
    const data = [
      {"company":"Google","country":"USA","employee":"John", "value": 1},
      {"company":"Amazon","country":"UK","employee":"Arya", "value": 2},
      {"company":"Google","country":"KSA","employee":"Cersi", "value": 3},
      {"company":"Amazon","country":"USA","employee":"Tyrion", "value": 4},
      {"company":"Amazon","country":"USA","employee":"Daenarys", "value": 5},
      {"company":"Google","country":"KSA","employee":"Dothrokhi", "value": 6}
    ];
    const result = arrayToObject(data, ["company", "country", "employee"], "value")
    expect(result.Google.USA.John).toBe(1)
    expect(result.Amazon.UK.Arya).toBe(2)
    // console.log(result)
  })

  it("get durations", () => {
    const durations = instance.durations
    expect(durations[1][1]).toBe(0)
    expect(durations[3][3]).toBe(6)
  })

  it ("get needs", () => {
    const needs = instance.needs
    expect(needs[1][1]["R 1"]).toBe(0)
    expect(needs[2][2]["N 2"]).toBe(5)
  })

  it('read mm file and convert to json', () => {
    const readAndConvert = function (data) {
      const result = readMM.loadFile(data)
      expect(result).toEqual(instanceData)
    }
    // let exists = fs.existsSync('tests/data/c1564_9.mm')
    // let _files = fs.readdirSync('@/')
    fs.readFile('tests/data/c1564_9.mm', (err, data) => readAndConvert(data))
  })
})

describe('Solutions', () => {
  let experiment

  beforeEach(() => {
    experiment = new Experiment(new Instance(instanceData), new Solution(solutionData))
  })

  it('read an instance and a solution and treat solution', () => {
    const data = experiment.dataGantt
  })

  it('calculate renewable resources from solution', () => {
    const durations = experiment.renResUsage
  })
})

