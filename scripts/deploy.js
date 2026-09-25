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

async function deploy() {
  try {
    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];

    console.log('\n=== Flash USDT Deployment ==="');
    console.log(`Deployer Address: ${deployer}`);
    console.log(`Network: ${process.env.TRON_NETWORK}`);
    console.log(`API: ${TRON_API}\n`);

    const contract = new web3.eth.Contract(FlashUSDT.abi);
    const initialSupply = 1000000;

    console.log(`Deploying FlashUSDT with initial supply: ${initialSupply}...\n`);

    const deployTx = contract.deploy({
      data: FlashUSDT.bytecode,
      arguments: [initialSupply]
    });

    const deployedContract = await deployTx.send({
      from: deployer,
      gas: 3000000,
      gasPrice: '30000000'
    });

    console.log('✓ FlashUSDT deployed successfully!');
    console.log(`\nContract Address: ${deployedContract.options.address}`);
    console.log(`Transaction Hash: ${deployedContract.transactionHash}\n`);

    // Save deployment info
    const deploymentInfo = {
      network: process.env.TRON_NETWORK,
      contractAddress: deployedContract.options.address,
      deployerAddress: deployer,
      transactionHash: deployedContract.transactionHash,
      timestamp: new Date().toISOString(),
      initialSupply: initialSupply,
      decimals: 6
    };

    fs.writeFileSync(
      `./deployments/${process.env.TRON_NETWORK}-deployment.json`,
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log('Deployment info saved to deployments folder');
    console.log(`\nExplorer: https://${process.env.TRON_NETWORK === 'mainnet' ? 'tronscan.org' : 'shasta.tronscan.org'}/#/contract/${deployedContract.options.address}\n`);

    process.exit(0);
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy();
