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
  IncentiveEnded,
  TokenStaked,
  TokenUnstaked,
 
  
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

export function handleIncentiveEnded(event: IncentiveEndedEvent): void {
  let entity = new IncentiveEnded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.incentiveId = event.params.incentiveId
  entity.refund = event.params.refund
  entity.save()
}

export function handleTokenStaked(event: TokenStakedEvent): void {
  let entity = new TokenStaked(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  let incentiveCreated = IncentiveCreated.load(event.params.incentiveId.toString())
if (!incentiveCreated){
  incentiveCreated = new IncentiveCreated (event.params.incentiveId.toString())
}
//If incentiveId isn't unique, you may need to concat with event.logIndex.toString()
entity.incentiveId = incentiveCreated.id
  entity.liquidity = event.params.liquidity
  entity.save()
}

export function handleTokenUnstaked(event: TokenUnstakedEvent): void {
  let entity = new TokenUnstaked(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.incentiveId = event.params.incentiveId
  entity.save()
}

