const path = require('path')
const { dataGeneration } = require('../dweet')
const { createServer } = require('../createServer')
const axios = require('axios').default

const app = createServer(path.resolve(__dirname, './public'), 3000)

const values = {
  morning: 20,
  day: 100,
  evening: 40,
  night: 2
}

const regions = {
  'north': values.morning,
  'east': values.morning,
  'south': values.morning,
  'west': values.morning
}

function generateData(region) {
  setInterval(() => {
    const brightness = regions[region]
    const value = Math.abs(brightness + Math.random() * 10 - 5)
    const data = { value, region }
    dataGeneration(data)
    console.log(`Sended: value = ${value} region = ${region}`)

    // send to data-converter
    axios({
      method: 'post',
      baseURL: 'http://localhost:3003',
      url: '/data',
      data
    })
      .catch(() => console.error('data-converter error'))
  }, 5000)
}

for (const region in regions) {
  generateData(region)
}

app.post('/brightness', (req, res) => {
  const { value, region } = req.body
  console.log(`Client send value: ${value} for region ${region}`)
  regions[region] = values[value]
  res.send('success')
})
