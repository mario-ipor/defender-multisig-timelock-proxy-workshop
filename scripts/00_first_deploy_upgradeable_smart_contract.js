const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const hre = require("hardhat");

// Example how to deploy upgradeable smart contract, UUPS type proxy.
// Proxy address and implementation address are saved in file addesses.json
async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const AmmV1 = await hre.ethers.getContractFactory("AmmV1");

    console.log("Start deploying proxy and implementation...");

    const ammContract = await hre.upgrades.deployProxy(AmmV1, {
        deployer: deployer,
        initializer: "initialize",
        kind: "uups",
    });

    // waiting when deployed
    await ammContract.deployed();

    //Example how to fetch implementation address:
    const implAddress = await hre.upgrades.erc1967.getImplementationAddress(ammContract.address);

    await func.update(keys.AmmProxyAddress, ammContract.address);
    await func.update(keys.AmmImplAddress, implAddress);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
