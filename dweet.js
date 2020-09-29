const https = require('https')

const thing = 'iot-dimmer'

function dataGeneration(value) {
  const data = JSON.stringify({
    data: value
  })

  const options = {
    hostname: 'dweet.io',
    port: 443,
    path: `/dweet/for/${thing}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  const req = https.request(options)
  req.on('error', (error) => {
    console.error(error)
  })
  req.write(data)
  req.end()
}

function dataGetting() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'dweet.io',
      port: 443,
      path: `/get/latest/dweet/for/${thing}`,
      method: 'GET'
    }
    const req = https.request(options, (res) => {
      res.on('data', (data) => {
        resolve(data.toString())
      })
    })
    req.on('error', (error) => {
      reject(error)
    })
    req.end()
  })
}

module.exports = {
  dataGeneration,
  dataGetting
}
