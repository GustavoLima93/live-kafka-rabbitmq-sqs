import { connect } from 'amqplib';

export const consumer = async () => {
  try {
    const connection = await connect('amqp://user:123456@localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('queue_veiculos');

    channel.consume('queue_veiculos', (message) => {
      console.log(`Mensagem recebida: ${Buffer.from(message!.content)}`);

      channel.ack(message!);
    })

  } catch (error) {
    console.error(error);
  }
}

consumer();