const express = require('express')
const path = require('path')
const app = express()
const port = 3002

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'public'),
  })
})

const regions = {
  'north': false,
  'east': false,
  'south': false,
  'west': false
}

app.post('/lamp', (req, res) => {
  const { state, region } = req.body
  regions[region] = state
  console.log(regions)
  res.send('success')
})

app.get('/brightness/', async (req, res) => {
  const { region } = req.query
  res.send(regions[region])
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
