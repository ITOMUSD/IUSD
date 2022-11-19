require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require('hardhat-abi-exporter');
require("@nomiclabs/hardhat-etherscan");

let dotenv = require('dotenv');
const path = require('path');
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ 'path': path.join(path.resolve(__dirname, '.'), envFile) });

const mnemonic = process.env.MNEMONIC
const infurakey = process.env.INFURA_API_KEY
const scankey = process.env.ETHERSCAN_API_KEY


module.exports = {
    solidity: "0.8.9",
    settings: {
        optimizer: {
            enabled: true,
        },
    },
    networks: {
        hardhat: {
            chainId: 31337,
            accounts: {
                count: 20,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
                accountsBalance: '10000000000000000000000', // (10000 ETH)
            },
        },
        dev: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
            accounts: {
                count: 10,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
            },
        },
        main: {
            url: `https://mainnet.infura.io/v3/${infurakey}`,
            accounts: {
                count: 10,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
            },
            chainId: 1,
        },
        bnb: {
            url: `https://bsc-dataseed1.binance.org`,
            saveDeployments: true,
            accounts: {
                count: 10,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
            },
            chainId: 56,
        },
        testbsc: {
            url: "https://data-seed-prebsc-2-s2.binance.org:8545/",
            saveDeployments: true,
            chainId: 97,
            accounts: {
                mnemonic: mnemonic,
            }
        },
    },
    abiExporter: {
        path: './deployments/abi',
        runOnCompile: true,
        clear: true,
        flat: true,
        spacing: 2,
        pretty: true,
    },
    etherscan: {
        apiKey: scankey
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: false,
        strict: true,
    },
    gasReporter: {
        gasPrice: 1,
        enabled: false
    }
};