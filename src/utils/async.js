import superagent from 'superagent'

export const get = (url, options) => {
  return new Promise((resolve, reject) => {
    const request = superagent.get(url)

    Object.keys(options).forEach((key) => request.set(key, options[key]))

    request.end((error, response) => {
      if (error) { return reject(error) }
      resolve(response)
    })
  })
}
