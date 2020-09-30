const http = require('http')
const express = require('express')
const path = require('path')
const { dataGetting } = require('../dweet')
const app = express()
const port = 3001

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'public'),
  })
})

app.get('/brightness', async (req, res) => {
  const data = await dataGetting()
  res.send(data)
})

app.post('/lamp', (args) => {
  const data = JSON.stringify(args.body)
  const options = {
    hostname: 'localhost',
    port: 3002,
    path: '/lamp',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const req = http.request(options)
  req.on('error', (error) => {
    console.error(error)
  })
  req.write(data)
  req.end()
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
