const path = require('path')
const axios = require('axios').default
const { dataGetting } = require('../dweet')
const { dataGettingMqtt } = require('../mqtt')
const { createServer } = require('../createServer')
const { protocol } = require('../protocol')

const app = createServer(path.resolve(__dirname, './public'), 3001)

app.get('/brightness', async (req, res) => {
  let data = []
  if (protocol === 'http') {
    data = await dataGetting()
  } else if (protocol === 'mqtt') {
    data = dataGettingMqtt()
  }
  res.send(data)
})

app.get('/enabled', (req, res) => {
  const { region } = req.query
  axios.get('/brightness', {
    baseURL: 'http://localhost:3002',
    params: { region }
  }).then(({ data }) => {
    res.send(data)
  })
})

app.post('/lamp', ({ body: data }) => {
  axios({
    method: 'post',
    baseURL: 'http://localhost:3002',
    url: '/lamp',
    data
  })
    .catch((error) => console.error('lamp server error', error))
})
