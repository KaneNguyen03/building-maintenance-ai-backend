import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ClientOptions, Transport } from "@nestjs/microservices"

@Injectable()
export class ClientConfigService {
    constructor(private config: ConfigService) { }
    private getRabbitMQConfig() {
      const user = this.config.get('RABBITMQ_USER'); // Get RabbitMQ user from config
      const password = this.config.get('RABBITMQ_PASSWORD'); // Get RabbitMQ password from config
      const host = this.config.get('RABBITMQ_HOST'); // Get RabbitMQ host from config
      const queueName = this.config.get('RABBITMQ_QUEUE_NAME'); // Get queue name from config
  
      return { user, password, host, queueName };
    }
   
    getUsersClientPort(): number {
        return this.config.get<number>('USERS_CLIENT_PORT')
    }

    getBuildingsClientPort(): number {
      console.log("🚀 ~ ClientConfigService ~ getBuildingsClientPort ~ BUILDINGS_CLIENT_PORT:", this.config.get<number>('BUILDINGS_CLIENT_PORT'))

      return this.config.get<number>('BUILDINGS_CLIENT_PORT')
    }

    get usersClientOptions(): ClientOptions {
        return {
            transport: Transport.TCP,
            options: {
                port: this.getUsersClientPort()
            }
        }
    }

    // get buildingsClientOptions(): ClientOptions {
    //     return {
    //         transport: Transport.TCP,
    //         options: {
    //             port: this.getBuildingsClientPort()
    //         }
    //     }
    // }

    get buildingsClientOptions(): ClientOptions {
      const { user, password, host, queueName } = this.getRabbitMQConfig(); // Get RabbitMQ config
const port = 3002;
console.log("🚀 ~ ClientConfigService ~ getBuildingsClientPort ~ BUILDINGS_CLIENT_PORT:", this.config.get<number>('BUILDINGS_CLIENT_PORT'))

      return {
        transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}:${port}`], // Add port to RabbitMQ connection string
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        }
      };

      
  //   get buildingsClientOptions(): ClientOptions {
  //     return {
  //         transport: Transport.RMQ,
  //         options: {
  //             urls: ['amqp://localhost:5672'],
  //             queue: 'building-maintenance',
  //         },
  //     }
  // }
    }
