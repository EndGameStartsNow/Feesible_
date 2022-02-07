import Moralis from "moralis";
import { useState } from "react";

export const useMoralis = () => {    
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const appId = process.env.REACT_APP_APP_ID;
    // start moralis server
    Moralis.start({ serverUrl, appId});
    const [isEndGameNftPresent, setIsEndGameNftPresent] = useState<null| boolean>(null);

    const userHasEthbuildNft = async (chain: string, address: string) => {
        const options: any = { chain, address };
        const userNFTs = await Moralis.Web3API.account.getNFTs(options);
        const amountEthbuildGameNft = userNFTs.result?.filter(data => data.name === "ETHBUILD_ENDGAME").length
        const checker = Boolean(userNFTs.total) && Boolean(amountEthbuildGameNft);
        setIsEndGameNftPresent(checker);
    }

  return {
     userHasEthbuildNft,
     isEndGameNftPresent
  };
};
