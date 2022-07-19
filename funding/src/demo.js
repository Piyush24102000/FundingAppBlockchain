import {useEffect,useState} from "react";
import Web3 from "web3";
import './App.css';

function App() {
const[account,setaccount] = useState();
const[web3Api,setweb3Api] = useState({
  provide:null,
  web3:null,
});

  useEffect(() => {
    const loadProvider = async() => {
      let provider = null;
      if(window.ethereum){
        provider = window.ethereum;
      }
      setweb3Api({
        web3: new Web3(provider),
        provider,
      });
    }
    loadProvider();
  },[])

  useEffect(()=>{
    const getAccount = async() => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setaccount(accounts[0])
    }
    getAccount();
  },[web3Api.web3])
  //console.log(web3Api.web3)

  return (
    <div className="card text-center">
      <div className="card-header">Funding</div>
      <div className="card-body">
        <h5 className="card-title">Balance:20Eth</h5>
        <p className="card-text">Account:{account}</p>
        
        <button type="button" className="btn btn-success" 
        onClick={async() => {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        }}  >
          Connect to Metamask
        </button> &nbsp;
        <button type="button" className="btn btn-success">Transfer</button>
        &nbsp;
        <button type="button" className="btn btn-primary">Withdraw</button>
      </div>

      <div className="card-footer text-muted">Piyush Tale</div>
    </div>
  );
}

export default App;
