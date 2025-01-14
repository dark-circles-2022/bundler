import '@nomiclabs/hardhat-ethers'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-deploy'
import * as dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'

import { HardhatUserConfig } from 'hardhat/config'
import { NetworkUserConfig } from 'hardhat/src/types/config'

const mnemonicFileName = process.env.MNEMONIC_FILE
let mnemonic = 'test '.repeat(11) + 'junk'
if (mnemonicFileName != null && fs.existsSync(mnemonicFileName)) {
  mnemonic = fs.readFileSync(mnemonicFileName, 'ascii').trim()
}
console.log('Infura ID :', process.env.INFURA_ID)

const infuraUrl = (name: string): string => `https://${name}.infura.io/v3/${process.env.INFURA_ID}`

function getNetwork(url: string): NetworkUserConfig {
  return {
    url,
    accounts: {
      mnemonic,
    },
  }
}

function getInfuraNetwork(name: string): NetworkUserConfig {
  return getNetwork(infuraUrl(name))
}

const config: HardhatUserConfig = {
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
  },
  networks: {
    localhost: {
      url: 'http://localhost:8545/',
      saveDeployments: false,
    },
    goerli: getInfuraNetwork('goerli'),
    mumbai: getInfuraNetwork('polygon-mumbai'),
  },
  solidity: {
    version: '0.8.15',
    settings: {
      optimizer: { enabled: true },
    },
  },
}

export default config
