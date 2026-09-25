# Flash USDT Deployment Guide

## Step-by-Step Deployment Instructions

### Step 1: Clone Repository

```bash
git clone https://github.com/jiabhijeetshende-svg/flash-usdt-trc20.git
cd flash-usdt-trc20
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Get Your Private Key

1. Open your TRON wallet (TronLink, Ledger, etc.)
2. Export your private key (DO NOT SHARE!)
3. Keep it safe and secure

### Step 4: Create Environment File

```bash
cp .env.example .env
```

Edit `.env`:

```env
PRIVATE_KEY=your_private_key_here
TRON_API_KEY=your_trongrid_api_key_here
TRON_NETWORK=shasta
```

### Step 5: Get Testnet TRX (Optional)

For Shasta Testnet:
1. Visit https://www.trongrid.io/shasta
2. Enter your wallet address
3. Request free testnet TRX

### Step 6: Compile Smart Contract

```bash
truffle compile
```

Output should show:
```
✓ Compilation successful
FlashUSDT.sol compiled successfully
```

### Step 7: Deploy to Network

#### Option A: Deploy to Shasta Testnet

```bash
npm run migrate
```

#### Option B: Deploy to Mainnet

```bash
npm run migrate-mainnet
```

#### Option C: Deploy using Node Script

```bash
mkdir -p deployments
npm run deploy
```

### Step 8: Verify Deployment

After successful deployment, you'll see:

```
✓ FlashUSDT deployed successfully!

Contract Address: 0x...
Transaction Hash: 0x...
```

### Step 9: View on Explorer

**Shasta Testnet:**
https://shasta.tronscan.org/#/contract/YOUR_CONTRACT_ADDRESS

**Mainnet:**
https://tronscan.org/#/contract/YOUR_CONTRACT_ADDRESS

## Interacting with Your Contract

### Check Balance

```bash
node scripts/interact.js
```

### Transfer Tokens

Using TronLink or similar:
1. Go to the contract on Tronscan
2. Click "Contract" → "Write Contract"
3. Connect your wallet
4. Call `transfer()` with recipient address and amount
5. Confirm transaction

## Troubleshooting

### Error: "Insufficient balance"
- Make sure you have enough TRX for gas fees
- Testnet: Request free TRX from faucet
- Mainnet: Purchase TRX from exchange

### Error: "Invalid private key"
- Ensure private key is correct and without '0x' prefix
- Check .env file formatting

### Error: "Contract already exists"
- Contract already deployed at that address
- Use deployed contract address in ./deployments folder

### Slow deployment
- Normal on testnet (1-2 minutes)
- Check transaction on explorer

## Contract Functions

### Read Functions (Free)

```
totalSupply() → total tokens issued
balanceOf(address) → token balance
allowance(owner, spender) → approved amount
name() → "Flash USDT"
symbol() → "FUSDT"
decimals() → 6
```

### Write Functions (Requires Gas)

```
transfer(to, amount) → send tokens
approve(spender, amount) → approve spending
transferFrom(from, to, amount) → transfer on behalf
mint(to, amount) → create new tokens (owner)
burn(amount) → destroy tokens
```

## Important Notes

⚠️ **Security:**
- Never commit .env file
- Never share private key
- Test on testnet first
- Verify contract address before interacting

✅ **Gas Optimization:**
- TRON gas: ~30 Gwei
- Typical cost: 0.5-1 TRX per transaction

📝 **Deployment Info:**
- Saved to: `./deployments/{network}-deployment.json`
- Keep this file for future reference

## Next Steps

1. ✅ Deploy contract
2. ✅ Transfer tokens to wallets
3. ✅ List on DEX (Uniswap, SunSwap, etc.)
4. ✅ Create community
5. ✅ Marketing and promotion

## Support

- TRON Docs: https://tron.network/
- TronScan: https://tronscan.org/
- TronGrid: https://www.trongrid.io/
- GitHub Issues: https://github.com/jiabhijeetshende-svg/flash-usdt-trc20/issues
