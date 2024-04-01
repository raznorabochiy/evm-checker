import { Config, Network } from "../types";

import {
  COLUMNS as COLUMNS_ARBITRUM,
  RPC_URL as RPC_URL_ARBITRUM,
} from "./arbitrum";

import {
  COLUMNS as COLUMNS_ARBITRUM_NOVA,
  RPC_URL as RPC_URL_ARBITRUM_NOVA,
} from "./arbitrum-nova";

import { COLUMNS as COLUMNS_BASE, RPC_URL as RPC_URL_BASE } from "./base";

import {
  COLUMNS as COLUMNS_BERACHAIN_TESTNET,
  RPC_URL as RPC_URL_BERACHAIN_TESTNET,
} from "./berachain-testnet";

import { COLUMNS as COLUMNS_BLAST, RPC_URL as RPC_URL_BLAST } from "./blast";

import { COLUMNS as COLUMNS_BNB, RPC_URL as RPC_URL_BNB } from "./bnb";

import {
  COLUMNS as COLUMNS_ETHEREUM,
  RPC_URL as RPC_URL_ETHEREUM,
} from "./ethereum";

import { COLUMNS as COLUMNS_FANTOM, RPC_URL as RPC_URL_FANTOM } from "./fantom";

import { COLUMNS as COLUMNS_LINEA, RPC_URL as RPC_URL_LINEA } from "./linea";

import {
  COLUMNS as COLUMNS_OPTIMISM,
  RPC_URL as RPC_URL_OPTIMISM,
} from "./optimism";

import {
  COLUMNS as COLUMNS_POLYGON,
  RPC_URL as RPC_URL_POLYGON,
} from "./polygon";

import { COLUMNS as COLUMNS_SCROLL, RPC_URL as RPC_URL_SCROLL } from "./scroll";

import {
  COLUMNS as COLUMNS_ZKSYNC,
  MULTICALL3_CONTRACT as MULTICALL3_CONTRACT_ZKSYNC,
  RPC_URL as RPC_URL_ZKSYNC,
} from "./zksync";

import { COLUMNS as COLUMNS_ZORA, RPC_URL as RPC_URL_ZORA } from "./zora";

export const CONFIG: Config = {
  [Network.ARBITRUM]: {
    RPC_URL: RPC_URL_ARBITRUM,
    COLUMNS: COLUMNS_ARBITRUM,
  },
  [Network.ARBITRUM_NOVA]: {
    RPC_URL: RPC_URL_ARBITRUM_NOVA,
    COLUMNS: COLUMNS_ARBITRUM_NOVA,
  },
  [Network.BASE]: {
    RPC_URL: RPC_URL_BASE,
    COLUMNS: COLUMNS_BASE,
  },
  [Network.BERACHAIN_TESTNET]: {
    RPC_URL: RPC_URL_BERACHAIN_TESTNET,
    COLUMNS: COLUMNS_BERACHAIN_TESTNET,
  },
  [Network.BLAST]: {
    RPC_URL: RPC_URL_BLAST,
    COLUMNS: COLUMNS_BLAST,
  },
  [Network.BNB]: {
    RPC_URL: RPC_URL_BNB,
    COLUMNS: COLUMNS_BNB,
  },
  [Network.ETHEREUM]: {
    RPC_URL: RPC_URL_ETHEREUM,
    COLUMNS: COLUMNS_ETHEREUM,
  },
  [Network.FANTOM]: {
    RPC_URL: RPC_URL_FANTOM,
    COLUMNS: COLUMNS_FANTOM,
  },
  [Network.LINEA]: {
    RPC_URL: RPC_URL_LINEA,
    COLUMNS: COLUMNS_LINEA,
  },
  [Network.OPTIMISM]: {
    RPC_URL: RPC_URL_OPTIMISM,
    COLUMNS: COLUMNS_OPTIMISM,
  },
  [Network.POLYGON]: {
    RPC_URL: RPC_URL_POLYGON,
    COLUMNS: COLUMNS_POLYGON,
  },
  [Network.SCROLL]: {
    RPC_URL: RPC_URL_SCROLL,
    COLUMNS: COLUMNS_SCROLL,
  },
  [Network.ZKSYNC]: {
    RPC_URL: RPC_URL_ZKSYNC,
    COLUMNS: COLUMNS_ZKSYNC,
    MULTICALL3_CONTRACT: MULTICALL3_CONTRACT_ZKSYNC,
  },
  [Network.ZORA]: {
    RPC_URL: RPC_URL_ZORA,
    COLUMNS: COLUMNS_ZORA,
  },
};
