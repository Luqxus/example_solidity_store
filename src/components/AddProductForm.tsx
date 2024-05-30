import { useState } from "react";

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


export default AddProductForm;