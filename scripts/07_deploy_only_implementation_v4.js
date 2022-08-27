const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const {ethers, upgrades} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const ammContractProxyAddress = await func.getValue(keys.AmmProxyAddress);
    const AmmV4GoodFactory = await ethers.getContractFactory("AmmV4Good");

    const newImplementationAddress = await upgrades.prepareUpgrade(ammContractProxyAddress, AmmV4GoodFactory, {
        deployer: deployer,
        kind: "uups",
    });

    await func.update(keys.AmmImplAddressForDefender, newImplementationAddress);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
