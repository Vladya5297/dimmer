const path = require('path')
const axios = require('axios').default
const { dataGetting } = require('../dweet')
const { createServer } = require('../createServer')

const app = createServer(path.resolve(__dirname, './public'), 3001)

app.get('/brightness', async (req, res) => {
  const data = await dataGetting()
  res.send(data)
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
