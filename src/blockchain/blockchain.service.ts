import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { createPublicClient, http } from 'viem';
import { avalancheFuji } from 'viem/chains';
import SIMPLE_STORAGE from './simple-storage.json';

@Injectable()
export class BlockchainService {
  private client;
  private contractAddress: `0x${string}`;

  constructor() {
    this.client = createPublicClient({
      chain: avalancheFuji,
      transport: http("https://api.avax-test.network/ext/bc/C/rpc"),
    });

    // GANTI dengan address hasil deploy Day 2
    this.contractAddress = '0xa22ed62bedbfb22ee46d90bfe5b3859f460b1949' as `0x${string}`;
  }

  // 🔹 Read latest value
  async getLatestValue() {
    const value = await this.client.readContract({
      address: this.contractAddress,
      abi: SIMPLE_STORAGE.abi,
      functionName: "getValue",
    }) as bigint;
    return { success: true, value: value.toString() };
  } catch (error) {
    this.handleRpcError(error);
  }

  // 🔹 Read ValueUpdated events
  async getValueUpdatedEvents(fromBlock: any, toBlock: any) {
    try {
      const startBlock = BigInt(Number(fromBlock));
      const endBlock = BigInt(Number(toBlock));
    
    const events = await this.client.getLogs({
      address: this.contractAddress,
      event: {
        type: "event",
        name: "ValueUpdated",
        inputs: [
          {
            name: "newValue",
            type: "uint256",
            indexed: false,
          },
        ],
      },
      fromBlock: BigInt(fromBlock), 
      toBlock: BigInt(toBlock),
    });

    return events.map((event: any) => ({
      blockNumber: event.blockNumber?.toString(),
      value: event.args.newValue?.toString(),
      txHash: event.transactionHash,
    }));
  } catch (error) {
    console.log('Error parsing fromBlock/toBlock:', error.message);
  }
}

private handleRpcError(error: any) {
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  throw new InternalServerErrorException(`RPC Error: ${message}`);
}
}