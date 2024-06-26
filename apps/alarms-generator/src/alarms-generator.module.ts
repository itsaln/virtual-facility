import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AlarmsGeneratorService } from './alarms-generator.service'
import { TracingModule } from '@app/tracing'
import { ALARMS_SERVICE } from './constants'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ClientsModule.register([
			{
				name: ALARMS_SERVICE,
				transport: Transport.NATS,
				options: {
					servers: process.env.NATS_URL
				}
			}
		]),
		TracingModule
	],
	controllers: [],
	providers: [AlarmsGeneratorService]
})
export class AlarmsGeneratorModule {}
