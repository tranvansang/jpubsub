export type Subscriber<T> = (payload: T) => any
export type Publisher<T> = {
	readonly subscriberCount: number
	subscribe(subscriber: Subscriber<T>): () => void
	publish(payload: T): void
}

export default function makePublisher<T>(): Publisher<T> {
	const subscribers = [] as Subscriber<T>[]
	return {
		get subscriberCount() {
			return subscribers.length
		},
		subscribe(subscriber: Subscriber<T>) {
			// if callback is subscribed multiple times, it will be fired multiple times
			// when removed, only last instance will be removed
			subscribers.push(subscriber)
			return () => {
				const idx = subscribers.lastIndexOf(subscriber)
				if (idx >= 0) subscribers.splice(idx, 1)
			}
		},
		publish(payload: T) {
			// if a subscriber has error, the following subscribers will not be called
			for (const subscriber of subscribers) subscriber(payload)
		}
	}
}
