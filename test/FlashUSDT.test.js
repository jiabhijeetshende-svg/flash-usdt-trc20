const FlashUSDT = artifacts.require("FlashUSDT");

contract("FlashUSDT", accounts => {
  let flashUSDT;
  const owner = accounts[0];
  const recipient = accounts[1];
  const initialSupply = 1000000;

  beforeEach(async () => {
    flashUSDT = await FlashUSDT.new(initialSupply);
  });

  it("should have correct initial supply", async () => {
    const totalSupply = await flashUSDT.totalSupply();
    assert.equal(totalSupply.toNumber(), initialSupply * Math.pow(10, 6), "Initial supply mismatch");
  });

  it("should transfer tokens correctly", async () => {
    const transferAmount = 100000;
    await flashUSDT.transfer(recipient, transferAmount, { from: owner });
    
    const balance = await flashUSDT.balanceOf(recipient);
    assert.equal(balance.toNumber(), transferAmount, "Transfer failed");
  });

  it("should approve and transfer from", async () => {
    const spender = accounts[2];
    const transferAmount = 50000;
    
    await flashUSDT.approve(spender, transferAmount, { from: owner });
    await flashUSDT.transferFrom(owner, recipient, transferAmount, { from: spender });
    
    const balance = await flashUSDT.balanceOf(recipient);
    assert.equal(balance.toNumber(), transferAmount, "TransferFrom failed");
  });

  it("should check expiration status", async () => {
    const isExpired = await flashUSDT.isExpired(owner);
    assert.equal(isExpired, false, "Token should not be expired immediately");
  });

  it("should get remaining time correctly", async () => {
    const remainingTime = await flashUSDT.getRemainingTime(owner);
    assert.isAbove(remainingTime.toNumber(), 0, "Should have remaining time");
  });

  it("should mint new tokens", async () => {
    const mintAmount = 100000;
    await flashUSDT.mint(recipient, mintAmount, { from: owner });
    
    const balance = await flashUSDT.balanceOf(recipient);
    assert.equal(balance.toNumber(), mintAmount, "Mint failed");
  });

  it("should burn tokens", async () => {
    const burnAmount = 50000;
    const initialBalance = await flashUSDT.balanceOf(owner);
    
    await flashUSDT.burn(burnAmount, { from: owner });
    
    const finalBalance = await flashUSDT.balanceOf(owner);
    assert.equal(
      initialBalance.toNumber() - finalBalance.toNumber(), 
      burnAmount, 
      "Burn failed"
    );
  });
});
