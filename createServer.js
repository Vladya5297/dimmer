const express = require('express')

function createServer(public, port) {
  const app = express()

  app.use(express.json())
  app.use(express.static(public))

  app.get('/', (req, res) => {
    res.sendFile('index.html', {
      root: public,
    })
  })

  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })

  return app
}

module.exports = {
  createServer
}
