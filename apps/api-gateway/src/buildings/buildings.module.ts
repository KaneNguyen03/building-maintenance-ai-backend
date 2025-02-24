import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientOptions, Transport } from '@nestjs/microservices';
import { ClientConfigService } from 'apps/configs/client-confit.service';
import { BuildingsService } from './Buildings.service';
import { BUILDING_CLIENT } from '../constraints';
import { BuildingsController } from './buildings.controller';
import { ClientConfigModule } from 'apps/configs/client-config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [    ClientConfigModule,
//     ConfigModule
//   ],
//   providers: [
//     BuildingsService,
//         PassportModule,
    
//     {
//       provide: BUILDING_CLIENT,
//       useFactory: (configService: ClientConfigService) => {
//         const clientOptions = configService.buildingsClientOptions; // Getting the client options
//         return ClientProxyFactory.create(clientOptions); // Using the correct options for RabbitMQ
//       },
//       inject: [ClientConfigService], // Inject ClientConfigService to get the correct options
//     },
//   ],
//   controllers: [BuildingsController],
// })
// export class BuildingsModule {}
@Module({
  controllers: [BuildingsController],
  imports: [
    ConfigModule,
    ClientConfigModule
  ],
  providers: [
    BuildingsService,
    {
      provide: BUILDING_CLIENT,
useFactory: (configService: ConfigService) => {

        const user = configService.get('RABBITMQ_USER');
        console.log("🚀 ~ ussdasdssdadsadussdasdssdadsadadasdadsdadsserussdasdssdadsadadasdadsdadsserussdasdssdadsadadasdadsdadsseradasdadsdadsser:", user)
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');
        const queueName = configService.get('RABBITMQ_QUEUE_NAME');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService,ClientConfigService],
    },
  ],
})
export class BuildingsModule { }