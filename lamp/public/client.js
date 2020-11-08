function resetRegion() {
  document.getElementById('data').innerHTML = 'Ожидание данных'
}

function update() {
  const region = document.getElementById('region').value

  axios.get('/brightness', {
    params: { region }
  })
    .then(({ data }) => {
      if (data === undefined) return
      const dataElem = document.getElementById('data')
      dataElem.innerHTML = ''
      const imgElem = document.createElement('img')
      imgElem.setAttribute('src', `lamp_${data ? 'on' : 'off'}.png`)
      dataElem.appendChild(imgElem)
    })
    .catch(() => {
      console.error('Server connection failed')
    })
}

setInterval(update, 5000)