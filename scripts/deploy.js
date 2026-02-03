// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // EAS contract address on Base
  const EAS_ADDRESS = "0x4200000000000000000000000000000000000021";
  
  console.log("Deploying CrewReputation...");
  
  const CrewReputation = await ethers.getContractFactory("CrewReputation");
  const crewReputation = await CrewReputation.deploy(EAS_ADDRESS);
  
  await crewReputation.waitForDeployment();
  
  const address = await crewReputation.getAddress();
  console.log(`CrewReputation deployed to: ${address}`);
  
  // Set schema IDs (these would be created via EAS separately)
  // For now, we leave them empty and can set later
  console.log("Contract deployed! Set schemas via setSchemas()");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
