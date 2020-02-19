import React from 'react';
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
    let directMethodAccounts = [];
    let EXPitems = [];
    console.log('Getting data from solidity ...')
    EXPitems = await AccessArray.methods.getItems ().call({ from: this.props.account});
    console.log ('Returning the item from struct Item only possible with  pragma experimental', EXPitems)

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
        console.log('Getting the accounts for each items')
        directMethodAccounts.push(await AccessArray.methods.getAccounts (inc).call({ from: this.props.account}));
        console.log ('ABIString', directMethodAccounts)

        
      items.push( {id:itemsNotFormated.id, name:itemsNotFormated.name, accounts})
      }
      this.setState({ loading: false, items})
      
    console.log('state Items',this.state.items)
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
        <h1>Ways to manipulate structured data with solidity
        </h1>
        <h2>Challenge</h2>
        <p>Get some structured data from solidity is not always straightforward</p>
        <p>depending the version of solidity that you are using, you could investigate different strategy</p>
        <h2>Explanations</h2>
        <h3>Old version (< 0.5.0)</h3>
        <p>Returning an array of standard type of data was not supported. </p>
        <p>The developper could call 2 functions : the first one will give the size of the array and the second one will return a value from the array</p>
        <p>In this code the structure Item used in <code>mapping (uint => Item) public items;</code> hold the account addresses we would like to display <code>address payable[] accounts;</code> </p>
        <p>2 functions are accessible from REACT through web3 to access the array length and the account address individually <code>function getNumberItemAccounts (uint index) public returns (uint) </code> and <code>function getItemAccount(uint itemIndex, uint accountIndex) public returns (address payable)</code>. They both return a single variable.</p>
        <h3>In newer version (< 0.5.0)</h3>
        <p>Solidity enable to return an array of standard type of data e.g. (unint[], string[])</p>
        <p>A simple function such as <code>function getAccounts(uint itemIndex) public returns (address payable[] memory)</code> will do the job</p>
    <p>However return an array of structure data is still impossible</p>

        <h3>Experimental pragma</h3>
        <p>Adding to the code <code>pragma experimental ABIEncoderV2;</code> will allow to do so. you can check function <code>getItems()</code>. However, it is not recommanded to use experimental code in live version</p>
        <h2>Results read from solidity</h2>
        <p>The following results are read from a variable in solidity and display on a webpage</p>
        <DisplayItems items={this.state.items} />
      </div>
    );
  }
}

export default App;
