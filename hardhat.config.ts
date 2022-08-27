import * as dotenv from "dotenv";
import "hardhat-abi-exporter";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@typechain/hardhat";

dotenv.config();

const goerliProviderUrl = process.env.GOERLI_PROVIDER_URL as string;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
    solidity: {
        version: "0.8.16",
        settings: {
            optimizer: {
                enabled: false,
                runs: 200,
            },
        },
    },
    networks: {
        goerli: {
            url: goerliProviderUrl,
            accounts: [deployerPrivateKey],
            gas: 10000000,
            gasPrice: 8000000000,
        },
    },
    paths: {
        tests: "./test",
    },
    abiExporter: [
        {
            path: "./abis/pretty",
            pretty: true,
        },
        {
            path: "./abis/ugly",
            pretty: false,
        },
    ],
    typechain: {
        outDir: "types",
        target: "ethers-v5",
        alwaysGenerateOverloads: true,
        externalArtifacts: ["externalArtifacts/*.json"],
    },
};
