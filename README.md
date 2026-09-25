# Flash USDT - TRC20 Token

A fully functional TRC20 token deployed on the TRON blockchain.

## Features

✅ Full TRC20 compliance
✅ Transfer tokens to any wallet
✅ Approve and transferFrom functionality
✅ Mint new tokens (owner only)
✅ Burn tokens
✅ Get token information

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- TRON wallet with testnet or mainnet TRX for gas fees
- Private key from your TRON wallet

## Installation

```bash
git clone https://github.com/jiabhijeetshende-svg/flash-usdt-trc20.git
cd flash-usdt-trc20
npm install
```

## Setup

### 1. Create .env file

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```
PRIVATE_KEY=your_private_key_without_0x
TRON_API_KEY=your_trongrid_api_key
TRON_NETWORK=shasta  # or mainnet
```

**IMPORTANT:** Never commit your `.env` file or share your private key!

### 2. Get Testnet TRX (for Shasta Testnet)

Visit: https://www.trongrid.io/shasta

## Deployment

### Option 1: Using Truffle (Recommended)

```bash
# Build the contract
truffle compile

# Deploy to Shasta Testnet
npm run migrate

# Deploy to Mainnet
npm run migrate-mainnet
```

### Option 2: Using Node Script

```bash
# Create deployments directory
mkdir -p deployments

# Deploy
npm run deploy
```

After deployment, your contract address will be saved to `deployments/{network}-deployment.json`

## Usage

### Get Contract Info

```bash
node scripts/interact.js
```

### Transfer Tokens

```javascript
const contract = new web3.eth.Contract(abi, contractAddress);

const tx = await contract.methods.transfer(
  '0xRecipientAddress',
  web3.utils.toWei('100', 'mwei')  // 100 FUSDT
).send({ from: senderAddress });

console.log('Transaction:', tx.transactionHash);
```

### Approve Spending

```javascript
const tx = await contract.methods.approve(
  '0xSpenderAddress',
  web3.utils.toWei('1000', 'mwei')
).send({ from: ownerAddress });
```

### Transfer From

```javascript
const tx = await contract.methods.transferFrom(
  '0xFromAddress',
  '0xToAddress',
  web3.utils.toWei('100', 'mwei')
).send({ from: spenderAddress });
```

### Mint Tokens (Owner Only)

```javascript
const tx = await contract.methods.mint(
  '0xRecipientAddress',
  web3.utils.toWei('1000', 'mwei')
).send({ from: ownerAddress });
```

### Burn Tokens

```javascript
const tx = await contract.methods.burn(
  web3.utils.toWei('100', 'mwei')
).send({ from: holderAddress });
```

## Contract Details

- **Name:** Flash USDT
- **Symbol:** FUSDT
- **Decimals:** 6
- **Initial Supply:** 1,000,000 tokens
- **Network:** TRON (Shasta Testnet / Mainnet)

## Testing

```bash
truffle test
```

## Explorer

- **Shasta Testnet:** https://shasta.tronscan.org/
- **Mainnet:** https://tronscan.org/

## Gas Fees

TRON network gas price: 30 Gwei (approximately)

## Security

⚠️ **WARNING:**
- Never share your private key
- Always verify contract addresses before interacting
- Test on testnet before mainnet deployment
- Use a hardware wallet for mainnet operations

## License

MIT

## Support

For issues or questions, open an issue on GitHub.
