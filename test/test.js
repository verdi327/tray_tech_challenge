const expect = require("chai").expect;
const Roomba = require("../roomba");

const mockInputFile1 = ["5 5", "1 2", "1 0", "2 2", "2 3", "NNESEESWNWW"];
const mockInputFile2 = ["5 5", "1 2", "1 0", "2 2", "2 3", "NNESEES"];
const mockInputFile3 = ["3 4", "1 2", "1 0", "2 2", "2 3", "NNEESWW"];
const mockInputFile4 = ["3 6", "2 3", "2 0", "1 1", "2 5", "0 4", "ESNNWSNWEW"];

describe("run()", function () {
  context(`when given input: [${mockInputFile1}]`, function () {
    it("should return { finalPosition: [1, 3], spotsCleaned: 1 }", function () {
      const roomba = new Roomba(mockInputFile1);
      const result = roomba.run();

      expect(result).to.eql({ finalPosition: [1, 3], spotsCleaned: 1 });
    });
  });

  context(`when given input: [${mockInputFile2}]`, function () {
    it("should return { finalPosition: [1, 3], spotsCleaned: 1 }", function () {
      const roomba = new Roomba(mockInputFile2);
      const result = roomba.run();

      expect(result).to.eql({ finalPosition: [4, 2], spotsCleaned: 1 });
    });
  });

  context(`when given input: [${mockInputFile3}]`, function () {
    it("should return { finalPosition: [0, 2], spotsCleaned: 2 }", function () {
      const roomba = new Roomba(mockInputFile3);
      const result = roomba.run();

      expect(result).to.eql({ finalPosition: [0, 2], spotsCleaned: 2 });
    });
  });

  context(`when given input: [${mockInputFile4}]`, function () {
    it("should return { finalPosition: [0, 4], spotsCleaned: 1 }", function () {
      const roomba = new Roomba(mockInputFile4);
      const result = roomba.run();

      expect(result).to.eql({ finalPosition: [0, 4], spotsCleaned: 1 });
    });
  });
});
