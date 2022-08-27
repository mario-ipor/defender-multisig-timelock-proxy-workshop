const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const hre = require("hardhat");

/// Example how to automatically upgrade smart contract
async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const ammContractProxyAddress = await func.getValue(keys.AmmProxyAddress);

    const AmmV3BadFactory = await hre.ethers.getContractFactory("AmmV3Bad");

    await upgrades.upgradeProxy(ammContractProxyAddress, AmmV3BadFactory);

    const ammContractImplementation = await hre.upgrades.erc1967.getImplementationAddress(ammContractProxyAddress);

    await func.update(keys.AmmImplAddress, ammContractImplementation);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
