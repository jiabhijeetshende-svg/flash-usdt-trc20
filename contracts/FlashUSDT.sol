pragma solidity ^0.8.0;

interface ITRC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract FlashUSDT is ITRC20 {
    string public name = "Flash USDT";
    string public symbol = "FUSDT";
    uint8 public decimals = 6;
    uint256 public totalSupply_;
    
    // 40 days expiration in seconds
    uint256 public constant EXPIRATION_TIME = 40 days;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => uint256) public tokenCreationTime;
    
    address public owner;
    
    event TokenCreated(address indexed to, uint256 amount, uint256 expirationTime);
    event TokenExpired(address indexed holder, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 initialSupply) {
        owner = msg.sender;
        totalSupply_ = initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply_;
        tokenCreationTime[msg.sender] = block.timestamp;
        emit Transfer(address(0), msg.sender, totalSupply_);
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier checkExpiration(address account) {
        if (balanceOf[account] > 0) {
            uint256 createdAt = tokenCreationTime[account];
            if (createdAt == 0) {
                createdAt = block.timestamp;
            }
            
            if (block.timestamp >= createdAt + EXPIRATION_TIME) {
                // Token has expired - remove balance
                uint256 expiredAmount = balanceOf[account];
                balanceOf[account] = 0;
                totalSupply_ -= expiredAmount;
                emit TokenExpired(account, expiredAmount);
                emit Transfer(account, address(0), expiredAmount);
            }
        }
        _;
    }
    
    function totalSupply() public view override returns (uint256) {
        return totalSupply_;
    }
    
    function transfer(address to, uint256 amount) public override checkExpiration(msg.sender) returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        
        // Set creation time for recipient if they don't have tokens yet
        if (tokenCreationTime[to] == 0) {
            tokenCreationTime[to] = block.timestamp;
            emit TokenCreated(to, amount, block.timestamp + EXPIRATION_TIME);
        }
        
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) public override checkExpiration(msg.sender) returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) public override checkExpiration(from) returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        
        // Set creation time for recipient if they don't have tokens yet
        if (tokenCreationTime[to] == 0) {
            tokenCreationTime[to] = block.timestamp;
            emit TokenCreated(to, amount, block.timestamp + EXPIRATION_TIME);
        }
        
        emit Transfer(from, to, amount);
        return true;
    }
    
    // Function to mint new tokens (only owner)
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        
        balanceOf[to] += amount;
        totalSupply_ += amount;
        
        if (tokenCreationTime[to] == 0) {
            tokenCreationTime[to] = block.timestamp;
            emit TokenCreated(to, amount, block.timestamp + EXPIRATION_TIME);
        }
        
        emit Transfer(address(0), to, amount);
    }
    
    // Function to burn tokens
    function burn(uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        
        balanceOf[msg.sender] -= amount;
        totalSupply_ -= amount;
        
        emit Transfer(msg.sender, address(0), amount);
    }
    
    // Check if tokens are expired for an account
    function isExpired(address account) public view returns (bool) {
        if (balanceOf[account] == 0) return false;
        
        uint256 createdAt = tokenCreationTime[account];
        if (createdAt == 0) return false;
        
        return block.timestamp >= createdAt + EXPIRATION_TIME;
    }
    
    // Get remaining time before expiration (in seconds)
    function getRemainingTime(address account) public view returns (uint256) {
        if (balanceOf[account] == 0) return 0;
        
        uint256 createdAt = tokenCreationTime[account];
        if (createdAt == 0) return EXPIRATION_TIME;
        
        uint256 expirationTime = createdAt + EXPIRATION_TIME;
        
        if (block.timestamp >= expirationTime) {
            return 0;
        }
        
        return expirationTime - block.timestamp;
    }
}
