const keys = require("./json_keys.js");
const func = require("./json_func.js");

const hre = require("hardhat");
const ammAbi = require("../../abis/ugly/contracts/workshop/AmmV1.sol/AmmV1.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const ammContractProxyAddress = await func.getValue(keys.AmmProxyAddress);
    const ammContractProxy = new hre.ethers.Contract(ammContractProxyAddress, ammAbi, deployer);

    const ammContractImplAddress = await hre.upgrades.erc1967.getImplementationAddress(ammContractProxyAddress);

    const ammContractImpl = new hre.ethers.Contract(ammContractImplAddress, ammAbi, deployer);

    const versionImpl = await ammContractImpl.getVersion();
    const balanceImpl = await ammContractImpl.getBalance();
    const ownerImpl = await ammContractImpl.owner();

    const version = await ammContractProxy.getVersion();
    const balance = await ammContractProxy.getBalance();
    const ownerProxy = await ammContractProxy.owner();

    console.log("-------------------------------------------------------------------------------------");
    console.log("[PROXY] Version (logic)    : ", version.toString());
    console.log("[PROXY] Balance (storage)  : ", balance.toString());
    console.log("[PROXY] Owner              : ", ownerProxy.toString());
    console.log("-------------------------------------------------------------------------------------");
    console.log("[IMPL]  Address            : ", ammContractImplAddress);
    console.log("[IMPL]  Version (logic)    : ", versionImpl.toString());
    console.log("[IMPL]  Balance (storage)  : ", balanceImpl.toString());
    console.log("[IMPL]  Owner              : ", ownerImpl.toString());
    console.log("-------------------------------------------------------------------------------------");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
