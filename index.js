
//HTML page environement variables
var game = document.getElementById('game');
var boxes = document.querySelectorAll('li');
var turnDisplay = document.getElementById('whos-turn');
var gameMessages = document.getElementById('game-messages');
var newGame = document.getElementById('new-game');
var joinGame = document.getElementById('join-game');
var player;
var gameOver = false;


//ETH contract variables
var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "myTurn",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			}
		],
		"name": "play",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			}
		],
		"name": "validMove",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "displayBoard",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "winner",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "p2",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
const byteCode = "606060405260096040518059106100135750595b9080825280602002602001820160405250600490805190602001906100399291906100f0565b50341561004557600080fd5b60405160208061098f83398101604052808051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160028190555050610162565b82805482825590600052602060002090810192821561012c579160200282015b8281111561012b578251825591602001919060010190610110565b5b509050610139919061013d565b5090565b61015f91905b8082111561015b576000816000905550600101610143565b5090565b90565b61081e806101716000396000f300606060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631ed4557f1461007d57806341c0e1b5146100aa5780636898f82b146100bf578063b4c95a5c146100e2578063da5615101461011d578063dfbf53ae14610187575b600080fd5b341561008857600080fd5b6100906101b0565b604051808215151515815260200191505060405180910390f35b34156100b557600080fd5b6100bd61027a565b005b34156100ca57600080fd5b6100e06004808035906020019091905050610319565b005b34156100ed57600080fd5b6101036004808035906020019091905050610383565b604051808215151515815260200191505060405180910390f35b341561012857600080fd5b610130610498565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610173578082015181840152602081019050610158565b505050509050019250505060405180910390f35b341561019257600080fd5b61019a6104f6565b6040518082815260200191505060405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614801561021057506001600254145b806102755750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148015610274575060028054145b5b905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480156102d857506000600354115b15610317576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b61032281610383565b1561037b5760025460048281548110151561033957fe5b9060005260206000209001819055506001600254141561035f5760028081905550610368565b60016002819055505b610370610514565b600381905550610380565b600080fd5b50565b60008060035411806103955750600082105b806103a05750600882115b806103c5575060006004838154811015156103b757fe5b906000526020600020900154115b15801561049157506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614801561042b57506001600254145b806104905750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614801561048f575060028054145b5b5b9050919050565b6104a06107de565b60048054806020026020016040519081016040528092919081815260200182805480156104ec57602002820191906000526020600020905b8154815260200190600101908083116104d8575b5050505050905090565b600080600354111561050c576003549050610511565b600090505b90565b600080600090505b60038110156105ae57610536818260030183600601610738565b1561055d5760048181548110151561054a57fe5b9060005260206000209001549150610734565b610577816003026001836003020160028460030201610738565b156105a15760048160030281548110151561058e57fe5b9060005260206000209001549150610734565b808060010191505061051c565b6105bc600060046008610738565b156105e457600460008154811015156105d157fe5b9060005260206000209001549150610734565b6105f2600260046006610738565b1561061a576004600281548110151561060757fe5b9060005260206000209001549150610734565b600d6004600181548110151561062c57fe5b9060005260206000209001546004600181548110151561064857fe5b9060005260206000209001546004600181548110151561066457fe5b9060005260206000209001546004600181548110151561068057fe5b9060005260206000209001546004600181548110151561069c57fe5b906000526020600020900154600460018154811015156106b857fe5b906000526020600020900154600460018154811015156106d457fe5b906000526020600020900154600460018154811015156106f057fe5b9060005260206000209001546004600081548110151561070c57fe5b9060005260206000209001540101010101010101141561072f5760039150610734565b600091505b5090565b60008060048581548110151561074a57fe5b906000526020600020900154118015610796575060048381548110151561076d57fe5b90600052602060002090015460048581548110151561078857fe5b906000526020600020900154145b80156107d557506004828154811015156107ac57fe5b9060005260206000209001546004848154811015156107c757fe5b906000526020600020900154145b90509392505050565b6020604051908101604052806000815250905600a165627a7a7230582072029ccc6b7173c203d1e72e8ced952b6d13fbedf0e5d5fa2b250be19d95ce180029"
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    //this Dapp requires the use of metamask
    alert('please install metamask')
}
const eth = new Eth(web3.currentProvider);
var TicTacToeContract;
var TicTacToe;
eth.accounts().then(function(accounts){   
    TicTacToeContract = eth.contract(abi, byteCode, { from: accounts[0], gas: '3000000' });
});

//Play functions
var init = function() {
    
    //the user can first create or join a game
    newGame.addEventListener('click',newGameHandler,false);
    joinGame.addEventListener('click',joinGameHandler, false);
    
    //events listeners for user to click on the board
    for(var i = 0; i < 9; i++) {
        boxes[i].addEventListener('click', clickHandler, false);
    }
    renderInterval = setInterval(render, 1000);
    render();
}

var checkWin = function(){

    //checks the contract on the blockchain to verify if there is a winner or not
    if (typeof TicTacToe != 'undefined'){
        var win;
        TicTacToe.winner().then(function(res){
            win = res[0].words[0];
            var displayResult;
            if (win>0){
                if (win==3){
                    displayResult = "Draw ! game is over";
                } else if (win == 2){
                    displayResult = "Player 2 wins ! game is over";
                } else if (win ==1) {
                    displayResult = "Player 1 wins ! game is over";
                }
                gameOver = true;
                document.querySelector('#game-messages').innerHTML = displayResult;
                for (var i = 0; i < 9; i++){
                    boxes[i].removeEventListener('click', clickHandler);
                }
            }
        });
        if (win>0){
            return true;
        } else {
            return false;
        }
    } else { 
        return false;
    }
}

var render = function(){

    //renders the board byt fetching the state of the board from the blockchain
    if (typeof TicTacToe != 'undefined'){
        TicTacToe.displayBoard().then(function(res){
            for (var i = 0; i < 9; i++){
                var state = res[0][i].words[0];
                if (state>0){
                    if (state==1){
                        boxes[i].className = 'x';
                        boxes[i].innerHTML = 'x';
                    } else{
                        boxes[i].className = 'o';
                        boxes[i].innerHTML = 'o';
                    }
                }
            }
        });
        checkWin();
        if (!gameOver){
            TicTacToe.myTurn().then(function(res){
                if (res[0]){
                    document.querySelector('#game-messages').innerHTML = "Your turn !";
                } else {
                    document.querySelector('#game-messages').innerHTML = "Not your turn !";
                }
            });
        }   
    }
}

var newGameHandler = function(){

    //creates a new contract based on the user input of their opponent's address
    if (typeof TicTacToe != 'undefined'){
        console.log("There seems to be an existing game going on already");
    } else{
        var opponentAddress = document.getElementById('opponentAdress').value
        TicTacToeContract.new(opponentAddress).then(function(txHash){   
            var contractAddress;
            var waitForTransaction = setInterval(function(){
                eth.getTransactionReceipt(txHash, function(err, receipt){
                    if (receipt) {
                        clearInterval(waitForTransaction);
                        TicTacToe = TicTacToeContract.at(receipt.contractAddress);
                        //display the contract address to share with the opponent
                        document.querySelector('#newGameAddress').innerHTML = 
                            "Share the contract address with your opponnent: " + String(receipt.contractAddress) + "<br><br>";
                        document.querySelector('#player').innerHTML ="Player1"
                        player = 1;
                    }
                })
            }, 300);
        })
    }
}

var joinGameHandler = function(){

    //idem for joining a game
    var contractAddress = document.getElementById('contract-ID-tojoin').value.trim();
    TicTacToe = TicTacToeContract.at(contractAddress);
    document.querySelector('#player').innerHTML ="Player2"
    player = 2;
}

var clickHandler = function() {

    //called when the user clicks a cell on the board

    if (typeof TicTacToe != 'undefined'){
        if (checkWin()){
            return;
        }
        var target = this.getAttribute('data-pos');
        TicTacToe.validMove(target).then(function(res){
            if (res){
                TicTacToe.play(target).catch(function(err){
                    console.log('something went wrong ' +String(err));
                }).then(function(res){
                    this.removeEventListener('click', clickHandler);
                    render();
                });
            }
        });
    }
}

init();
