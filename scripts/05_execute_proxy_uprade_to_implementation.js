const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const {ethers} = require("hardhat");
const hre = require("hardhat");
const abi = require("../abis/ugly/contracts/workshop/AmmV1.sol/AmmV1.json");

async function main() {
    const [deployer] = await ethers.getSigners();

    const proxyAddress = await func.getValue(keys.AmmProxyAddress);
    const newImplAddress = await func.getValue(keys.AmmImplAddress2);

    const ammContract = new hre.ethers.Contract(proxyAddress, abi, deployer);

    await ammContract.upgradeTo(newImplAddress);

    await func.update(keys.AmmImplAddress, newImplAddress);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
