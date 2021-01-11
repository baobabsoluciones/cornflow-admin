/* TODO: change to the codeblocks zip style */
const signin = async (url, username, password) => {
    const data = { email: username, password: password }
    const response = await fetch(url + '/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        return response.json()
      } else {
        console.log('Server returned ' + response.status + '   ' + response.statusText)
      }
  }

  const signup = async (url, username, password, name) => {
    const data = { email: username, password: password, name: name }
    const response = await fetch(url + '/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        return response.json()
      } else {
        console.log('Server returned ' + response.status + '   ' + response.statusText)
      }
  }

const getApi = async (url, token, api, id = null, method = 'GET', data = null, form = null) => {
    if (token === null) {
      console.log('Login first!')
      return null
    }
    let finalURL = url + '/' + api + '/'
    if (id !== null) {
        finalURL += id + '/'
    }
    const headers = {
      Authorization: 'access_token ' + token,
    }
    if (data !== null) {
      headers['Content-Type'] = 'application/json'
    }
    if (form !== null) {
      headers['Content-Type'] = 'multipart/form-data'
    }
    const response = await fetch(finalURL, {
        method: method,
        headers: headers,
        body: data,
        })
        if (response.ok) {
          if (response.status === 200) {
            return response.json()
          }
        } else {
          throw new Error('Server returned ' + response.status + ' ' + response.statusText)
        }
}

const getInstance = async (url, token, id = null) => {
    return await getApi(url, token, 'instance', id)
}

const delInstance = async (url, token, id) => {
    return await getApi(url, token, 'instance', id, 'DELETE')
}

const newInstance = async (url, token, data) => {
  return await getApi(url, token, 'instance', null, 'POST', JSON.stringify({ data: data, name: data.parameters.name }))
}

const newInstanceFile = async (url, token, formData) => {
  return await getApi(url, token, 'instance', null, 'POST', formData)
}

const getExecution = async (url, token, id) => {
    return await getApi(url, token, 'execution', id)
}

const delExecution = async (url, token, id) => {
  return await getApi(url, token, 'execution', id, 'DELETE')
}

const newExecution = async (url, token, config, instanceId) => {
  return await getApi(url, token, 'execution', null, 'POST', JSON.stringify({ config: config, instance_id: instanceId, name: 'test' }))
}

  export {
    getApi,
    signin,
    signup,
    getInstance,
    delInstance,
    newInstance,
    newInstanceFile,
    getExecution,
    delExecution,
    newExecution,
  }
