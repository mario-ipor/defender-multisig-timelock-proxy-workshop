const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const {ethers, upgrades} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const proxyAddress = await func.getValue(keys.AmmProxyAddress);

    const AmmV3 = await ethers.getContractFactory("AmmV3Good");

    /// @dev prepareUpgrade: check if new implementation is compatible with existing proxy and
    /// deploy new implementation WITHOUT automated switching on proxy site

    const implAddress = await upgrades.prepareUpgrade(proxyAddress, AmmV3, {
        deployer: deployer,
        kind: "uups",
    });

    await func.update(keys.AmmImplAddress2, implAddress);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
