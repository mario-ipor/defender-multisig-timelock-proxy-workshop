const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const hre = require("hardhat");
const abi = require("../abis/ugly/contracts/workshop/AmmV1.sol/AmmV1.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const proxyAddress = await func.getValue(keys.AmmProxyAddress);
    const ammContract = new hre.ethers.Contract(proxyAddress, abi, deployer);

    await ammContract.setBalance(hre.ethers.BigNumber.from("555"));

    console.log("New balance = 555");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
