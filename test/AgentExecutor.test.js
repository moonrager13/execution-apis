const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentExecutor", function () {
  it("sets deployer as owner", async function () {
    const [owner] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("AgentExecutor");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    expect(await contract.owner()).to.equal(owner.address);
  });
});
