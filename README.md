# Event Feed - Cosmos

Aurras is a middleware that acts as an event processor and a low code workflow orchestration platform. Aurras is being pitched as a next-generation system for enabling decentralized push notification. This middleware solution listens to events from blockchain applications and propagates them to a registered pool of MQTT brokers. The broader architecture consists of parachain from which the middleware listens for the events.

This Event Feed package facilitates to source events from cosmos chains. The events will be posted to the OpenWhisk system. cosmos-sdk is used under the hood to establish the connection to blockchain nodes and receive events.

### Installation

Assuming basic dependency such as [git](https://git-scm.com/) and [yarn](https://yarnpkg.com/) already installed.

1. Clone the repository

```text
git clone https://github.com/HugoByte/aurras-event-feed-cosmos-js.git
```

  2. Navigate to the cloned directory

```text
cd aurras-event-feed-cosmos-js
```

  3. Install dependencies

```text
npm install
```

### Configuration

Configurations are passed through environment variables which can be found [here](/docs/configuration.md).

For local development and testing create a **.env** file with respective configurations in the project root folder.

```text
CHAIN_NAME=NodeTemplate
CHAIN_ENDPOINT=https://berlin.net.solidwallet.io/api/v3/
CONTRACT_ADRESS=cxf4958b242a264fc11d7d8d95f79035e35b21c1bb
EVENT_NAME=CallMessage;CallMessageSent
KAFKA_BROKERS=172.17.0.1:9092
OPENWHISK_API_KEY=23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP
OPENWHISK_API_HOST=https://139.84.142.77:31001
OPENWHISK_NAMESPACE=guest
EVENT_RECEIVER=event-receiver
EVENT_PROCESSOR=cosmos-event-processor
```

### Usage

Start the feed in development mode.

```text
npx ts-node src/index.ts
```
or 
```
npm run build
npm start
```

#### Docker Compose

```text
docker-compose --project-name cosmos-aurras up -d
```
### License
Licensed under [Apache-2.0](./LICENSE)