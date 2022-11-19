const { ethers, upgrades, network } = require("hardhat");
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');

async function main() {
    const contract = await ethers.getContractFactory("IUSD");
    const proxy = await upgrades.deployProxy(contract);
    await proxy.deployed();

    console.log("IUSD proxy deployed to:", proxy.address);

    const logicAddr = await getImplementationAddress(ethers.provider, proxy.address);
    console.log(`Please verify: npx hardhat verify ${logicAddr}`);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });