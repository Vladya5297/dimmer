const path = require('path')
const { createServer } = require('../createServer')

const app = createServer(path.resolve(__dirname, './public'), 3002)

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
