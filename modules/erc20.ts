import { formatUnits, Interface } from "ethers";
import {
  CallReturnContext,
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import { CONFIG } from "../config";
import { ERC20_ABI, MULTICALL3_CONTRACT } from "../constants";
import { Network } from "../types";

function getDecimals(context: CallReturnContext[]) {
  const result = context.find((item) => item.reference === "decimals");
  return BigInt(result?.returnValues as unknown as string);
}

function getSymbol(context: CallReturnContext[]) {
  const result = context.find((item) => item.reference === "symbol");
  const iface = new Interface(ERC20_ABI);

  const [symbol] = iface.decodeFunctionResult(
    "symbol",
    result?.returnValues as unknown as string,
  );

  return symbol;
}

export async function getErc20Balance(
  network: Network,
  addresses: string[],
  tokenContractAddress: string,
) {
  const nodeUrl = CONFIG[network].RPC_URL;
  const multicallCustomContractAddress = CONFIG[network].MULTICALL3_CONTRACT ??
    MULTICALL3_CONTRACT;

  const multicall = new Multicall({
    nodeUrl,
    multicallCustomContractAddress,
    tryAggregate: true,
  });

  const erc20Calls: ContractCallContext[] = [{
    reference: "erc20",
    contractAddress: tokenContractAddress,
    abi: ERC20_ABI,
    calls: [
      {
        reference: "decimals",
        methodName: "decimals",
        methodParameters: [],
      },
      {
        reference: "symbol",
        methodName: "symbol",
        methodParameters: [],
      },
      ...addresses.map((item) => ({
        reference: item,
        methodName: "balanceOf",
        methodParameters: [item],
      })),
    ],
  }];

  const call: ContractCallResults = await multicall.call(erc20Calls);

  const { callsReturnContext } = call.results.erc20;

  const decimals = getDecimals(callsReturnContext);
  const symbol = getSymbol(callsReturnContext);

  const balanceOf = callsReturnContext.filter((item) =>
    item.methodName === "balanceOf"
  );

  const balances = balanceOf.map((item) => {
    const result = BigInt(item.returnValues as unknown as string);
    return result ? formatUnits(result, decimals) : 0;
  });

  return {
    header: symbol,
    balances,
  };
}
