function resetRegion() {
  document.getElementById('data').innerHTML = 'Waiting for data'
}

function update() {
  const region = document.getElementById('region').value

  const params = 'region=' + encodeURIComponent(region)

  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/brightness?' + params)
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return
    if (xhr.status == 200) {
      const result = xhr.responseText
      document.getElementById('data').innerHTML = `Is enabled = ${result}`
    }
    else {
      console.error('Server connection failed')
    }
  }
}

setInterval(update, 4000)