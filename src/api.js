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

const getApi = async (url, token, api, id = null, method = 'GET') => {
    if (token === null) {
      console.log('Login first!')
      return null
    }
    let finalURL = url + '/' + api + '/'
    if (id !== null) {
        finalURL += id + '/'
    }
    /* let body = null
    if (method !== 'GET') {
      body = JSON.stringify('')
    } */
    const response = await fetch(finalURL, {
        method: method,
        headers: {
            Authorization: 'access_token ' + token,
        },
        })
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Server returned ' + response.status + '   ' + response.statusText)
        }
}

const getInstance = async (url, token, id = null) => {
    return await getApi(url, token, 'instance', id)
}

const delInstance = async (url, token, id) => {
    return await getApi(url, token, 'instance', id, 'DELETE')
}

const getExecution = async (url, token, id) => {
    return await getApi(url, token, 'execution', id)
}

const delExecution = async (url, token, id) => {
  return await getApi(url, token, 'execution', id, 'DELETE')
}

  export {
    getApi,
    signin,
    signup,
    getInstance,
    delInstance,
    getExecution,
    delExecution,
  }
