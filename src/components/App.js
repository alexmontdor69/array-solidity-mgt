import React ,  { Component } from 'react';
import './App.css';
import DisplayItems from './DisplayItems';
import Web3 from 'web3';
import accessArray from '../abis/AccessArray.json';

class App extends React.Component {
async componentWillMount() {
  await this.loadWeb3()
  await this.loadBlockchainData()
}

async loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

async loadBlockchainData() {
  const web3 = window.web3
  // Load account
  const accounts = await web3.eth.getAccounts()

  this.setState({ account: accounts[0] })
  const networkId = await web3.eth.net.getId()
  const networkData = accessArray.networks[networkId]
  if(networkData) {
    const AccessArray = await new web3.eth.Contract(accessArray.abi, networkData.address)
    this.setState({ AccessArray })
    const numberItems = await AccessArray.methods.numberItems().call({ from: this.props.account})
    const items = []
    for (var inc = 0; inc<numberItems; inc++){
      //getting the number of account for this items (key = inc)
      const accountNumber = await AccessArray.methods.getNumberItemAccounts(inc).call({ from: this.props.account})
      let accounts=[];
      //getting the account one by one
      for (var inc1 = 0; inc1<accountNumber; inc1++)
        accounts.push( await AccessArray.methods.getItemAccount(inc,inc1).call({ from: this.props.account}))
        //getting the mapping function without the array
        const itemsNotFormated = await AccessArray.methods.items(inc).call({ from: this.props.account})
        //reformating the array
      items.push( {id:itemsNotFormated.id, name:itemsNotFormated.name, accounts})
      }
      this.setState({ loading: false, items})
      
    console.log(this.state.items)
  } else {
    window.alert('File Exchange contract not deployed to detected network.')
  }
}

constructor(props) {
  super(props)
  this.state = {
      items: []
    }
}

  render() {
    return (
      <div className="App">
        <h1>A way to manipulate array with solidity
        </h1>
        <h2>Challenge</h2>
        <p>Solidity in this version can't return an array.</p>
        <p>One way to get them is call a function that return one value at a time. For instance: this algorithm will ask solidity the length of the array and then run a loop to get all data belonging to the array.</p>
        <h2>Explanations</h2>
        <p>The data are stored in a type map variable : <code>mapping (uint => Item) public items;</code>. The data structure Item hold the account address we would like to display <code>address payable[] accounts;</code> </p>
        <p>2 functions are accessible from REACT through web3 to access the array length and the account address individually <code>function getNumberItemAccounts (uint index) public returns (uint) </code> and <code>function getItemAccount(uint itemIndex, uint accountIndex) public returns (address payable)</code>. They both return a single variable.</p>
        <p>The frontend recreates the data structure and displays it</p>
        <h2>Results read from solidity</h2>
        <p>The following results are read from a variable in solidity and display on a webpage</p>
        <DisplayItems items={this.state.items} />
      </div>
    );
  }
}

export default App;
