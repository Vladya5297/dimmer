const mqtt = require('mqtt')
const port = 1883
const topic = 'iot-dimmer'

// Publisher
const publisher = mqtt.connect(`mqtt://localhost:${port}`)

publisher.on('connect', () => {
	publisher.on('publish-data', (data) => {
		publisher.publish(topic, JSON.stringify(data))
	})
})

function dataGenerationMqtt (data) {
	publisher.emit('publish-data', data)
}

// Subscriber
const messages = []
const subscriber = mqtt.connect(`mqtt://localhost:${port}`)

subscriber.on('connect', () => {
	subscriber.subscribe(topic)
})

subscriber.on('message', (topic, message) => {
	messages.push(JSON.parse(message.toString()))
})

function dataGettingMqtt () {
	const result = [...messages]
  messages.splice(0, messages.length)
	return result
}

module.exports = {
	dataGenerationMqtt,
	dataGettingMqtt
}