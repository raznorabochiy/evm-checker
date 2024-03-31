import fs, { WriteStream } from "fs";
import path from "path";
import { CSV_DELIMITER, CSV_RESULTS_FOLDER } from "../constants";
import { Network } from "../types";

export default class Csv {
  private stream: WriteStream;

  constructor(network: Network) {
    this.stream = fs.createWriteStream(
      path.join(CSV_RESULTS_FOLDER, network + ".csv"),
    );
  }

  write(data: (string | number)[]) {
    const line = data.join(CSV_DELIMITER) + "\n";
    this.stream.write(line);
  }

  close() {
    this.stream.close();
  }
}
