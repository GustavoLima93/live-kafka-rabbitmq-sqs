import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'loca-tech-consumer',
  brokers: ['localhost:9092']
});

export const consumerFN = async () => {
  const consumer = kafka.consumer({
      groupId: 'loca-tech-group'
    });
  
  await consumer.connect();

  await consumer.subscribe({
    topics: ['aluguel-topic-locatech'],
    fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      console.log(`Mensagem recebida: ${message?.value?.toString()}`)
      console.log(`Tópico: ${topic}`)
      console.log(`Partição: ${partition}`)
  }})
}

consumerFN()