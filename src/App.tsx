import { Contract, ContractAbi, Uint256, Web3 } from 'web3';
import contractABI from './contract/abi.json';
import AddProductForm from './components/AddProductForm';
import ProductsList from './components/ProductsList';
import { useState } from 'react';

const contractInstance = (web3: Web3) => {
  return new web3.eth.Contract(
    contractABI,
    "0xf84e2e6Cd6e546264FfEb50baBe31352a57d1644"
  )
}

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<Array<string>>([]);
  const [contract, setContract] = useState<Contract<ContractAbi>>();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);
        const c = contractInstance(web3Instance); // Pass web3Instance instead of web3
        setContract(c);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Web3 not found');
    }
  };

  const createProduct = async (name: string, price: Uint256, quantity: Uint256) => {
    await contract?.methods.createProduct(name, price, quantity).send({
      from: accounts[0],
      gas: '1000000',
      gasPrice: '1000000000'
    })
  }

  return (
    <main className="min-h-screen min-w-screen justify-between p-24">
      {(accounts.length > 0)
        ? <section className="flex max-w-7xl w-7xl mx-auto items-center justify-center">
          <AddProductForm onCreateProduct={createProduct} />
          <ProductsList contract={contract!} account={accounts[0]} />
        </section>
        : <section className="flex flex-colmax-w-7xl w-7xl mx-auto items-center justify-center">
          <button
            onClick={connectWallet}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
        </section>}
    </main>
  );
}

export default App
