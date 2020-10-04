function sendBrightness(value) {
  const region = document.getElementById('region').value
  axios.post('/brightness', { value, region })
    .then(() => {
      console.log('success', value, region)
    })
    .catch((error) => {
      console.error('error', error)
    })
}