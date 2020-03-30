# GBC_ADVANCED_SMART_CONTRACTS_Final_Assignment
For the task of ADVANCED SMART CONTRACTS at GBC

by Tomohiro Furuta: 101278396

# Efficient token Air drop using merkle trees

## Features
- Fixed-cost and low-cost deployment of any number of tokens
- All tokens are immediately available to be claimed
- Anyone can pay the gas
- Addresses which cannot spend the tokens do not waste storage or seed transactions
- Tokens can be kept off-chain until needed

## Usage

1. Make your targets list for air drop and save it as txt file

2. Get root hash
```
node merkle-tree.js root [list file name]
```
For example
```
node merkle-tree.js root addresses.txt
```

3. Deploy AirdropToken smart contract with root hash you got

4. Recipient can get information for reciving token
```
node merkle-tree.js proof [list file name] [root hash]
```
For example
```
node merkle-tree.js proof addresses.txt 0xc88cdc775eb0403cec25c7e3526315ef6e7d4dea
```

## Test
```
truffle test
```

## Note
In this sample, the amount of token which recipient receives is fixed with "1 + 10 * index of list". If you want to change it, you change the code of line 104 in merkle-tree.js.
