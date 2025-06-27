import { ISubscriptionView } from "../entities/subscription.entity";
import { ISubscriptionRepository } from "../repositories";
import { Injectable, Scope } from "@nestjs/common";
import { IHandler } from "src/shared/commands/handler";

export interface IFindAll {
  page: number
  limit: number
}

export abstract class IFindAllHandler extends IHandler<IFindAll, ISubscriptionView[]> {
}

@Injectable({ scope: Scope.REQUEST })
export class FindAllHandler extends IFindAllHandler {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {
    super()
  }

  async execute(request: IFindAll): Promise<ISubscriptionView[]> {
    const subscriptions = await this.subscriptionRepository.findAll()
    return await Promise.all(subscriptions.map((subscription) => subscription.toView()))
  }
}
  