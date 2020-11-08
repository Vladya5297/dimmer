function resetRegion() {
  document.getElementById('data').innerHTML = 'Waiting for data'
}

function toggleLamp(state) {
  const region = document.getElementById('region').value

  axios.post('/lamp', { state, region })
    .then(() => {
      console.log('success', state, region)
    })
    .catch((error) => {
      console.error('error', error)
    })
}

function getBrightness() {
  axios.get('/brightness')
    .then(({ data }) => {
      if (data === undefined) return
      data.forEach(({ value, region }) => {
        const currentRegion = document.getElementById('region').value
        if (currentRegion === region.toString()) {
          const lampsShouldBeEnabled = value < 25
          document.getElementById('data').innerHTML = `Освещенность = ${value} килолюксов
          <br>Лампы должны быть включены = ${lampsShouldBeEnabled ? 'Да' : 'Нет'}`
        }
      })
    })
    .catch(() => {
      console.error('Server connection failed')
    })
}

setInterval(getBrightness, 10000)
