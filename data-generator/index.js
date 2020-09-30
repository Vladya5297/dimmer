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

function generateData(brightness, region) {
  return setInterval(() => {
    const value = Math.abs(brightness + Math.random() * 10 - 5)
    dataGeneration({
      value,
      region
    })
    console.log(`Sended: value = ${value} region = ${region}`)
  }, 5000)
}

const values = {
  morning: 20,
  day: 100,
  evening: 40,
  night: 2
}

const regions = [
  'north',
  'east',
  'south',
  'west'
]

const senders = {}

regions.forEach(region => {
  senders[region] = generateData(0, region)
})

app.post('/brightness', (req, res) => {
  const { value, region } = req.body
  console.log(`Client send value: ${value} for region ${region}`)
  const valueIndex = values[value]
  clearInterval(senders[region])
  senders[region] = generateData(valueIndex, region)
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
