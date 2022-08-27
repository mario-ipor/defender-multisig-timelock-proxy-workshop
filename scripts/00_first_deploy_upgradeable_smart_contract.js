const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const hre = require("hardhat");

// Example how to deploy upgradeable smart contract, UUPS type proxy.
// Proxy address and implementation address are saved in file addesses.json
async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const AmmFactory = await hre.ethers.getContractFactory("AmmV1");

    console.log("Start deploying proxy and implementation...");

    const ammContractProxy = await hre.upgrades.deployProxy(AmmFactory, {
        deployer: deployer,
        initializer: "initialize",
        kind: "uups",
    });

    // waiting when deployed
    await ammContractProxy.deployed();

    //Example how to fetch implementation address:
    const ammContractImplementation = await hre.upgrades.erc1967.getImplementationAddress(ammContractProxy.address);

    await func.update(keys.AmmProxyAddress, ammContractProxy.address);
    await func.update(keys.AmmImplAddress, ammContractImplementation);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
