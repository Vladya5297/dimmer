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
    dataGeneration({
      value,
      region
    })
    console.log(`Sended: value = ${value} region = ${region}`)
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

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
