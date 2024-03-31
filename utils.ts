import fs from "fs/promises";

export async function loadFormFile(filename: string) {
  const file = await fs.readFile(filename, { encoding: "utf8" });

  return file.split("\n").map((item) => item.trim()).filter(Boolean);
}
