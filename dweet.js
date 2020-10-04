const https = require('https')
const axios = require('axios').default
const thing = 'iot-dimmer'

function dataGeneration(data) {
  axios({
    method: 'post',
    baseURL: 'https://dweet.io:443',
    url: `/dweet/for/${thing}`,
    data
  })
    .catch((error) => console.error('dweet.io error', error))
}

function dataGetting() {
  return axios({
      method: 'get',
      baseURL: 'https://dweet.io:443',
      url: `/get/dweets/for/${thing}`
    })
      .then(({ data }) => {
        let result
        try {
          result = data.with.map((event) => event.content)
        } catch (error) {
          console.error('dweet.io error with data:', data)
        }
        return result
      })
      .catch((error) => console.error('dweet.io error', error))
}

module.exports = {
  dataGeneration,
  dataGetting
}
