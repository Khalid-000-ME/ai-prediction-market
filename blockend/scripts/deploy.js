const hre = require("hardhat");

async function main() {
    const ReactivePredictionMarket = await hre.ethers.getContractFactory("ReactivePredictionMarket");
    const market = await ReactivePredictionMarket.deploy();
    await market.waitForDeployment();
    console.log("Contract deployed to:",await market.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
