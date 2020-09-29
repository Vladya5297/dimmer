const express = require('express')
const path = require('path')
const { dataGeneration } = require('../dweet')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'public'),
  })
})

function generateData(brightness, regionIndex) {
  return setInterval(() => {
    const value = brightness + Math.random() * 2
    const region = regionIndex
    dataGeneration({
      value,
      region
    })
    console.log(`Sended: value = ${value} region = ${region}`)
  }, 5000)
}

const values = {
  'morning': 6,
  'day': 8,
  'evening': 4,
  'night': 2
}

const regions = {
  'north': 0,
  'east': 1,
  'south': 2,
  'west': 3
}

const senders = {}

Object.values(regions).forEach(regionIndex => {
  senders[regionIndex] = generateData(0, regionIndex)
})

app.post('/brightness', (req, res) => {
  const { value, region } = req.body
  console.log(`Client send value: ${value} for region ${region}`)
  const valueIndex = values[value]
  const regionIndex = regions[region]
  clearInterval(senders[regionIndex])
  senders[regionIndex] = generateData(valueIndex, regionIndex)
  res.send()
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
