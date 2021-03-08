const loadFile = function (contents) {
  contents = contents.toString()
  const lines = contents.split(/\n/)
  const PREC_STR = 'PRECEDENCE RELATIONS:'
  const REQ_STR = 'REQUESTS/DURATIONS:'
  const AVAIL_STR = 'RESOURCEAVAILABILITIES:'
  const indexPrec = lines.indexOf(PREC_STR)
  const indexRequests = lines.indexOf(REQ_STR)
  const indexAvail = lines.indexOf(AVAIL_STR)
  const precedence = lines.slice(indexPrec + 2, indexRequests - 1)
  const JobSucc = precedence.map(treatJob)
  const re = RegExp(/[RN] \d/, 'g')
  // resources:
  const resources = []
  let array1 = []
  while ((array1 = re.exec(lines[indexRequests + 1])) !== null) {
    resources.push(array1[0])
  }
  // requests / durations
  const requests = lines.slice(indexRequests + 3, indexAvail - 1)
  const needsDurations = treatModes(requests, resources)
  // availability information
  const line = lines[indexAvail + 2]
  const listAvail = line.split(/\s+/)
  const avail = []
  for (let index = 1; index < listAvail.length; index++) {
    const available = parseInt(listAvail[index])
    avail.push({ id: resources[index - 1], available: available })
  }
  return {
    durations: needsDurations.durations,
jobs: JobSucc,
    needs: needsDurations.needs,
resources: avail,
}
}
const treatJob = function (jobString) {
  const jobData = jobString.split(/\s+/)
  const succ = []
  for (let index = 0; index < jobData[3]; index++) {
    const job = parseInt(jobData[4 + index])
    succ.push(job)
  }
  const el = { id: parseInt(jobData[1]), successors: succ }
  // console.log(el)
  return el
}

const treatModes = function (requests, resources) {
  const durations = []
  const needs = []
  const normalLength = 4 + resources.length
  let job; let prevJob; let mode = job = prevJob = -1
  for (let index = 0; index < requests.length; index++) {
    const cols = requests[index].split(/\s+/)
    if (cols.length === normalLength) {
      job = prevJob = parseInt(cols[1])
      // we take out the job from the list making them always with the same format: "", mode, duration, *needs
      cols.splice(1, 1)
    } else {
      job = prevJob
    }
    mode = parseInt(cols[1])
    durations.push({ duration: parseInt(cols[2]), job: job, mode: mode })
    for (let index = 0; index < resources.length; index++) {
      const res = resources[index]
      needs.push({ job: job, mode: mode, resource: res, need: parseInt(cols[3 + index]) })
    }
  }
  return { durations: durations, needs: needs }
}

export default {
  loadFile,
}

// module.exports = {
//   loadFile,
// }
