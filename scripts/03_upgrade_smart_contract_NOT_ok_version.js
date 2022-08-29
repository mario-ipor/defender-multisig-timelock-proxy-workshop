const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const hre = require("hardhat");

/// Example how to automatically upgrade smart contract
async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const proxyAddress = await func.getValue(keys.AmmProxyAddress);

    const AmmV3Bad = await hre.ethers.getContractFactory("AmmV3Bad");

    await upgrades.upgradeProxy(proxyAddress, AmmV3Bad);

    const implAddress = await hre.upgrades.erc1967.getImplementationAddress(proxyAddress);

    await func.update(keys.AmmImplAddress, implAddress);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
