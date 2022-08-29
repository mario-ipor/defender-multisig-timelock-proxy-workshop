const keys = require("./utils/json_keys.js");
const func = require("./utils/json_func.js");

const {ethers, upgrades} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const proxyAddress = await func.getValue(keys.AmmProxyAddress);
    
    const AmmV4 = await ethers.getContractFactory("AmmV4Good");

    const newImplAddress = await upgrades.prepareUpgrade(proxyAddress, AmmV4, {
        deployer: deployer,
        kind: "uups",
    });

    await func.update(keys.AmmImplAddressForDefender, newImplAddress);

    console.log("DONE!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
