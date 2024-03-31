import inquirer from "inquirer";
import { Network } from "../types";

export async function chooseNetwork(): Promise<Network> {
  const questions = [
    {
      name: "choice",
      type: "list",
      message: "Сеть:",
      choices: [
        {
          name: "1) Arbitrum",
          value: Network.ARBITRUM,
        },
        {
          name: "2) Arbitrum Nova",
          value: Network.ARBITRUM_NOVA,
        },
        {
          name: "3) Base",
          value: Network.BASE,
        },
        {
          name: "4) Blast",
          value: Network.BLAST,
        },
        {
          name: "5) BNB",
          value: Network.BNB,
        },
        {
          name: "6) Ethereum",
          value: Network.ETHEREUM,
        },
        {
          name: "7) Fantom",
          value: Network.FANTOM,
        },
        {
          name: "8) Linea",
          value: Network.LINEA,
        },
        {
          name: "9) Optimism",
          value: Network.OPTIMISM,
        },
        {
          name: "10) Polygon",
          value: Network.POLYGON,
        },
        {
          name: "11) Scroll",
          value: Network.SCROLL,
        },
        {
          name: "12) zkSync",
          value: Network.ZKSYNC,
        },
        {
          name: "13) Zora",
          value: Network.ZORA,
        },
      ],
      loop: false,
    },
  ];

  const result = await inquirer.prompt(questions);
  return result.choice;
}
