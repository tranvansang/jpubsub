'use strict'
module.exports = function makePublisher() {
	const subscribers = []
	return {
		get subscriberCount() {
			return subscribers.length
		},
		subscribe(subscriber) {
			// if callback is subscribed multiple times, it will be fired multiple times
			// when removed, only last instance will be removed
			subscribers.push(subscriber)
			return function unsubscribe() {
				const idx = subscribers.lastIndexOf(subscriber)
				if (idx >= 0)
					subscribers.splice(idx, 1)
			}
		},
		publish(payload) {
			for (const subscriber of subscribers)
				try {
					subscriber(payload)
				} catch (_a) {
				}
		}
	}
}
