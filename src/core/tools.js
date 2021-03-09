const traverseObj = function (c, v, keys, value) {
  if (keys.length === 0) {
    return v[value]
  }
  const key = v[keys[0]]
  c[key] = c[key] || {}
  c[key] = traverseObj(c[key], v, keys.slice(1), value)
  return c
}

const arrayToObject = function (data, keys, value) {
  const res = data.reduce((c, v) => {
    c = traverseObj(c, v, keys, value)
    return c
  }, {})
  return res
}

const addDays = function (date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
const daysToMilliseconds = function (days) {
  return days * 24 * 60 * 60 * 1000
}


export {
  arrayToObject,
  addDays,
  daysToMilliseconds,
}
