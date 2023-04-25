import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { Goerli } from "@usedapp/core";
import "./Defi.css";
import { OnboardingButton } from "../onboarding/Onboarding";
import { AiTwotoneWallet } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";
// @ts-ignore

// const config = {
//   readOnlyChainId: Goerli.chainId,
//   readOnlyUrls: {
//     [Goerli.chainId]:
//       "https://goerli.infura.io/v3/49dc5ad52f5a45c58f1d0dc18f069198",
//   },
// };

type EthereumAddresses = string[];

const Defi = (): JSX.Element => {
  const [metamaskDetected, setMetamaskDetected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  const requestAccount = async () => {
    if (window.ethereum) {
      setMetamaskDetected(true);
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res: EthereumAddresses) => {
          setWalletAddress(res[0]);
        });
      // .then(() => {
      //   window.ethereum.request({
      //     method: "eth_getBalance",
      //     params: [address, "latest"],
      //   });
      // });
    } else {
      console.log("nothing");
    }
  };

  useEffect(() => {
    requestAccount();
  }, []);

  useEffect(() => {
    console.log("doing");
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // console.log(ethers.getDefaultProvider());
    // console.log(ethers.getDefaultProvider(Goerli.chainId));
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      if (walletAddress.length > 0) {
        console.log("getting balance");
        await window.ethereum
          .request({
            method: "eth_getBalance",
            params: [walletAddress, "latest"],
          })
          .then((res: any) => {
            setBalance(res)
            // Return string value to convert it into int balance
            // console.log(ethers.get);
            // Yarn add ethers for using ethers utils or
            // npm install ethers
            // console.log(ethers.utils.formatEther(balance));
            // Format the string into main latest balance
          });
      } else {
        console.log("wallet not populated");
      }
    };
    getBalance();
  }, [walletAddress]);

  return (
    // <DAppProvider config={config}>
    <div className="defi">
      {metamaskDetected ? (
        <div className="defi-container">
          <div className="defi-card">
            <div className="icon-container" style={{ padding: 10 }}>
              <FaAddressCard size={"3rem"} />
            </div>
            <div className="defi-card-header" style={{ padding: 10 }}>
              <h4>Wallet Address</h4>
            </div>
            <div className="defi-card-header" style={{ padding: 10 }}>
              {walletAddress}
            </div>
          </div>
          <div className="defi-card">
            <div className="icon-container" style={{ padding: 10 }}>
              <AiTwotoneWallet size={"3rem"} />
            </div>
            <div className="defi-card-header" style={{ padding: 10 }}>
              <h4>Wallet Balance</h4>
            </div>
            <div className="defi-card-header" style={{ padding: 10 }}>
              {balance}
            </div>
          </div>
        </div>
      ) : (
        <div className="metamask-connect">
          <h4>Metamask must be installed and active to use this Dapp</h4>
          <OnboardingButton />
        </div>
      )}
    </div>
    // </DAppProvider>
  );
};

export default Defi;
