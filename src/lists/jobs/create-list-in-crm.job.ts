import { Inject } from "@nestjs/common";
import { ListGatewayInterface } from "../gateways/list-gateway-interface";
import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor()
export class CreateListInCrmJob {
    constructor(
        @Inject('ListIntegrationGateway')
        private listIntegrationGateway: ListGatewayInterface,
    ) { }

    @Process('list.created')
    async handle(job: Job) {
        console.log('job precessando...');
        console.log(job.data);
        const event = job.data
        await this.listIntegrationGateway.create(event.list)
    }

    @OnQueueFailed({ name: 'list.created' })
    handleError(error: Error) {
        console.log('CreateListInCrmJob', error);

    }
}