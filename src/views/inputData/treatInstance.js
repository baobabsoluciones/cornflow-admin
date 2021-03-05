// readFile = require('./read_mm')
// fs = require('fs')
// fs.readFile('/home/pchtsp/Documents/projects/hackathonbaobab2020/data/c15.mm/c154_3.mm',
// (err, data) => (readAndConvert(data)
// ))

// function readAndConvert (data) {
//   result = readFile.loadFile(data)
//   // inputToDurations(result)
//   res = inputToDependencies(result)
//   console.log(res)
// }

const inputToDurations = function (input) {
  const array = input.durations
  const jobModeDuration = {}
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (!(element.job in jobModeDuration)) {
      jobModeDuration[element.job] = {}
    }
    jobModeDuration[element.job][element.mode] = element.duration
  }
  return jobModeDuration
}

const inputToDependencies = function (input) {
  const array = input.jobs
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

export default {
  inputToDependencies,
  inputToDurations,
}
