## Access an Array with Solidity

I came accross the issue to access an array with solidity. I hope it will help some people new to solidity.

### A way to manipulate array with solidity

#### Challenge

Solidity in this version can't return an array.

 One way to get them is call a function that return one value at a time. For instance: this algorithm will ask solidity the length of the array and then run a loop to get all data belonging to the array.

#### Explanations

The data are stored in a type map variable : <code>mapping (uint => Item) public items;</code>. The data structure Item hold the account address we would like to display <code>address payable[] accounts;</code>

2 functions are accessible from REACT through web3 to access the array length and the account address individually <code>function getNumberItemAccounts (uint index) public returns (uint) </code> and <code>function getItemAccount(uint itemIndex, uint accountIndex) public returns (address payable)</code>. They both return a single variable.

The frontend recreates the data structure and displays it.

#### Results read from solidity

When run the app, the program should display the array.


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
