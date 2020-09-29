function sendBrightness(time) {
  let value = 0
  switch (time) {
    case 'morning':
      value = 6
      break
    case 'day':
      value = 8
      break
    case 'evening':
      value = 4
      break
    case 'night':
      value = 2
      break
    default:
      break
  }

  const xhr = new XMLHttpRequest()

  const jsonStr = JSON.stringify({ value })

  xhr.open('POST', '/brightness')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(jsonStr)

  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return
    if (xhr.status == 200) {
      console.log('success', value)
    }
    else {
      console.error('Не удалось связаться с сервером!')
    }
  }
}