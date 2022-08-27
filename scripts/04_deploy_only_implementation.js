const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const ammContractProxyAddress = await func.getValue(keys.AmmProxyAddress);

    const AmmV3GoodFactory = await ethers.getContractFactory("AmmV3Good");

    /// @dev prepareUpgrade check if new implementation is compatible with existing proxy
    /// prepareUpgrade deploy new implementation without automated switching on proxy site
    const newImplementationAddress = await upgrades.prepareUpgrade(ammContractProxyAddress, AmmV3GoodFactory, {
        deployer: deployer,
        kind: "uups",
    });

    await func.update(keys.AmmImplAddress2, newImplementationAddress);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
