/* eslint-disable no-undef */
/*
 * OpenZeppelin Test Helpers
 * https://github.com/OpenZeppelin/openzeppelin-test-helpers
 */
const {
  BN,
  constants,
  balance,
  expectEvent,
  expectRevert
} = require("@openzeppelin/test-helpers");
const ethers = require('ethers');
const BigNumber = require('bignumber.js');

/*
*  =============================================================
*  Tests of public & external functions in AirdropToken contract
*  =============================================================
*/
const AirdropToken = artifacts.require("AirdropToken");

contract("AirdropTokenTest", function(_accounts) {
  // Initial settings
  const name = 'Airdrop';
  const symble = 'ADP';
  const decimal = 10 ** 18;
  const rootHash = '0x198bfe76174005e67625cf28cee42fc0fb4fab8b75e78f61336b228325662c05';
  const owner = _accounts[0];
  const premine = 100;
  const testAddress = '0xC88cdC775eB0403cEc25C7e3526315Ef6e7d4DEa';
  const testPath = 684;
  const testWitnesses = [
    "0xcad9af744e0521516165563a008632e5fab38579e3281d5f6b1ac9e61f75c41c",
    "0x89a45e88294387b1a3d0459c44c053f3972f9ecac2f9ae3390768cc29b281999",
    "0xf2640f5b091562c97af29e4b9c314608a1856f4a55a942f6f31a31a78b1b6432",
    "0x8372d13daf8920c402ef6ce42d5e5c736193946c470f90e2ea617edbbd95f4f0",
    "0x48571bbfa90999939e3a86ce0800d4629f3750cb8800a172e0e2b67fdd90184c",
    "0x0c4c4c2502f37e2f547f05f0df643f006ff316aed1f233f8104063386af16170",
    "0xb628a52be024ed965ba47ef4f00baa0a8ca0ff5a947945751ad7eb537db09295",
    "0x7e8469aae76a59105a653b1cdc92a7a9e7a501a8f46a59c0020d4bcb763a5398",
    "0xbaf15b5bda706cc2e9406d9caf44d8d56b633967d2f88e1d2a8c84cb24dfb2bc",
    "0x2d488fb10671190021b527584ee580355c6bc95bfb1c83a7bcedadac07d442db"
  ];

  //================
  // Default values
  //================
  describe("Check default values", () => {
    let airdropToken;

    before(async () => {
      airdropToken = await AirdropToken.deployed();
    });

    it("should have 100 as total suply", async () => {
      const retval = await airdropToken.totalSupply();
      assert.equal(retval, premine * decimal, "Total suply is wrong");
    });
  });

  describe("Check redeem scenario", () => {
    before(async () => {
      airdropToken = await AirdropToken.deployed();
    });

    it("should return false as redeemed status before redeemimg", async () => {
      const retval = await airdropToken.redeemed(testPath);
      assert.isFalse(retval, "Redeemed status is wrong");
    });

    it("should not allow redeem by invalid address ", async () => {
      const fakePath = testPath + 1;
      const amount = balanceOfIndex(fakePath);
      const receipt = airdropToken.redeemPackage(fakePath, testAddress, amount, testWitnesses);
      await expectRevert(
        receipt,
        "Invalid recipient"
      );
    });

    it("should be redeemed", async () => {
      const amount = balanceOfIndex(testPath);
      const receipt = airdropToken.redeemPackage(testPath, testAddress, amount, testWitnesses);
      expectEvent(await receipt, 'Transfer', {
        from: '0x0000000000000000000000000000000000000000',
        to: testAddress,
        tokens: new BigNumber(amount).toFixed()
      });
      // check balance
      const retval = parseInt(await airdropToken.balanceOf(testAddress));
      assert.equal(retval, amount, "Acquired balance is wrong");
    });
    
    it("should return true as redeemed status after redeemimg", async () => {
      const retval = await airdropToken.redeemed(testPath);
      assert.isTrue(retval, "Redeemed status is wrong");
    });

    it("should be already redeemed", async () => {
      const amount = balanceOfIndex(testPath);
      const receipt = airdropToken.redeemPackage(testPath, testAddress, amount, testWitnesses);
      await expectRevert(
        receipt,
        "Already redeemed"
      );
    });
  });

  function balanceOfIndex(index) {
    return ethers.utils.parseUnits(String(1 + 10 * index), 18);
  }
});
