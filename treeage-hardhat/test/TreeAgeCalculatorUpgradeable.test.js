const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("TreeAgeCalculatorUpgradeable", function () {
  let owner;
  let other;
  let proxy;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    const V1 = await ethers.getContractFactory("TreeAgeCalculatorUpgradeable");
    proxy = await upgrades.deployProxy(V1, [owner.address], { kind: "uups" });
    await proxy.waitForDeployment();
  });

  it("initializes the owner and calculator", async function () {
    expect(await proxy.owner()).to.equal(owner.address);
    expect(await proxy.age(0)).to.equal(0n);
    expect(await proxy.age(1)).to.equal(1n);
    expect(await proxy.age(364)).to.equal(1n);
    expect(await proxy.age(365)).to.equal(1n);
    expect(await proxy.age(366)).to.equal(2n);
  });

  it("cannot be initialized twice", async function () {
    await expect(proxy.initialize(other.address)).to.be.reverted;
  });

  it("rejects unauthorized upgrades", async function () {
    const V2 = await ethers.getContractFactory("TreeAgeCalculatorUpgradeableV2");
    await expect(upgrades.upgradeProxy(await proxy.getAddress(), V2.connect(other))).to.be.reverted;
  });

  it("upgrades to V2 while preserving the proxy address and owner", async function () {
    const proxyAddress = await proxy.getAddress();
    const ownerBefore = await proxy.owner();
    const ageBefore = await proxy.age(1000);

    const V2 = await ethers.getContractFactory("TreeAgeCalculatorUpgradeableV2");
    const upgraded = await upgrades.upgradeProxy(proxyAddress, V2);
    await upgraded.waitForDeployment();

    expect(await upgraded.getAddress()).to.equal(proxyAddress);
    expect(await upgraded.owner()).to.equal(ownerBefore);
    expect(await upgraded.age(1000)).to.equal(ageBefore);
    expect(await upgraded.version()).to.equal(2n);
    expect(await upgraded.ageV2(730)).to.equal(2n);
  });

  it("locks the implementation contract against direct initialization", async function () {
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(await proxy.getAddress());
    const implementation = await ethers.getContractAt("TreeAgeCalculatorUpgradeable", implementationAddress);
    await expect(implementation.initialize(owner.address)).to.be.reverted;
  });
});
