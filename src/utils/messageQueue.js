
const amqplib = require('amqplib');
const {EXCHANGE_NAME,MESSAGE_BROKER_URL} = require('../config/serverConfig');

// Making a connection with Rabbitmq message broker
const createChannel = async ()=> {
       
   try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);  
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME , 'direct',false);     // Distributor
    return channel;
   } catch (error) {
    return error;   
   }
}


const subscribeMessage = async (channel, service, binding_key)=>{
       
    const applicationQueue = await channel.assertQueue('QUEUE_NAME');
    channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,binding_key);

    channel.consume(applicationQueue.queue , msg => {
        console.log('received data');
        console.log(msg.content.toString());
        channel.ack(msg);
    })
}


const publishMessage = async (channel ,binding_key , message)=> {
      try {
        await channel.publish(EXCHANGE_NAME , binding_key ,Buffer.from(message));
        
      } catch (error) {
          throw error;
      }
}

module.exports= {
    subscribeMessage,
    createChannel,
    publishMessage 
}




