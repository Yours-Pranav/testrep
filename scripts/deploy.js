async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with", deployer.address);
  const Factory = await ethers.getContractFactory("RektStoryNFT");
  const c = await Factory.deploy();
  await c.deployed();
  console.log("Deployed to", c.address);
}
main().catch(err => { console.error(err); process.exit(1); });
