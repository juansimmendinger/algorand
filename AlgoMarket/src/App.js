import React, {useState, useEffect} from "react";
import {CoverPera, CoverAlgoSigner} from "./components/Cover"
import './App.css';
import Wallet from "./components/Wallet";
import {Container, Nav} from "react-bootstrap";
// import Products from "./components/marketplace/Products";
// import {Notification} from "./components/utils/Notifications";
import {indexerClient, myAlgoConnect} from "./utils/constants"
import ImgPera from "./assets/img/perawallet.png"
import ImgAlgoSigner from "./assets/img/algosigner.png"
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();

const App = function AppWrapper() {
	// Pera Wallet
	const [accountAddress, setAccountAddress] = useState(null);
  	const isConnectedToPeraWallet = !!accountAddress;
	//My Algosigner
	const [address, setAddress] = useState(null);
    const [name, setName] = useState(null);
    const [balance, setBalance] = useState(0);

	useEffect(() => {
		// Reconnect to the session when the component is mounted
		peraWallet
		  .reconnectSession()
		  .then((accounts) => {
			peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
	
			if (accounts.length) {
			  setAccountAddress(accounts[0]);
			}
		  })
		  .catch((e) => console.log(e));
	  }, []);
	

	const fetchBalance = async (accountAddress) => {
        indexerClient.lookupAccountByID(accountAddress).do()
            .then(response => {
                const _balance = response.account.amount;
                setBalance(_balance);
            })
            .catch(error => {
                console.log(error);
            })
    }

	const connectWallet = async () => {
        myAlgoConnect.connect()
            .then(accounts => {
                const _account = accounts[0];
                setAddress(_account.address);
                setName(_account.name);
                fetchBalance(_account.address);
            }).catch(error => {
            console.log('Could not connect to MyAlgo wallet');
            console.error(error);
        })
    }

	const disconnect = () => {
		setAddress(null)
		setName(null)
		setBalance(null)
	}
	function handleConnectWalletClick() {
		peraWallet
		  .connect()
		  .then((newAccounts) => {
			peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
	
			setAccountAddress(newAccounts[0]);
		  })
		  .catch((error) => {
			if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
			  console.log(error);
			}
		  });
	  }
	
	  function handleDisconnectWalletClick() {
		peraWallet.disconnect();
	
		setAccountAddress(null);
	  }
    return (
        <>
            {/* <Notification /> */}
            {address ? (
                <Container fluid="md">
                    <Nav className="justify-content-end pt-3 pb-5">
                        <Nav.Item>
                            <Wallet
                                address={address}
                                name={name}
                                amount={balance}
                                disconnect={disconnect}
                                symbol={"ALGO"}
                            />
                        </Nav.Item>
                    </Nav>
                    <main>
                        {/* <Products address={address} fetchBalance={fetchBalance}/> */}
                    </main>
                </Container>
            ) : (
                <> 
				<CoverPera name={"Pera Wallet"} coverImg={ImgPera} connectPera={handleConnectWalletClick}/>
				<CoverAlgoSigner name={"Algo Signer"} coverImg={ImgAlgoSigner} connectAlgoSigner={connectWallet}/>
					{/* <button
					onClick={
						isConnectedToPeraWallet
						? handleDisconnectWalletClick
						: handleConnectWalletClick
					}
					>
					{isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
					</button> */}
					</>
				
            )}
			   
        </>
    );
}

export default App

