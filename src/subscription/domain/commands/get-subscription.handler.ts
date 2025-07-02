import { IHandler } from '../../../shared'
import { ISubscriptionView } from '../entities'
import { IFindAll } from './find-all.handler'
import { Injectable, Scope } from '@nestjs/common'
import { ISubscriptionRepository } from '../repositories'
import { NotFoundError } from '../errors'

export interface IGetSubscriptionById {
  id: string
}
export abstract class IGetSubscriptionHandler extends IHandler<
  IGetSubscriptionById,
  ISubscriptionView
> {}

@Injectable({ scope: Scope.REQUEST })
export class GetSubscriptionHandler extends IGetSubscriptionHandler {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {
    super()
  }

  async execute(request: IGetSubscriptionById): Promise<ISubscriptionView> {
    const subscription = await this.subscriptionRepository.findById(request.id)
    if (!subscription) throw new NotFoundError(request.id)
    return await subscription.toView()
  }
}
