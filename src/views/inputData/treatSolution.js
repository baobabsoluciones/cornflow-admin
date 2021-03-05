function addDays (date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
function daysToMilliseconds (days) {
  return days * 24 * 60 * 60 * 1000
}

function outputToRow (el, durations, dependencies) {
  const id = el.job.toString()
  const mode = el.mode.toString()
  const name = id + '-' + mode
  const duration = durations[el.job][el.mode]
  const firstDate = new Date(2015, 3, 28)
  let resultString = ''
  if (el.job in dependencies) {
    resultString = dependencies[el.job].join(',')
  }
  return [id, name, mode, addDays(firstDate, el.period), null, daysToMilliseconds(duration), 100, resultString]
}

export default {
  outputToRow,
}
