import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NotificationsServiceModule } from './notifications-service.module'

async function bootstrap() {
	const app = await NestFactory.create(NotificationsServiceModule)
	app.useGlobalPipes(new ValidationPipe())
	app.connectMicroservice<MicroserviceOptions>(
		{
			transport: Transport.RMQ,
			options: {
				urls: [process.env.RABBITMQ_URL],
				queue: 'notifications-service',
				noAck: false
			}
		},
		{ inheritAppConfig: true }
	)
	await app.startAllMicroservices()
	await app.listen(3000)
}

bootstrap()
