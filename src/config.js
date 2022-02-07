export const Framework = require("@superfluid-finance/sdk-core");
export const ethers = require("ethers");

// Ethers.js provider initialization
export const kovanUrl =
    "https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX";
export const maticUrl = "https://rpc-mumbai.maticvigil.com/";
export const rinkbyUrl = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
export const customHttpProvider = new ethers.providers.JsonRpcProvider(rinkbyUrl);

export const myPvKey = "<insert private key here>";
const xDaiKovan = "0xe3cb950cb164a31c66e32c320a800d477019dcff";
const xDaiPoly = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f";
const xDaiRinkb = "0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90"
export const DAIx = xDaiRinkb;
export const chainId = 4; //42; //80001; 