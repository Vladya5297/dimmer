const path = require('path')
const { js2xml } = require('xml-js')
const { createServer } = require('../createServer')

const app = createServer(path.resolve(__dirname, './public'),  3003)

const format = {
  json: true,
  xml: false,
  html: false
}

function dataConverter(data) {
  let result
  if (format.xml) {
    // XML
    const elements = []
    for (const key in data) {
      elements.push({
        "type": "element",
        "name": "div",
        "attributes": { key, value: data[key] }
      })
    }

    result = js2xml({
      "declaration":{"attributes":{"version":"1.0","encoding":"utf-8"}},
      "elements": [
        {
          "type": "element",
          "name": "body",
          elements
        }
      ]
    })
  } else if (format.html) {
    // HTML
    result = '<!DOCTYPE html>'
    for (const key in data) {
      result += `<div key='${key}' value='${data[key]}'></div>`
    }
  } else {
    // JSON
    result = JSON.stringify(data)
  }

  const dataToString = (data) => {
    let result = '{'
    for (const key in data) {
      result += ` ${key}: ${data[key]} `
    }
    result += '}'
    return result
  }

  console.log(`Received: ${dataToString(data)}\nResult: ${result}`)
  return result
}

app.post('/format', (req, res) => {
  const { format: type } = req.body
  console.log(`Client send new format: ${type}`)
  for (const key in format) {
    format[key] = false
  }
  format[type] = true
  res.send('success')
})

const dataQueue = []

app.post('/data', (req, res) => {
  const data = req.body
  dataQueue.push(dataConverter(data))
  res.send('success')
})

app.get('/rawdata', (req, res) => {
  res.send(dataQueue)
  dataQueue.splice(0, dataQueue.length)
})

app.get('/format', (req, res) => {
  let result
  for (const key in format) {
    if (format[key]) result = key
  }
  res.send(result)
})
