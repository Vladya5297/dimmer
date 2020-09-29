function sendBrightness(value) {
  const region = document.getElementById('region').value

  const xhr = new XMLHttpRequest()

  const jsonStr = JSON.stringify({ value, region })

  xhr.open('POST', '/brightness')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(jsonStr)

  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return
    if (xhr.status == 200) {
      console.log('success', value, region)
    }
    else {
      console.error('Server connection failed')
    }
  }
}