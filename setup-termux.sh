#!/bin/bash

# Flash USDT - Complete Setup Script for Termux
# Run this script to set up everything

set -e

echo "=========================================="
echo "Flash USDT - Termux Complete Setup"
echo "=========================================="
echo ""

# Step 1: Update and install dependencies
echo "Step 1: Installing dependencies..."
apt-get update
apt-get install -y git curl python3 build-essential pkg-config

# Step 2: Install Node.js if not present
echo "Step 2: Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
    apt-get install -y nodejs
else
    echo "Node.js already installed: $(node --version)"
fi

# Step 3: Create project directory
echo "Step 3: Setting up project directory..."
PROJECT_DIR="$HOME/flash-usdt-trc20"
if [ ! -d "$PROJECT_DIR" ]; then
    mkdir -p "$PROJECT_DIR"
    cd "$PROJECT_DIR"
else
    cd "$PROJECT_DIR"
fi

# Step 4: Clone or copy files
echo "Step 4: Setting up project files..."

# Create directory structure
mkdir -p contracts migrations scripts test build deployments

# Step 5: Initialize npm project
if [ ! -f "package.json" ]; then
    npm init -y
fi

# Step 6: Install dependencies
echo "Step 5: Installing npm dependencies..."
npm install truffle @truffle/hdwallet-provider dotenv web3

echo ""
echo "=========================================="
echo "✓ Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. cd $PROJECT_DIR"
echo "2. Create .env file with your private key"
echo "3. Run: npm run setup-files"
echo ""
