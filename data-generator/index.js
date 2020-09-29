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

function generateData(brightness) {
  return setInterval(() => {
    const value = brightness + Math.random() * 2
    dataGeneration(value)
    console.log(`Sended: ${value}`)
  }, 5000)
}

let sender = generateData(0)

app.post('/brightness', (req, res) => {
  const value = req.body.value
  console.log(`Client send value: ${value}`)
  clearInterval(sender)
  sender = generateData(value)
  res.send()
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
