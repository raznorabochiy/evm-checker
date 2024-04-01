import inquirer from "inquirer";
import { Network } from "../types";

function counter(startIndex = 0) {
  let index = startIndex;
  return () => index = index + 1;
}

const getNextIndex = counter();

export async function chooseNetwork(): Promise<Network> {
  const questions = [
    {
      name: "choice",
      type: "list",
      message: "Сеть:",
      choices: [
        {
          name: `${getNextIndex()}) Arbitrum`,
          value: Network.ARBITRUM,
        },
        {
          name: `${getNextIndex()}) Arbitrum Nova`,
          value: Network.ARBITRUM_NOVA,
        },
        {
          name: `${getNextIndex()}) Base`,
          value: Network.BASE,
        },
        {
          name: `${getNextIndex()}) Berachain Testnet`,
          value: Network.BERACHAIN_TESTNET,
        },
        {
          name: `${getNextIndex()}) Blast`,
          value: Network.BLAST,
        },
        {
          name: `${getNextIndex()}) BNB`,
          value: Network.BNB,
        },
        {
          name: `${getNextIndex()}) Ethereum`,
          value: Network.ETHEREUM,
        },
        {
          name: `${getNextIndex()}) Fantom`,
          value: Network.FANTOM,
        },
        {
          name: `${getNextIndex()}) Linea`,
          value: Network.LINEA,
        },
        {
          name: `${getNextIndex()}) Optimism`,
          value: Network.OPTIMISM,
        },
        {
          name: `${getNextIndex()}) Polygon`,
          value: Network.POLYGON,
        },
        {
          name: `${getNextIndex()}) Scroll`,
          value: Network.SCROLL,
        },
        {
          name: `${getNextIndex()}) zkSync`,
          value: Network.ZKSYNC,
        },
        {
          name: `${getNextIndex()}) Zora`,
          value: Network.ZORA,
        },
      ],
      loop: false,
    },
  ];

  const result = await inquirer.prompt(questions);
  return result.choice;
}
