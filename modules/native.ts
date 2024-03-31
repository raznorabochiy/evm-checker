import { formatEther } from "ethers";
import {
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import { CONFIG } from "../config";
import { MULTICALL3_ABI, MULTICALL3_CONTRACT } from "../constants";
import { Network } from "../types";

export async function getNativeBalance(network: Network, addresses: string[]) {
  const nodeUrl = CONFIG[network].RPC_URL;
  const multicallContractAddress = CONFIG[network].MULTICALL3_CONTRACT ??
    MULTICALL3_CONTRACT;

  const multicall = new Multicall({
    nodeUrl,
    multicallCustomContractAddress: multicallContractAddress,
    tryAggregate: true,
  });

  const ballanceCalls: ContractCallContext[] = [{
    reference: "multicall3",
    contractAddress: multicallContractAddress,
    abi: MULTICALL3_ABI,
    calls: [
      ...addresses.map((item) => ({
        reference: item,
        methodName: "getEthBalance",
        methodParameters: [item],
      })),
    ],
  }];

  const call: ContractCallResults = await multicall.call(ballanceCalls);

  const { callsReturnContext } = call.results.multicall3;

  const balances = callsReturnContext.map((item) => {
    const result = BigInt(item.returnValues as unknown as string);
    return result ? formatEther(result) : 0;
  });

  return {
    header: "Native",
    balances,
  };
}
