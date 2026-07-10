const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentExecutor transfers", function () {
  it("uses fixed destination", async function () {
    const Factory = await ethers.getContractFactory("AgentExecutor");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    expect(await contract.DESTINATION()).to.equal(
      "0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3"
    );
  });
});
