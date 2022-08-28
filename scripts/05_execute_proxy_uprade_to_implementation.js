const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const { ethers} = require("hardhat");
const hre = require("hardhat");
const ammAbi = require("../abis/ugly/contracts/workshop/AmmV1.sol/AmmV1.json");

async function main() {
    const [deployer] = await ethers.getSigners();

    const ammContractProxyAddress = await func.getValue(keys.AmmProxyAddress);
    const newAmmContractImplAddress = await func.getValue(keys.AmmImplAddress2);

    const ammContractProxy = new hre.ethers.Contract(ammContractProxyAddress, ammAbi, deployer);

    await ammContractProxy.upgradeTo(newAmmContractImplAddress);

    await func.update(keys.AmmImplAddress, newAmmContractImplAddress);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
