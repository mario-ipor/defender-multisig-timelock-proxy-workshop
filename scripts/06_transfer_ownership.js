const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const hre = require("hardhat");
const ammAbi = require("../abis/ugly/contracts/workshop/AmmV1.sol/AmmV1.json");

const timelockControllerAddress = null; //[!!!] Setup correct TimelockController address taken from OpenZeppelin Defender

async function main() {
    const [deployer] = await ethers.getSigners();

    const ammContractProxyAddress = await func.getValue(keys.AmmProxyAddress);

    const ammContractProxy = new hre.ethers.Contract(ammContractProxyAddress, ammAbi, deployer);

    if (!timelockControllerAddress) {
        throw new Error(
            "Script stopped! Please setup param timelockControllerAddress."
        );
    }

    await ammContractProxy.transferOwnership(timelockControllerAddress);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
