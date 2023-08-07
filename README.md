# jpubsub - Simple Javascript PubSub

## Install

```bash
yarn add jpubsub
# or
npm install -S jpubsub
```

```typescript
import makePublisher from 'jpubsub'
import type {Subscriber} from 'jpubsub' // generic type Subscriber<T>
// or
const pubsub = require('jpubsub')

// define a subscriber
const subscriber: Subscriber<string> = (data) => {
		console.log(data)
}
// create a publisher
const pubsliher = makePubsliher<string>()
// subscribe
const unsubscribe = publisher.subscribe(subscriber)
// publish
publisher.publish('hello')
// unsubscribe
unsubscribe()
```
