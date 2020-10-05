let format = 'json'

function setupFormat() {
  axios.get('/format')
    .then(({ data }) => {
      console.log('initial format: ', format)
      document.getElementById('format').value = data
      format = data
    })
    .catch((error) => {
      console.error('error', error)
    })
}

setupFormat()

function changeFormat() {
  format = document.getElementById('format').value
  axios.post('/format', { format })
    .then(() => {
      console.log('success', format)
    })
    .catch((error) => {
      console.error('error', error)
    })
}

function parseData(data) {
  if (format === 'json') {
    let result
    try {
      result = JSON.parse(data)
    } catch {
      result = {}
    } finally {
      return result
    }
  }
  const parser = new window.DOMParser()
  let doc
  if (format === 'xml') {
    doc = parser.parseFromString(data, 'text/xml')
  } else if (format === 'html') {
    doc = parser.parseFromString(data, 'text/html')
  } else {
    console.error('Wrong format')
    return
  }
  const result = {}
  Array.from(doc.getElementsByTagName('div')).forEach(div => {
    const key = div.getAttribute('key')
    const value = div.getAttribute('value')
    if (key === null || value === null) return
    result[key] = value
  })
  return result
}

function escapeSimbols(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function update() {
  axios.get('/rawdata')
    .then(({ data }) => {
      if (data === undefined) return
      data.forEach((element) => {
        const parsedElement = parseData(element)
        if (!Object.keys(parsedElement).length) return
        let result = ''
        for (const key in parsedElement) {
          result += `${key} = ${parsedElement[key]}; `
        }

        const div = document.createElement('div')
        div.className = 'line'
        const received = document.createElement('div')
        received.className = 'received'
        received.innerHTML = `Received data: ${escapeSimbols(element)}`
        const parsed = document.createElement('div')
        parsed.className = 'parsed'
        parsed.innerHTML = `Parsed data: ${result}`
        div.appendChild(received)
        div.appendChild(parsed)
        document.getElementById('data').appendChild(div)
      })
    })
    .catch((err) => {
      console.error('Server connection failed', err)
    })
}

setInterval(update, 5000)
