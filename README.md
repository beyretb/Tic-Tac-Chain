# Tic-Tac-Chain
Blockchain based tic tac toe (467H coursework)

## Overview
	
This is an implementation of the Tic-Tac-Toe game in Solidity, deployed on the Kovan Testnet, and interfaced with Javascript and EthJS using Metamask.

## Requirements

You will need NodeJS and NPM installed, on linux:

```
sudo apt-get install nodejs
```
Once installed, this project uses EthJS for the blockchain interactions, and express as a simple we server.
In the project folder run:

```
npm install web3 ethjs express
```
Finally, to run the game you will need to create an ethereum account. For testing purposes I advise getting a Kovan testnet wallet and some Kovan ether to play around:

* [Metamask](https://metamask.io/) follow the instructions to install and use Metamask in your web browser 
* once installed the Kovan test network can be selected in the top left drop down menu in the addon
* create as many account (wallet) as you want in the addon
* obtain Kovan ether from [Gitter](https://gitter.im/kovan-testnet/faucet) by simply giving your wallet address in the chat (5 ETH every 12h per user)

## Usage

Once the setup complete, start the webserver:
```		
nodejs app.js
```

To play using the interface, I recommend opening the page (localhost:8080) in two separate web browsers both with a different wallet on the Kovan Testnet already selected in Metamask before opening the pages (ie: if you log into metamask or change account once the page is loaded, the game won’t work).

You can [watch how to play a game here](https://youtu.be/iAlfjQSaE6w)

## Remarks

* In order to deploy your own smart contract on the blockchain you will need to write and compile the associated Solidity code (or [another language](https://ethereum.stackexchange.com/questions/350/what-are-the-contract-languages/368#368) ). The details of the Solidity language can be found [here](http://solidity.readthedocs.io/en/v0.4.21/). Online editors and compilers are very useful, see [here](https://remix.ethereum.org/).
* For this project the Solidity source code is available in TicTacToe.sol
* Future improvements include adding a prize pool for the players, and also using this pool for the gas for each turn in order to avoid asking for the user approval through Metamask at each turn
