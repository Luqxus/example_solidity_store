import { Contract, ContractAbi, Uint256, Web3 } from 'web3';
import contractABI from './contract/abi.json';
import { useEffect, useState } from 'react';


const AddProductForm = (props: { onCreateProduct: Function }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);



  return (
    <form
      className="p-24"
      onSubmit={(event) => {
        event.preventDefault();
        props.onCreateProduct(name, price, quantity);
      }}>

      <div className="mb-5">
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value)
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Product name"
          required />
      </div>

      <div className="mb-5">
        <input
          type="number"
          onChange={(event) => {
            setPrice(Number.parseInt(event.target.value));
          }}
          placeholder="Product Price"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required />
      </div>

      <div className="mb-5">
        <input
          type="number"
          onChange={(event) => {
            setQuantity(Number.parseInt(event.target.value));
          }}
          placeholder="Quantity"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required />
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  );
}



const ProductsList = (props: { contract: Contract<ContractAbi>, account: string }) => {
  const [products, setProducts] = useState<Array<{ id: Uint256, name: string, price: Uint256, inStock: Uint256 }>>();

  useEffect(() => {
    getProducts();

  }, []);

  const getProducts = async () => {
    let prods: any = await props.contract?.methods.getProducts().call({
      from: props.account,
      gas: '1000000',
      gasPrice: '1000000000'
    });
    console.log(prods);
    setProducts(prods);
  }


  const renderProducts = () => {
    let elements: any = []

    products?.forEach(prod => {
      elements.push(<li className="pb-3 sm:pb-4 bg-white bg-opacity-50 p-4 rounded-md">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {prod.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {prod.inStock}
            </p>
          </div>
          <div className="inline-flex items-center pl-8 text-base font-semibold text-gray-900 dark:text-white">
            {prod.price}
          </div>
        </div>
      </li>)
    })


    return elements;

  }

  return (

    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* --- */}
      {renderProducts()}
      {/* ------ */}

    </ul>

  );
}


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
  const [products, setProducts] = useState<Array<any>>([])




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
