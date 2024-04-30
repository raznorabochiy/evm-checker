import cli from "cli";
import { CONFIG } from "./config";
import { WALLETS_FILENAME } from "./constants";
import { chooseNetwork } from "./modules/choice";
import Cvs from "./modules/csv";
import { getErc20Balance } from "./modules/erc20";
import { getNativeBalance } from "./modules/native";
import { Network } from "./types";
import { getAddressFromWallet, loadFormFile } from "./utils";

const wallets = await loadFormFile(WALLETS_FILENAME);
const addresses = wallets.map(getAddressFromWallet);
const isWalletsContainPrivateKeys = wallets.some((wallet) =>
  wallet.length > 42
);

const networkArg = process.argv[2] as Network;
let network = networkArg;

if (!network) {
  network = await chooseNetwork();
}

console.time("Время");
cli.spinner(`Загружаю данные, ${addresses.length} адресов`);

const columns = CONFIG[network].COLUMNS;
const csv = new Cvs(network);

const data = await Promise.all(
  columns.map((token) => {
    if (token === "native") {
      return getNativeBalance(network, addresses);
    }

    return getErc20Balance(network, addresses, token);
  }),
);

const walletColumns = isWalletsContainPrivateKeys
  ? ["Address", "PrivateKey"]
  : ["Address"];
const csvHeader = [...walletColumns, ...data.map((item) => item.header)];
csv.write(csvHeader);

for (let i = 0; i < wallets.length; i++) {
  const wallet = wallets[i];
  const address = addresses[i];

  const privateKey = wallet !== address ? wallet : "";
  const walletColumns = isWalletsContainPrivateKeys
    ? [address, privateKey]
    : [address];
  const row = [...walletColumns, ...data.map((item) => item.balances[i])];

  csv.write(row);
}

csv.close();
cli.spinner("Готово", true);
console.timeEnd("Время");
