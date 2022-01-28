pragma solidity >=0.5.16 < 0.9.0;
pragma experimental ABIEncoderV2;

interface ERC20 {
    function balanceOf(address account) external view returns (uint256);
}


contract Balances {
    struct Amount {
        address token;
        uint256 balance;
    }

    function getBalances(
        address walletAddress, 
        address[] memory tokenAddresses
    ) 
        public view returns (Amount[] memory) 
    {
        Amount[] memory tokenAmounts;
        for (uint64 i = 0; i < tokenAddresses.length; i++) {
            address token = tokenAddresses[i];
            uint256 balance = ERC20(token).balanceOf(walletAddress);
            Amount memory tokenAmount = Amount(token, balance);
            tokenAmounts[i] = tokenAmount; 
        }
        return tokenAmounts;
    }
}
