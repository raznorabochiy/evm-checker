import cli from "cli";
import { CONFIG } from "./config";
import { WALLETS_FILENAME } from "./constants";
import { chooseNetwork } from "./modules/choice";
import Cvs from "./modules/csv";
import { getErc20Balance } from "./modules/erc20";
import { getNativeBalance } from "./modules/native";
import { Network } from "./types";
import { loadFormFile } from "./utils";

const wallets = await loadFormFile(WALLETS_FILENAME);

const networkArg = process.argv[2] as Network;
let network = networkArg;

if (!network) {
  network = await chooseNetwork();
}

console.time("Время");
cli.spinner(`Загружаю данные, ${wallets.length} адресов`);

const columns = CONFIG[network].COLUMNS;
const csv = new Cvs(network);

const data = await Promise.all(
  columns.map((token) => {
    if (token === "native") {
      return getNativeBalance(network, wallets);
    }

    return getErc20Balance(network, wallets, token);
  }),
);

csv.write(["Address", ...data.map((item) => item.header)]);

for (let i = 0; i < wallets.length; i++) {
  const address = wallets[i];
  csv.write([address, ...data.map((item) => item.balances[i])]);
}

csv.close();
cli.spinner("Готово", true);
console.timeEnd("Время");
