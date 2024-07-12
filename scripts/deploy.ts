import { ethers, run } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Deploy TokenA 
  const TOKENA = await ethers.getContractFactory("TokenA")
  const tokenA = (await TOKENA.deploy("TokenA", "TokenA"))
  const tokenAAddress = await tokenA.getAddress();
  console.log(`TokenA deployed to: ${tokenAAddress}`);

  // Deploy TokenB 
  const TOKENB = await ethers.getContractFactory("TokenB")
  const tokenB = (await TOKENB.deploy("TokenB", "TokenB"))
  const tokenBAddress = await tokenB.getAddress();
  console.log(`TokenB deployed to: ${tokenBAddress}`);

  console.log("Verifying contracts on Etherscan...");

  // Verify TokenA
  await run("verify:verify", {
    address: tokenAAddress,
    constructorArguments: ["TokenA", "TokenA"],
    contract: "contracts/TokenA.sol:TokenA",
  });

  // Verify TokenB
  await run("verify:verify", {
    address: tokenBAddress,
    constructorArguments: ["TokenB", "TokenB"],
    contract: "contracts/TokenB.sol:TokenB",
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
