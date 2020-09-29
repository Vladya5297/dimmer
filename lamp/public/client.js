function getBrightness() {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', '/brightness')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return
    if (xhr.status == 200) {
      const brightness = JSON.parse(xhr.responseText).with.find(({ thing }) => thing === "iot-dimmer").content.data
      const lampBrightness = brightness < 8 ? Math.round(10 - brightness) : 0
      document.body.innerHTML = `External brightness = ${brightness} <br>lamp brightness = ${lampBrightness}`
    }
    else {
      console.error('Не удалось связаться с сервером!')
    }
  }
}

setInterval(getBrightness, 7000)
