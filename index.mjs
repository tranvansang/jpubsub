export default function makePublisher() {
	const subscribers = []
	return {
		get subscriberCount() {
			return subscribers.length
		},
		subscribe(subscriber) {
			// if callback is subscribed multiple times, it will be fired multiple times
			// when removed, only last instance will be removed
			subscribers.push(subscriber)
			return () => {
				const idx = subscribers.lastIndexOf(subscriber)
				if (idx >= 0) subscribers.splice(idx, 1)
			}
		},
		publish(payload) {
			// if a subscriber has error, the following subscribers will not be called
			for (const subscriber of subscribers) subscriber(payload)
		}
	}
}
