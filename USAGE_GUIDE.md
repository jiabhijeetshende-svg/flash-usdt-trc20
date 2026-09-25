# Complete Deployment & Usage Guide for Flash USDT

## 🚀 QUICK START DEPLOYMENT

### Prerequisites
- Node.js v14+ installed
- A TRON wallet (TronLink, Ledger, or similar)
- Private key from your wallet
- For testnet: Free testnet TRX from faucet
- For mainnet: Real TRX to pay gas fees

---

## 📋 STEP 1: Setup Your Environment

### 1.1 Clone the Repository
```bash
git clone https://github.com/jiabhijeetshende-svg/flash-usdt-trc20.git
cd flash-usdt-trc20
```

### 1.2 Install Dependencies
```bash
npm install
```

### 1.3 Create .env File
```bash
cp .env.example .env
```

Edit `.env`:
```env
PRIVATE_KEY=your_private_key_without_0x
TRON_API_KEY=your_trongrid_api_key
TRON_NETWORK=shasta
```

**How to get Private Key:**
- TronLink Wallet → Settings → Account Details → Export Private Key
- Never share your private key!

### 1.4 Get Free Testnet TRX (For Shasta Testnet)
```
Website: https://www.trongrid.io/shasta
Steps:
1. Go to the link above
2. Enter your TRON wallet address
3. Click "Request" to get free testnet TRX
4. Wait 5-10 seconds
```

---

## 💻 STEP 2: Compile Smart Contract

```bash
truffle compile
```

Expected output:
```
✓ Compiling your contracts...
✓ Compiled successfully using:
   - solc: 0.8.0
```

---

## 🚀 STEP 3: Deploy Contract

### Option A: Deploy to Shasta Testnet (Recommended for Testing)
```bash
npm run migrate
```

### Option B: Deploy to Mainnet (Real Network)
```bash
npm run migrate-mainnet
```

### Option C: Deploy Using Node Script
```bash
mkdir -p deployments
npm run deploy
```

**Expected Output:**
```
=== Flash USDT Deployment ===
Deployer Address: 0x...
Network: shasta
API: https://api.shasta.trongrid.io

Deploying FlashUSDT with initial supply: 1000000...

✓ FlashUSDT deployed successfully!

Contract Address: 0x1234567890abcdef...
Transaction Hash: 0xabcdef1234567890...

Explorer: https://shasta.tronscan.org/#/contract/0x1234567890abcdef...
```

---

## 📊 STEP 4: Verify Deployment

### Check Contract on TronScan
1. Copy your Contract Address from deployment output
2. Go to:
   - **Testnet**: https://shasta.tronscan.org/#/contract/YOUR_CONTRACT_ADDRESS
   - **Mainnet**: https://tronscan.org/#/contract/YOUR_CONTRACT_ADDRESS
3. You should see your contract verified with:
   - Token Name: "Flash USDT"
   - Symbol: "FUSDT"
   - Decimals: 6
   - Total Supply: 1,000,000 FUSDT

### Check Your Balance
```bash
node scripts/interact.js
```

Output:
```
=== Flash USDT Interaction ===
Contract Address: 0x...
Your Address: 0x...

Total Supply: 1000000 FUSDT
Your Balance: 1000000 FUSDT

Token Name: Flash USDT
Symbol: FUSDT
Decimals: 6
```

---

## 🎯 STEP 5: How to Use & Transfer

### Method 1: Using TronLink Wallet (Easiest)

#### Send to Another Wallet:
1. Open **TronLink** browser extension
2. Go to **TronScan**: https://shasta.tronscan.org
3. Search for your contract address
4. Click **Contract** → **Write Contract**
5. Connect your wallet
6. Select **transfer()** function
7. Fill in:
   - `to` = recipient address
   - `amount` = number of tokens × 1,000,000 (e.g., 100 tokens = 100000000)
8. Click **Write** → Confirm transaction
9. Wait for confirmation

#### Example Transaction:
```
Function: transfer
To Address: TXxxx...
Amount: 100000000 (= 100 FUSDT)
Gas: ~0.5 TRX
```

### Method 2: Using Web3.js (Programmatic)

#### Create `transfer.js`:
```javascript
const Web3 = require('web3');
require('dotenv').config();

const TRON_API = 'https://api.shasta.trongrid.io';
const web3 = new Web3(TRON_API);

// Your contract details
const CONTRACT_ADDRESS = '0x1234567890abcdef...'; // Paste your contract address
const ABI = require('./build/contracts/FlashUSDT.json').abi;

// Create contract instance
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

async function transferTokens() {
  try {
    const senderAddress = '0xYourAddress';
    const recipientAddress = '0xRecipientAddress';
    const amount = web3.utils.toWei('100', 'mwei'); // 100 FUSDT

    console.log(`Transferring 100 FUSDT to ${recipientAddress}...`);

    const tx = await contract.methods.transfer(
      recipientAddress,
      amount
    ).send({
      from: senderAddress,
      gas: 100000,
      gasPrice: '30000000'
    });

    console.log('✓ Transfer successful!');
    console.log('Transaction Hash:', tx.transactionHash);
    console.log('Explorer: https://shasta.tronscan.org/#/transaction/' + tx.transactionHash);

  } catch (error) {
    console.error('Transfer failed:', error.message);
  }
}

transferTokens();
```

Run:
```bash
node transfer.js
```

### Method 3: Using Truffle Console

```bash
truffle console --network shasta
```

In console:
```javascript
const FlashUSDT = await artifacts.require('FlashUSDT').deployed();

// Check balance
const balance = await FlashUSDT.balanceOf('0xYourAddress');
console.log(balance.toString());

// Transfer tokens
const tx = await FlashUSDT.transfer('0xRecipientAddress', '100000000');
console.log(tx);
```

---

## 🎪 STEP 6: Where to Use Flash USDT

### 1. **List on DEX** (Decentralized Exchange)
   - **SunSwap**: https://sunswap.com
   - **Uniswap V3** (TRON): https://uniswap.org
   - **JustSwap**: https://justswap.io
   
   Steps:
   1. Go to DEX website
   2. Click "Add Liquidity"
   3. Select your token (contract address)
   4. Pair with USDT or TRX
   5. Provide liquidity
   6. Users can now trade your token

### 2. **Send to Community**
   - Airdrop to wallet addresses
   - Distribute to team members
   - Send to partner projects

### 3. **Create Token Holder Dashboard**
   Use block explorers:
   - **Shasta**: https://shasta.tronscan.org
   - **Mainnet**: https://tronscan.org
   
   Features:
   - View all holders
   - Track transfers
   - Monitor transactions

### 4. **Integrate into Your App**
   
   Example Next.js/React integration:
   ```javascript
   import { useEffect, useState } from 'react';
   import Web3 from 'web3';

   export default function TokenApp() {
     const [balance, setBalance] = useState('0');
     const CONTRACT_ADDRESS = '0x...';

     useEffect(() => {
       const web3 = new Web3(window.ethereum);
       const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
       
       contract.methods.balanceOf(userAddress).call()
         .then(result => setBalance(result / 1e6));
     }, []);

     return <div>Your Balance: {balance} FUSDT</div>;
   }
   ```

### 5. **List on Centralized Exchanges (CEx)**
   - Contact exchanges: Binance, OKX, Huobi, Bybit
   - Provide:
     - Contract address
     - Tokenomics
     - Whitepaper
     - Business plan

---

## 📝 COMMON TRANSACTIONS

### Approve Tokens for Spending
```javascript
const tx = await contract.methods.approve(
  '0xSpenderAddress',
  web3.utils.toWei('1000', 'mwei')
).send({ from: ownerAddress });
```

### Transfer on Behalf (transferFrom)
```javascript
const tx = await contract.methods.transferFrom(
  '0xFromAddress',
  '0xToAddress',
  web3.utils.toWei('100', 'mwei')
).send({ from: approvedSpenderAddress });
```

### Mint New Tokens (Owner Only)
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

---

## 🔍 VERIFICATION CHECKLIST

Before going live, verify:

- ✅ Contract deployed successfully
- ✅ Visible on TronScan
- ✅ Correct token name and symbol
- ✅ Total supply matches
- ✅ Can transfer tokens
- ✅ Can approve spending
- ✅ Owner functions work (mint/burn)

---

## ⚠️ IMPORTANT SECURITY NOTES

### DO's:
✅ Test on testnet first
✅ Use hardware wallet for mainnet
✅ Verify contract address before sending funds
✅ Keep private key secure
✅ Audit contract before mainnet launch

### DON'Ts:
❌ Never share private key
❌ Don't commit .env to GitHub
❌ Don't deploy to mainnet first
❌ Don't trust unverified addresses
❌ Don't leave wallet exposed

---

## 🛠️ TROUBLESHOOTING

### Error: "Insufficient balance"
**Solution:** 
- Make sure you have enough TRX for gas
- Testnet: Request free TRX from faucet
- Mainnet: Buy TRX from exchange

### Error: "Invalid private key"
**Solution:**
- Remove '0x' prefix if present
- Check .env file format
- Ensure key is 64 characters (without 0x)

### Error: "Contract already exists"
**Solution:**
- Your contract is already deployed
- Use the address in deployments folder
- No need to deploy again

### Transaction pending for long time
**Solution:**
- Normal on testnet (1-2 minutes)
- Check explorer: https://shasta.tronscan.org
- May need to increase gas price

---

## 📊 GAS COSTS (Approximate)

| Action | TRON Cost | USD (at 1 TRX = $0.10) |
|--------|-----------|------------------------|
| Deploy | 1-2 TRX | $0.10-0.20 |
| Transfer | 0.5 TRX | $0.05 |
| Approve | 0.5 TRX | $0.05 |
| Mint | 1 TRX | $0.10 |
| Burn | 0.5 TRX | $0.05 |

---

## 🎯 NEXT STEPS

1. ✅ Deploy to testnet
2. ✅ Test all functions
3. ✅ Send to a few wallets
4. ✅ Verify on TronScan
5. ✅ Deploy to mainnet
6. ✅ List on DEX
7. ✅ Launch marketing campaign
8. ✅ Build community

---

## 📞 RESOURCES

- **TRON Docs**: https://tron.network/en
- **TronScan Explorer**: https://tronscan.org/
- **TronGrid API**: https://www.trongrid.io/
- **TronLink Wallet**: https://www.tronlink.org/
- **Web3.js Docs**: https://web3js.readthedocs.io/

---

## 💡 EXAMPLE: Complete Workflow

```bash
# 1. Setup
git clone https://github.com/jiabhijeetshende-svg/flash-usdt-trc20.git
cd flash-usdt-trc20
npm install
cp .env.example .env
# Edit .env with your details

# 2. Compile
truffle compile

# 3. Deploy to testnet
npm run migrate

# 4. Check deployment
node scripts/interact.js

# 5. Transfer tokens (using TronLink on TronScan)
# - Go to https://shasta.tronscan.org
# - Search contract address
# - Click "Write Contract"
# - Call transfer()
# - Confirm in wallet

# 6. View transaction
# - Check explorer with transaction hash

# 7. Go mainnet (when ready)
npm run migrate-mainnet
```

---

**Your Flash USDT is now live! 🎉**
