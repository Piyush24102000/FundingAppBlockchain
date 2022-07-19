import {useEffect,useState} from "react";
import Web3 from "web3";
import './App.css';

function App() {
const web3 =  new Web3(Web3.givenProvider || "http://127.0.0.1:8545");

const[account,setaccount] = useState();
const [balance,setBalance] = useState();

useEffect(()=>{
  const getAccount = async() => {
    const web3 =  new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
    const show = await web3.eth.getAccounts();
    setaccount(show[0]);
  }
    getAccount();
},[])

/////Initializing the contract/////////
var contractAddress = '0x4749112539dba91f9d98544d84f93b1b474e878e';
var contractABI = [
  {
    "inputs": [],
    "name": "numOfFunders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
  },
  {
    "inputs": [],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "withdrawamount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
var Contract1 = new web3.eth.Contract(contractABI, contractAddress);


useEffect(()=>{
  const loadBalance = async() => {
    const balances = await web3.eth.getBalance(contractAddress);
    setBalance(web3.utils.fromWei(balances,"ether"));
  }
  loadBalance();
})
//////////Transfer function////////////
const transferFund = async() => {
  
  await web3.eth.sendTransaction({
    from:account,
    to:contractAddress,
    value: web3.utils.toWei("5","ether")
  
  })
}
//////////Withdraw function///////////
const withdrawFund = async() =>{
  await web3.eth.sendTransaction({
    from:contractAddress,
    to:account,
    value: web3.utils.toWei("2","ether")
  })
  }

  return (
    <div className="card text-center">
      <div className="card-header">Funding</div>
      <div className="card-body">
        <h5 className="card-title">Balance:{balance} Eth</h5>
        <p className="card-text">Account:{account}</p>
        
        <button type="button" className="btn btn-success" 
        onClick={async() => {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        }}  >
          Connect to Metamask
        </button> &nbsp;
        <button type="button" className="btn btn-success"
        onClick={transferFund}
        >Transfer</button>
        &nbsp;
        <button type="button" className="btn btn-primary"
        onClick={withdrawFund}
        >Withdraw</button>
      </div>

      <div className="card-footer text-muted">Piyush Tale</div>
    </div>
  );
}

export default App;
