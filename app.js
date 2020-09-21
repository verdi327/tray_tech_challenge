const fs = require("fs");
const Roomba = require("./roomba");

fs.readFile("input.txt", "utf8", (err, file) => {
  if (err) {
    console.error(err);
    return;
  }

  let data = file.split("\n");
  let dupData = data.slice();

  try {
    const roomba = new Roomba(data);
    console.log("Reading file: input.txt");
    console.log(`Based on the following inputs: ${dupData}`);
    console.log("Roomba is up and running...");

    const result = roomba.run();

    console.log(`
      Final Position ------> ${result.finalPosition}
      Total Dirt Cleaned --> ${result.spotsCleaned}`);
  } catch (e) {
    console.log(e);
  }
});
