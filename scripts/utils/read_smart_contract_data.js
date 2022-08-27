const keys = require("./json_keys.js");
const func = require("./json_func.js");

const hre = require("hardhat");
const ammAbi = require("../../abis/ugly/contracts/workshop/AmmV1.sol/AmmV1.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const ammContractProxyAddress = await func.getValue(keys.AmmProxyAddress);
    const ammContractProxy = new hre.ethers.Contract(ammContractProxyAddress, ammAbi, deployer);

    const ammContractImplementationAddress = await hre.upgrades.erc1967.getImplementationAddress(ammContractProxyAddress);

    const ammContractImpl = new hre.ethers.Contract(ammContractImplementationAddress, ammAbi, deployer);

    const versionImpl = await ammContractImpl.getVersion();
    const balanceImpl = await ammContractImpl.getBalance();
    const ownerImpl = await ammContractImpl.owner();

    const version = await ammContractProxy.getVersion();
    const balance = await ammContractProxy.getBalance();
    const ownerProxy = await ammContractProxy.owner();

    console.log("Implementation Address: ", ammContractImplementationAddress);

    console.log("[PROXY] AMM Version (logic): ", version.toString());
    console.log("[PROXY] AMM Balance (storage): ", balance.toString());
    console.log("[PROXY] Owner: ", ownerProxy.toString());

    console.log("[IMPL] AMM Version (logic): ", versionImpl.toString());
    console.log("[IMPL] AMM Balance (storage): ", balanceImpl.toString());
    console.log("[IMPL] Owner: ", ownerImpl.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
