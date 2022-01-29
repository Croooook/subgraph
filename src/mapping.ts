import { BigInt, crypto, ByteArray, ethereum, log } from "@graphprotocol/graph-ts"


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
  let encoded1 = ethereum.encode(ethereum.Value.fromAddress(event.params.rewardToken))!
  let encoded2 = ethereum.encode(ethereum.Value.fromAddress(event.params.pool))!
  let encoded3 = ethereum.encode(ethereum.Value.fromUnsignedBigInt(event.params.startTime))!
  let encoded4 = ethereum.encode(ethereum.Value.fromUnsignedBigInt(event.params.endTime))!
  let encoded5 = ethereum.encode(ethereum.Value.fromAddress(event.params.refundee))!

  let encoded = ByteArray.fromHexString(`${encoded1.toHexString()}${encoded2.toHexString().slice(2)}${encoded3.toHexString().slice(2)}${encoded4.toHexString().slice(2)}${encoded5.toHexString().slice(2)}`)

  let id = crypto.keccak256(encoded)

  let entity = new IncentiveCreated(id.toHexString())
  entity.rewardToken = event.params.rewardToken
  entity.pool = event.params.pool
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime
  entity.refundee = event.params.refundee
  entity.reward = event.params.reward
  entity.save()
}

export function handleIncentiveEnded(event: IncentiveEndedEvent): void {
  let entity = new IncentiveEnded(event.params.incentiveId.toHexString())
  entity.refund = event.params.refund
  entity.save()
}

export function handleTokenStaked(event: TokenStakedEvent): void {
  let entity = new TokenStaked(
    event.params.incentiveId.toString()
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
    event.params.incentiveId.toHexString()
  )
  entity.tokenId = event.params.tokenId
  entity.incentiveId = event.params.incentiveId
  entity.save()
}

