import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ListCreatedEvent } from '../events/list-created.event';
import { ListGatewayInterface } from '../gateways/list-gateway-interface';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class PublishListCreatedListener {
  constructor(
    @InjectQueue('default')
    private queue: Queue
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    this.queue.add('list.created', event)
  }
}
