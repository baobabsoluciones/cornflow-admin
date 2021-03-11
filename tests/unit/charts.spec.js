import { mount } from '@vue/test-utils'
import table from '@/views/interactive/table'
import graph from '@/views/interactive/graph'
import instanceData from './../data/oneInstance'
import solutionData from './../data/oneSolution'
import {Instance} from '@/app/instance'
import {Solution} from '@/app/solution'
import {Experiment} from '@/app/experiment'

describe('testInputDataTable', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(table, {
      propsData: {
        experiment: 
        new Experiment(
          new Instance(instanceData), 
          new Solution(solutionData)
        ),
      }
    })
  })

  it("generates a table from input data", () => {
    // cmp.setData({ inputValue: "Yoo" });
    // cmp.setProps({ reversed: true });
    const table = cmp.vm.chartData
    expect(table[0].length).toBe(8)
    expect(table[1].length).toBe(8)
  });
  // expect(wrapper.text()).toContain('Hello world')
})

describe('TestSolutionFuncs', () => {
  let experiment;

  beforeEach(() => {
    experiment = new Experiment(
      new Instance(instanceData), 
      new Solution(solutionData)
    )
  })

  it("calculate renewable resources from solution", () => {
    const resourceUsage = experiment.renResUsage
    expect(resourceUsage['R 1'][0]).toBe(6)
    expect(resourceUsage['R 2'][6]).toBe(7)
    expect(resourceUsage['N 1']).toBeUndefined()
  });

  it("calculate non renewable resources from solution", () => {
    const resourceUsage = experiment.nonRenResUsage
    expect(resourceUsage['R 1']).toBeUndefined()
    expect(resourceUsage['N 1']).toBe(97)
  });

  it("calculate make span", () => {
    const makespan = experiment.makeSpan
    expect(makespan).toBe(43)
  })
})

describe('testGraph', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(graph, {
      propsData: {
        experiment: 
        new Experiment(
          new Instance(instanceData), 
          new Solution(solutionData)
        ),
        resource: 'R 1'
      }
    })
  })

  it("calculate data for graph", () => {
    const table = cmp.vm.chartData
    expect(table[0].length).toBe(2)
    expect(table[3][1]).toBe(6)
  })

})
