import { Wallet } from "ethers";
import fs from "fs/promises";

export async function loadFormFile(filename: string) {
  const file = await fs.readFile(filename, { encoding: "utf8" });

  return file.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function getAddressFromWallet(wallet: string) {
  if (wallet.length === 42) {
    return wallet;
  }

  const { address } = new Wallet(wallet);
  return address;
}
