function changeFormat() {
  const format = document.getElementById('format').value
  axios.post('/format', { format })
    .then(() => {
      console.log('success', format)
    })
    .catch((error) => {
      console.error('error', error)
    })
}

function parseData(data) {
  const format = document.getElementById('format').value
  const parser = new window.DOMParser()
  let result
  if (format === 'xml') {
    result = parser.parseFromString(data, 'text/xml')
  } else if (format === 'html') {
    result = parser.parseFromString(data, 'text/html')
  } else {
    result = JSON.parse(data)
  }
  return result
}

function update() {
  axios.get('/rawdata')
    .then(({ data }) => {
      if (data === undefined) return
      data.forEach((element) => {
        const parsedElement = parseData(element)
        let result = ''
        for (const key in parsedElement) {
          result += `${key} = ${parsedElement[key]}; `
        }
        const div = document.createElement('div')
        div.innerHTML = `Received data: ${element}
        <br>Parsed data: ${result}<br>`
        document.getElementById('data').appendChild(div)
      })
    })
    .catch((err) => {
      console.error('Server connection failed', err)
    })
}

setInterval(update, 5000)
