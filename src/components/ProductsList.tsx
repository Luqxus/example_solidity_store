import { useEffect, useState } from "react";
import { Contract, ContractAbi, Uint256 } from "web3";

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


export default ProductsList;