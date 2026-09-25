const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
require('dotenv').config();

const TRON_API = process.env.TRON_NETWORK === 'mainnet' 
  ? 'https://api.trongrid.io'
  : 'https://api.shasta.trongrid.io';

const web3 = new Web3(new HDWalletProvider(
  process.env.PRIVATE_KEY,
  TRON_API
));

const FlashUSDT = JSON.parse(
  fs.readFileSync('./build/contracts/FlashUSDT.json', 'utf8')
);

const deploymentFile = `./deployments/${process.env.TRON_NETWORK}-deployment.json`;
const deployment = JSON.parse(fs.readFileSync(deploymentFile, 'utf8'));

const contractAddress = deployment.contractAddress;
const contract = new web3.eth.Contract(FlashUSDT.abi, contractAddress);

async function interact() {
  try {
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];

    console.log('\n=== Flash USDT Interaction ==="');
    console.log(`Contract Address: ${contractAddress}`);
    console.log(`Your Address: ${owner}\n`);

    // Get total supply
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(`Total Supply: ${totalSupply / 1e6} FUSDT`);

    // Get your balance
    const balance = await contract.methods.balanceOf(owner).call();
    console.log(`Your Balance: ${balance / 1e6} FUSDT`);

    // Get token info
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const decimals = await contract.methods.decimals().call();

    console.log(`\nToken Name: ${name}`);
    console.log(`Symbol: ${symbol}`);
    console.log(`Decimals: ${decimals}\n`);

  } catch (error) {
    console.error('Interaction failed:', error);
    process.exit(1);
  }
}

interact();
