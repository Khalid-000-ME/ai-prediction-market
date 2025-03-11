const hre = require("hardhat");

async function main() {
    const ReactivePredictionMarket = await hre.ethers.getContractFactory("ReactivePredictionMarket");
    const market = await ReactivePredictionMarket.deploy();
    await market.deployed();
    console.log("Contract deployed to:", market.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
