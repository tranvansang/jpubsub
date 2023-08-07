export type Subscriber<T> = (payload: T) => any;
export type Publisher<T> = {
	readonly subscriberCount: number;
	subscribe(subscriber: Subscriber<T>): () => void;
	publish(payload: T): void;
};
export default function makePublisher<T>(): Publisher<T>;
