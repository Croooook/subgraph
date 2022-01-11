import { BigInt } from "@graphprotocol/graph-ts"
import {
  DepositTransferred as DepositTransferredEvent,
  IncentiveCreated as IncentiveCreatedEvent,
  IncentiveEnded as IncentiveEndedEvent,
  RewardClaimed as RewardClaimedEvent,
  TokenStaked as TokenStakedEvent,
  TokenUnstaked as TokenUnstakedEvent
} from "../generated/uniswapv3staker/uniswapv3staker"

import {
  
  IncentiveCreated,
 
  
} from "../generated/schema"



export function handleIncentiveCreated(event: IncentiveCreatedEvent): void {
  let entity = new IncentiveCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.rewardToken = event.params.rewardToken
  entity.pool = event.params.pool
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime
  entity.refundee = event.params.refundee
  entity.reward = event.params.reward
  entity.save()
}



