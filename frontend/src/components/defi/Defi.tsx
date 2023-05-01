import React, { useState, useEffect } from 'react';
// import { ethers } from "ethers";
// import { Goerli } from "@usedapp/core";
import './Defi.css';
// import { OnboardingButton } from '../onboarding/Onboarding';
// import { AiTwotoneWallet } from 'react-icons/ai';
// import { FaBtc, FaEthereum } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import EthLogo from '../../assets/ethLogo.png';
import BtcLogo from '../../assets/bitcoin-btc-logo.png';
// const config = {
//   readOnlyChainId: Goerli.chainId,
//   readOnlyUrls: {
//     [Goerli.chainId]:
//       "https://goerli.infura.io/v3/49dc5ad52f5a45c58f1d0dc18f069198",
//   },
// };

type EthereumAddresses = string[];

const Defi = (): JSX.Element => {
  // const [balance, setBalance] = useState<string>('');
  const [btcBalance, setBtcBalance] = useState<number>(0);
  const [testBtcBalance, setTestBtcBalance] = useState<number>(0);
  const [ethBalance, setEthBalance] = useState<number>(0);
  const [testEthBalance, setTestEthBalance] = useState<number>(0);
  const [btcToDeposit, setBtcToDesposit] = useState<number>(0);
  const [ethToDeposit, setEthToDesposit] = useState<number>(0);
  const navigate = useNavigate();
  // const [walletAddress, setWalletAddress] = useState<string>('');
  // const [metamaskDetected, setMetamaskDetected] = useState<boolean>(false);

  // const requestAccount = async () => {
  //   if (window.ethereum) {
  //     setMetamaskDetected(true);
  //     window.ethereum
  //       .request({ method: 'eth_requestAccounts' })
  //       .then((res: EthereumAddresses) => {
  //         setWalletAddress(res[0]);
  //       });
  //     // .then(() => {
  //     //   window.ethereum.request({
  //     //     method: "eth_getBalance",
  //     //     params: [address, "latest"],
  //     //   });
  //     // });
  //   } else {
  //     console.log('nothing');
  //   }
  // };

  // useEffect(() => {
  //   requestAccount();
  // }, []);

  const getBalances = async () => {
    await fetch('http://localhost:3030/api/users/balance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken') || ''
      }
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        setEthBalance(data.ethBalance);
        setBtcBalance(data.btcBalance);
      });
  };

  // useEffect(() => {
  //   const getBalance = async () => {
  //     if (walletAddress.length > 0) {
  //       console.log('getting balance');
  //       await window.ethereum
  //         .request({
  //           method: 'eth_getBalance',
  //           params: [walletAddress, 'latest']
  //         })
  //         .then((res: any) => {
  //           setBalance(res);
  //           // Return string value to convert it into int balance
  //           // console.log(ethers.get);
  //           // Yarn add ethers for using ethers utils or
  //           // npm install ethers
  //           // console.log(ethers.utils.formatEther(balance));
  //           // Format the string into main latest balance
  //         });
  //     } else {
  //       console.log('wallet not populated');
  //     }
  //   };
  //   getBalance();
  // }, [walletAddress]);

  const updateBalanceHandler = async (coin: string, value: number) => {
    const body = {
      coin: coin,
      action: 'ADD',
      value: value
    };
    await fetch('http://localhost:3030/api/users/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken') || ''
      },
      body: JSON.stringify(body)
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (coin === 'BTC') {
          setBtcBalance(data.btcBalance);
          const remainingBalance = testBtcBalance - btcToDeposit;
          setTestBtcBalance(remainingBalance);
          setBtcToDesposit(0);
        } else if (coin === 'ETH') {
          setEthBalance(data.ethBalance);
          setTestEthBalance(testEthBalance - ethToDeposit);
          setEthToDesposit(0);
        }
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    } else {
      getBalances();
    }
  }, []);

  return (
    // <DAppProvider config={config}>
    <div className="defi">
      {/* {metamaskDetected ? ( */}
      <div className="defi-container">
        <div className="defi-card">
          <div className="icon-container" style={{ padding: 5 }}>
            <img
              src={BtcLogo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                overflow: 'hidden'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="defi-card-header" style={{ padding: 10 }}>
              <div style={{ fontSize: 35 }}>Balance: </div>
            </div>
            <div style={{ color: 'white', fontSize: 35 }}>{btcBalance} BTC</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 10
            }}
          >
            <div className="defi-card-header" style={{ padding: 10 }}>
              <div style={{ fontSize: 35 }}>Test BTC: {testBtcBalance} BTC</div>
            </div>

            <div>
              <button
                onClick={() => {
                  setTestBtcBalance(testBtcBalance + 1);
                }}
                className="btn"
                style={{
                  marginLeft: 10,
                  marginTop: 'auto',
                  marginBottom: 'auto'
                }}
              >
                Generate 1 Test BTC
              </button>
            </div>
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}
          >
            <div style={{ color: 'white', fontSize: 35 }}>
              Amount to Deposit:{' '}
            </div>
            <input
              type="number"
              value={btcToDeposit}
              onChange={(e) =>
                setBtcToDesposit(Number.parseInt(e.target.value))
              }
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 20,
                backgroundColor: 'darkgrey',
                textAlign: 'center',
                fontSize: 20,
                width: 100
              }}
              max={testBtcBalance}
            />
            <button
              onClick={() => {
                updateBalanceHandler('BTC', testBtcBalance);
              }}
              className="btn"
            >
              Deposit
            </button>
          </div>
        </div>
        <div className="defi-card">
          <div className="icon-container">
            <img
              src={EthLogo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                overflow: 'hidden'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="defi-card-header" style={{ padding: 10 }}>
              <div style={{ fontSize: 35 }}>Balance: </div>
            </div>
            <div style={{ color: 'white', fontSize: 35 }}>{ethBalance} ETH</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 10
            }}
          >
            <div className="defi-card-header" style={{ padding: 10 }}>
              <div style={{ fontSize: 35 }}>Test ETH: {testEthBalance} ETH</div>
            </div>

            <div>
              <button
                onClick={() => {
                  setTestEthBalance(testEthBalance + 1);
                }}
                className="btn"
                style={{
                  marginLeft: 10,
                  marginTop: 'auto',
                  marginBottom: 'auto'
                }}
              >
                Generate 1 Test ETH
              </button>
            </div>
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}
          >
            <div style={{ color: 'white', fontSize: 35 }}>
              Amount to Deposit:{' '}
            </div>
            <input
              type="number"
              value={ethToDeposit}
              onChange={(e) =>
                setEthToDesposit(Number.parseInt(e.target.value))
              }
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 20,
                backgroundColor: 'darkgrey',
                textAlign: 'center',
                fontSize: 20,
                width: 100
              }}
              max={testEthBalance}
            />
            <button
              onClick={() => {
                updateBalanceHandler('ETH', testEthBalance);
              }}
              className="btn"
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
      {/* //   ) : (
    //     <div className="metamask-connect">
    //       <h4>Metamask must be installed and active to use this Dapp</h4>
    //       <OnboardingButton />
    //     </div>
    //   )} */}
    </div>
    // </DAppProvider>
  );
};

export default Defi;
