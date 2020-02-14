import React from 'react';


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
    const networkData = FileExchange.networks[networkId]
    if(networkData) {
      const fileExchange = await web3.eth.Contract(FileExchange.abi, networkData.address)
      this.setState({ fileExchange })
      const noPurchased = await fileExchange.methods.getNumberPurchases().call({ from: this.props.account})
      const purchases = []
      for (var inc = 0; inc<noPurchased; inc++)
        purchases.push( await fileExchange.methods.getPurchases(inc).call({ from: this.props.account}))
     

      //const purchases = await fileExchange.methods.purchases("0xdaBEC0c136EC139686d29f7CCD4C2989fEc83e1a").call();
      //purchases.map((text)=>{console.log (text)})
      console.log({purchases})
      
      this.setState({ loading: false, purchases})



    } else {
      window.alert('File Exchange contract not deployed to detected network.')
    }
  }
smartcontractaccess
export default smartcontractaccess;