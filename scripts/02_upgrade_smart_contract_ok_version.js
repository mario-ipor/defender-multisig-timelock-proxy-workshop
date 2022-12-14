const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const hre = require("hardhat");

/// Example how to automatically upgrade smart contract
async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const proxyAddress = await func.getValue(keys.AmmProxyAddress);

    const AmmV2 = await hre.ethers.getContractFactory("AmmV2Good");

    /// !!! Here is executed upgrade automatically.
    /// Implementation is verified, deployed and switched in proxy.
    await upgrades.upgradeProxy(proxyAddress, AmmV2);

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
