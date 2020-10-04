function resetRegion() {
  document.getElementById('data').innerHTML = 'Waiting for data'
}

function update() {
  const region = document.getElementById('region').value

  axios.get('/brightness', {
    params: { region }
  })
    .then(({ data }) => {
      if (data === undefined) return
      document.getElementById('data').innerHTML = `Is enabled = ${data}`
    })
    .catch(() => {
      console.error('Server connection failed')
    })
}

setInterval(update, 5000)