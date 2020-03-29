const AirdropToken = artifacts.require("AirdropToken");

const name = 'Airdrop';
const symble = 'ADP';
const decimals = 18;
const rootHash = '0x198bfe76174005e67625cf28cee42fc0fb4fab8b75e78f61336b228325662c05';
const premine = 100;

module.exports = function(deployer) {
  deployer.deploy(
    AirdropToken,
    name,
    symble,
    decimals,
    rootHash,
    web3.utils.toBN(premine * 10 ** decimals)
  );
};




