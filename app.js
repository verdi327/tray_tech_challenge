const fs = require("fs");
const Roomba = require("./roomba");

fs.readFile("input.txt", "utf8", (err, file) => {
  if (err) {
    console.error(err);
    return;
  }

  let data = file.split("\n");

  try {
    const roomba = new Roomba(data);
    const result = roomba.run();
    console.log(`
      Final Position ------> ${result.finalPosition}
      Total Dirt Cleaned --> ${result.spotsCleaned}`);
  } catch (e) {
    console.log(e);
  }
});
