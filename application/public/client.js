function resetRegion() {
  document.getElementById('data').innerHTML = 'Waiting for data'
}

function toggleLamp(state) {
  const region = document.getElementById('region').value

  const xhr = new XMLHttpRequest()
  xhr.open('POST', '/lamp')
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify({
    state,
    region
  }))
}

function getBrightness() {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/brightness')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return
    if (xhr.status == 200) {
      const result = xhr.responseText
      if (!result) return
      JSON.parse(result).forEach(({ value, region }) => {
        const currentRegion = document.getElementById('region').value
        if (currentRegion === region.toString()) {
          const lampsShouldBeEnabled = value < 25
          document.getElementById('data').innerHTML = `External brightness = ${value}klx <br>lamps should be enabled = ${lampsShouldBeEnabled}`
        }
      })
    }
    else {
      console.error('Server connection failed')
    }
  }
}

setInterval(getBrightness, 4000)
