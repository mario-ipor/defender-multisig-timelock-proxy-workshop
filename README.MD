## Exercise 1 - Setup environment

1. In browser register in Alchemy or Infura
2. In Alchemy or Infura create App, use network Goerli public testnet
3. In file `.env` paste url with provider key for param `GOERLI_PROVIDER_URL`. Url with key you can get in already created app in Alchemy or Infura in step 3.
4. In Metamask create some test account and send there some ETH.
5. In Metamask export private key from account created in step 4, and paste this key in `.env` file for param `DEPLOYER_PRIVATE_KEY`
6. Clone project `defender-multisig-timelock-proxy-workshop`
7. Enter to folder `defender-multisig-timelock-proxy-workshop`
8. Execute commands

`npm install`

`npm run compile:hardhat`

`npm run export-abi`

# Exercises

Go to folder `defender-multisig-timelock-proxy-workshop`

## Exercise 1 - Deploy upgradeable smart contract on Goerli public testnet

1. To deploy Proxy and Implementation execute command:

`npx hardhat run --network goerli scripts/00_first_deploy_upgradeable_smart_contract.js`

2. To change Smart Contract state execute command:

`npx hardhat run --network goerli scripts/01_setup_balance.js`

3. To see changes on smart contract execute command:

`npx hardhat run --network goerli scripts/utils/read_smart_contract_data.js`

## Exercise 2 - Upgrade smart contract - new version is OK

1. To upgrade smart contract execute command:

`npx hardhat run --network goerli scripts/02_upgrade_smart_contract_ok_version.js`

2. To see changes on smart contract execute command:

`npx hardhat run --network goerli scripts/utils/read_smart_contract_data.js`

## Exercise 3 - Upgrade smart contract - new version is NOT OK

To upgrade smart contract execute command:

`npx hardhat run --network goerli scripts/03_upgrade_smart_contract_NOT_ok_version.js`

## Exercise 4 - Deploy only implementation

To deploy only smart contract implementation execute command:

`npx hardhat run --network goerli scripts/04_deploy_only_implementation.js`

## Exercise 5 - Execute `upgradeTo` on Proxy

To execute `upgradeTo` on Proxy smart contract execute command:

`npx hardhat run --network goerli scripts/05_execute_proxy_uprade_to_implementation.js`

## Exercise 6 - Transfer ownership to TimelockController defined in OpenZeppelin Defender

1. First edit `06_transfer_ownership.js` script and paste correct address to Timelock Controller from Defender.
2. Execute command:

`npx hardhat run --network goerli scripts/06_transfer_ownership.js`

## Exercise 7 - Deploy only implementation in version 4

Execute command:

`npx hardhat run --network goerli scripts/07_deploy_only_implementation_v4.js`